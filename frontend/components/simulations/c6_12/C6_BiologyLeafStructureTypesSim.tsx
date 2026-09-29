'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NAMED CONSTANTS FOR NODE IDS ───
const NODE_C6_BIO_001 = 'c6_bio_001'; // Leaf structure and types
const NODE_C6_BIO_002 = 'c6_bio_002'; // Functions of leaf
const NODE_C6_BIO_003 = 'c6_bio_003'; // Leaf modifications
const NODE_C6_BIO_004 = 'c6_bio_004'; // Flower structure (4 whorls)
const NODE_C6_BIO_005 = 'c6_bio_005'; // Pollination and agents
const NODE_C6_BIO_006 = 'c6_bio_006'; // Fertilization and fruit formation
const NODE_C6_BIO_007 = 'c6_bio_007'; // Fruit structure and types
const NODE_C6_BIO_008 = 'c6_bio_008'; // Seed structure and types
const NODE_C6_BIO_009 = 'c6_bio_009'; // Seed germination
const NODE_C6_BIO_010 = 'c6_bio_010'; // The cell and cell organelles

const ALL_NODE_IDS = [
  NODE_C6_BIO_001,
  NODE_C6_BIO_002,
  NODE_C6_BIO_003,
  NODE_C6_BIO_004,
  NODE_C6_BIO_005,
  NODE_C6_BIO_006,
  NODE_C6_BIO_007,
  NODE_C6_BIO_008,
  NODE_C6_BIO_009,
  NODE_C6_BIO_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Royal Botanical Mystery of Malabar',
  intro: 'You are an apprentice botanist appointed by the Malabar Botanical Garden in Kerala. A catastrophic storm has disrupted the garden’s rare collection of flora—from peepal and mango leaves to flowering hibiscuses, developing seedpods, and cellular tissue samples.',
  context: 'To restore the botanical archive, you must explore structural adaptations, investigate plant organs from cellular organelles to leaves and flowers, unlock reproductive pathways, and solve taxonomic puzzles.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Imagine inspecting a prickly cactus in the Thar Desert. Where are its actual biological leaves?',
  options: [
    'The wide, green, fleshy pads that perform photosynthesis',
    'The sharp, hard spines protecting the stem and cutting water loss',
    'Underground root hair networks absorbing deep moisture',
    'Cactus plants evolved completely without any leaf structures',
  ],
  correctIndex: 1,
  hintAfter: 'Surprised? In desert plants, leaves sacrifice their flat green blade to become defensive, water-conserving spines while the green stem manufactures food!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 & CISCE 2026 Aligned) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_bio_01',
    nodeId: NODE_C6_BIO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the broad, expanded green blade of a leaf that captures sunlight called?',
    options: ['Petiole', 'Lamina (Leaf Blade)', 'Stipule', 'Midrib'],
    correctIndex: 1,
    explanation: 'The lamina (or leaf blade) is the flat, broad green region specially structured to absorb maximal solar radiation for photosynthesis.',
    hints: [
      'It is the broad solar-panel surface of the leaf.',
      'It is connected to the stem via the slender petiole stalk.',
      'The scientific term for the main leaf blade is Lamina.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_02',
    nodeId: NODE_C6_BIO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A student compares a Peepal leaf with a blade of Lawn Grass. Which venation patterns do they exhibit?',
    options: [
      'Peepal: Parallel venation; Grass: Reticulate venation',
      'Peepal: Reticulate (net-like); Grass: Parallel (straight veins)',
      'Both exhibit identical reticulate network venation',
      'Both lack veins and rely purely on cellular diffusion',
    ],
    correctIndex: 1,
    explanation: 'Dicot leaves like Peepal and Mango display reticulate (webbed) venation, whereas monocot leaves like Grass, Wheat, and Maize show parallel venation.',
    hints: [
      'Hold a peepal leaf to the light; notice the web of interconnected veins.',
      'Grass veins run straight like railway tracks from base to tip.',
      'Peepal is net-like (reticulate), grass is parallel.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_03',
    nodeId: NODE_C6_BIO_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct anatomical labels onto the leaf diagram positions.',
    dragItems: [
      { label: 'Leaf Apex', targetId: 'leaf_apex' },
      { label: 'Midrib', targetId: 'leaf_midrib' },
      { label: 'Petiole', targetId: 'leaf_petiole' },
      { label: 'Margin', targetId: 'leaf_margin' },
    ],
    correctMapping: {
      leaf_apex: 'Leaf Apex',
      leaf_midrib: 'Midrib',
      leaf_petiole: 'Petiole',
      leaf_margin: 'Margin',
    },
    explanation: 'The apex is the tip, the midrib is the central supporting conduit, the margin is the outer border, and the petiole is the stalk attaching the blade to the stem.',
    hints: [
      'Apex belongs at the very top pointed tip.',
      'The thick central line running down the middle is the midrib.',
      'The stalk at the bottom base is the petiole.',
    ],
  },
  {
    id: 'ch_bio_04',
    nodeId: NODE_C6_BIO_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following correctly pairs leaf functions with the corresponding structures?',
    options: [
      'Photosynthesis: Chlorophyll in Lamina; Transpiration: Stomata; Gas Exchange: Stomata',
      'Photosynthesis: Petiole; Transpiration: Midrib; Gas Exchange: Cuticle only',
      'Photosynthesis: Endosperm; Transpiration: Guard cells only; Gas Exchange: Root hairs',
      'Leaves only store minerals; they perform no gaseous exchange',
    ],
    correctIndex: 0,
    explanation: 'Photosynthesis occurs in chlorophyll-rich lamina cells, while stomatal pores regulate both transpiration (cooling/suction pull) and gaseous exchange.',
    hints: [
      'Chlorophyll catches sunlight; stomata act as adjustable microscopic windows.',
      'Stomata handle both water vapor loss (transpiration) and CO2/O2 exchange.',
      'Option A correctly lists all three primary functions.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_05',
    nodeId: NODE_C6_BIO_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a kitchen garden, a sweet pea (Pisum sativum) climbs a trellis using coiling tendrils. What morphological organ are these tendrils?',
    options: [
      'Modified adventitious aerial roots',
      'Modified leaves / leaf parts adapted for climbing support',
      'Modified flowering stems (thorns)',
      'Underground food-storing rhizomes',
    ],
    correctIndex: 1,
    explanation: 'In the pea plant, terminal leaf parts are modified into slender, coiled tendrils that wrap around external supports to elevate weak stems toward sunlight.',
    hints: [
      'Remember that pea tendrils are homologous to foliage leaves, not stems or roots.',
      'They provide mechanical climbing support.',
      'Pea tendrils are modified leaves.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_06',
    nodeId: NODE_C6_BIO_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do pitcher plants (Nepenthes) in the Khasi Hills of Meghalaya trap and digest insects if they already possess green chlorophyll?',
    options: [
      'They cannot perform photosynthesis and rely entirely on insect calories',
      'They trap insects specifically to obtain nitrogen minerals lacking in waterlogged/acidic soil',
      'They capture insects to use their wings for seed dispersal',
      'They digest insects to extract water in arid deserts',
    ],
    correctIndex: 1,
    explanation: 'Pitcher plants are autotrophic green plants that make sugars via photosynthesis, but trap insects to extract vital nitrogen and minerals deficient in their acidic bog soils.',
    hints: [
      'Do insectivorous plants have chlorophyll? Yes, they make their own glucose.',
      'What critical mineral is missing in marshy bog soils? Nitrogen for building proteins.',
      'Insects provide supplementary nitrogen, not metabolic energy.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_07',
    nodeId: NODE_C6_BIO_004,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the four whorls of a complete flower from outermost to innermost ring.',
    sortItems: [
      'Calyx (Sepals)',
      'Corolla (Petals)',
      'Androecium (Stamens - Male)',
      'Gynoecium / Pistil (Carpels - Female)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The concentric floral whorls from outside to inside are: 1st Calyx (protective sepals), 2nd Corolla (attractive petals), 3rd Androecium (stamens), and 4th Gynoecium (pistil).',
    hints: [
      'The green protective wrapper of the bud is on the outside.',
      'The bright petals come second.',
      'The female pistil sits right at the central core.',
    ],
  },
  {
    id: 'ch_bio_08',
    nodeId: NODE_C6_BIO_004,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student dissects a Hibiscus flower. Which pair of anatomical parts accurately constitutes the male stamen and female carpel respectively?',
    options: [
      'Stamen = Anther + Filament; Carpel = Stigma + Style + Ovary',
      'Stamen = Sepal + Petal; Carpel = Calyx + Corolla',
      'Stamen = Stigma + Ovule; Carpel = Filament + Anther',
      'Stamen = Receptacle + Pedicel; Carpel = Pollen grain + Nectary',
    ],
    correctIndex: 0,
    explanation: 'The stamen (androecium unit) consists of the pollen-bearing anther and filament. The carpel/pistil (gynoecium unit) consists of the sticky stigma, tubular style, and basal ovary.',
    hints: [
      'The anther produces yellow pollen grains held up on a stalk-like filament.',
      'The female organ has a sticky top stigma, a neck style, and a seed-containing ovary chamber.',
      'Option A correctly names the sub-structures of both reproductive whorls.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_09',
    nodeId: NODE_C6_BIO_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a field of Zea mays (Maize), the flowers lack bright colors, produce no nectar, have long feathery stigmas, and release copious light powdery pollen. What is the pollination agent?',
    options: ['Insects (Bees and Butterflies)', 'Wind (Anemophily)', 'Water (Hydrophily)', 'Birds (Ornithophily)'],
    correctIndex: 1,
    explanation: 'Wind-pollinated flowers have light, non-sticky pollen produced in massive quantities and long feathery stigmas exposed to air currents to catch drifting grains.',
    hints: [
      'Why would a flower lack fragrance and bright petals? Because wind doesn’t have eyes or a nose.',
      'Feathery stigmas act like nets in the breeze.',
      'The agent is Wind.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_10',
    nodeId: NODE_C6_BIO_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the fundamental difference between self-pollination and cross-pollination?',
    options: [
      'Self-pollination transfers pollen within the same flower/plant; Cross-pollination transfers pollen to a flower on a different plant of the same species',
      'Self-pollination requires wind; cross-pollination requires only chemical fertilizers',
      'Self-pollination occurs only in conifers; cross-pollination occurs only in algae',
      'Self-pollination produces fruit without seeds; cross-pollination produces empty pods',
    ],
    correctIndex: 0,
    explanation: 'Self-pollination is the direct transfer of pollen from anther to stigma within the same blossom or plant. Cross-pollination introduces genetic diversity by transferring pollen between distinct parent plants.',
    hints: [
      'Think about "self" (within the same individual) vs "cross" (between two individuals).',
      'Cross-pollination mixes genes between different parent plants.',
      'Option A is the precise biological definition.',
    ],
  },
  {
    id: 'ch_bio_11',
    nodeId: NODE_C6_BIO_006,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the correct developmental mapping for floral organs after successful fertilization.',
    availableParts: ['Ovary becomes Fruit', 'Ovule becomes Seed', 'Zygote becomes Embryo', 'Petals wither and fall'],
    targetState: 'Ovary becomes Fruit + Ovule becomes Seed + Zygote becomes Embryo + Petals wither and fall',
    validationHint: 'Add all four transformation statements in logical sequence!',
    explanation: 'Following fertilization, the zygote divides into an embryo, the ovule hardens into a seed, the surrounding ovary enlarges into the fruit wall (pericarp), and non-essential petals/sepals wither.',
    hints: [
      'Click all four statements to build the full post-fertilization developmental pathway.',
      'Ovary -> Fruit, Ovule -> Seed, Zygote -> Embryo.',
      'Add each part to verify the transformation sequence.',
    ],
  },
  {
    id: 'ch_bio_12',
    nodeId: NODE_C6_BIO_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In culinary terms, brinjal (eggplant), tomato, and lady’s finger (okra) are called vegetables. Botanically, what are they and why?',
    options: [
      'True botanical fruits, because they develop from the ripened ovary and enclose seeds',
      'Vegetative roots, because they absorb soil minerals',
      'Modified stems, because they have nodes and internodes',
      'Leaf petioles, because they originate from vegetative shoot buds',
    ],
    correctIndex: 0,
    explanation: 'Any structure that develops from a fertilized ovary and encloses seeds is biologically a fruit. Thus tomatoes, brinjals, cucumbers, and okra are all true botanical fruits.',
    hints: [
      'What part of the flower did they develop from? The ovary containing ovules/seeds.',
      'If it has seeds inside and developed from an ovary, it is scientifically a fruit.',
      'They are botanical fruits.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_13',
    nodeId: NODE_C6_BIO_007,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the pericarp layer labels to the corresponding regions of the sliced mango diagram.',
    dragItems: [
      { label: 'Epicarp (Outer Skin)', targetId: 'fruit_epicarp' },
      { label: 'Mesocarp (Fleshy Pulp)', targetId: 'fruit_mesocarp' },
      { label: 'Endocarp (Hard Stone)', targetId: 'fruit_endocarp' },
      { label: 'True Seed (Inside Stone)', targetId: 'fruit_seed' },
    ],
    correctMapping: {
      fruit_epicarp: 'Epicarp (Outer Skin)',
      fruit_mesocarp: 'Mesocarp (Fleshy Pulp)',
      fruit_endocarp: 'Endocarp (Hard Stone)',
      fruit_seed: 'True Seed (Inside Stone)',
    },
    explanation: 'In a drupe like mango: Epicarp = thin outer protective skin; Mesocarp = sweet edible fleshy middle layer; Endocarp = hard woody inner stone protecting the true seed inside.',
    hints: [
      'The outer skin is Epicarp (Epi = outer).',
      'The middle edible mango flesh is Mesocarp (Meso = middle).',
      'The hard inner shell is Endocarp (Endo = inner), housing the seed.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_14',
    nodeId: NODE_C6_BIO_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do dry fruits like Mustard siliqua and Gram legume differ from fleshy fruits like Mango and Orange?',
    options: [
      'Dry fruits have a pericarp that dries, hardens, and dehisces (splits) to release seeds, whereas fleshy fruits maintain a juicy/fleshy pericarp',
      'Dry fruits contain no seeds whatsoever; fleshy fruits have hundreds of embryos',
      'Dry fruits develop without flowers; fleshy fruits require double fertilization',
      'Dry fruits are formed from leaves, while fleshy fruits are formed from roots',
    ],
    correctIndex: 0,
    explanation: 'In dry fruits (e.g., mustard pod, chickpea legume), the pericarp lacks a juicy mesocarp and becomes thin, tough, or papery upon maturity to split open and disperse seeds.',
    hints: [
      'Compare a dry gram pod with a juicy orange segment.',
      'Dry fruit pericarps are non-fleshy and often split open (dehisce).',
      'Option A describes the essential structural and functional difference.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_15',
    nodeId: NODE_C6_BIO_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A farmer in Punjab examines soaked Bengal Gram (Chana) seeds and Maize grains. Which anatomical comparison is completely accurate?',
    options: [
      'Gram is a Dicot with 2 fleshy food-storing cotyledons; Maize is a Monocot with 1 cotyledon (scutellum) and a large endosperm food store',
      'Gram is a Monocot with endosperm only; Maize is a Dicot with 3 cotyledons',
      'Both Gram and Maize store food exclusively in their outer testa seed coat',
      'Maize possesses 2 cotyledons while Gram lacks any embryo',
    ],
    correctIndex: 0,
    explanation: 'Bengal gram (chana) is a dicotyledonous seed whose food is stored inside two large cotyledons. Maize is a monocotyledonous grain with one shield-like cotyledon (scutellum) and endosperm.',
    hints: [
      'When you split a soaked chana seed, how many halves do you get? Two fleshy cotyledons.',
      'In a maize kernel, the bulk of white starchy food is stored in the endosperm.',
      'Gram has 2 cotyledons (dicot); Maize has 1 cotyledon + endosperm (monocot).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_16',
    nodeId: NODE_C6_BIO_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Inside a soaked bean seed embryo, what do the radicle and plumule develop into during growth?',
    options: [
      'Radicle develops into the Root system; Plumule develops into the Shoot system',
      'Radicle develops into the Leaves; Plumule develops into the Primary Root',
      'Radicle forms the Flower petals; Plumule forms the Seed coat',
      'Both radicle and plumule fuse into a single lateral branch',
    ],
    correctIndex: 0,
    explanation: 'The radicle is the embryonic root that emerges first and grows downward with gravity. The plumule is the embryonic shoot that grows upward to form the stem and foliage leaves.',
    hints: [
      'R for Radicle -> R for Root.',
      'Plumule ascends upward into light to form the shoot.',
      'Radicle = Root; Plumule = Shoot.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_17',
    nodeId: NODE_C6_BIO_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In an experiment, soaked moong seeds submerged under boiled cooled water covered with oil fail to germinate despite being kept at 25°C. Why did they fail?',
    options: [
      'Boiling the water and adding oil cut off Dissolved Oxygen needed for aerobic respiration',
      'Moong seeds require sub-zero freezing temperatures to trigger enzymatic activation',
      'Light was absent under the oil layer, preventing seed photosynthesis',
      'Water destroys the seed embryo upon contact',
    ],
    correctIndex: 0,
    explanation: 'Germination strictly requires water (hydration/enzymes), suitable warmth (enzyme kinetics), and oxygen (aerobic cellular respiration). Boiled water sealed with oil lacks dissolved oxygen.',
    hints: [
      'What gas is driven out when water is boiled and sealed with oil?',
      'Embryo cells need oxygen to respire and produce ATP energy for growth.',
      'The missing factor is dissolved oxygen.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_18',
    nodeId: NODE_C6_BIO_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A batch of 50 soaked gram seeds is tested. At optimum warmth (28°C), 46 seeds sprout healthy radicles within 72 hours. What is the germination rate percentage?',
    correctAnswer: 92,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Germination rate = (Number of sprouted seeds / Total tested seeds) × 100 = (46 / 50) × 100 = 92%.',
    hints: [
      'Divide the 46 germinated seeds by the total 50 seeds.',
      '46 / 50 = 0.92.',
      'Multiply by 100 to get 92%.',
    ],
  },
  {
    id: 'ch_bio_19',
    nodeId: NODE_C6_BIO_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which three cellular structures are present in typical Plant cells but ABSENT in Animal cells?',
    options: [
      'Cellulose Cell Wall, Plastids (Chloroplasts), and a Large Central Vacuole',
      'Nucleus, Cell Membrane, and Cytoplasm',
      'Mitochondria, Ribosomes, and Nuclear pores',
      'Animal cells have cell walls; plant cells have only flexible membranes',
    ],
    correctIndex: 0,
    explanation: 'Plant cells are characterized by a rigid cellulose cell wall, photosynthesizing plastids (chloroplasts/chromoplasts), and a large prominent central sap vacuole providing turgidity.',
    hints: [
      'What gives a plant stem rigid support without an internal skeleton? Cell wall.',
      'What green organelles trap sunlight? Chloroplasts.',
      'Option A lists the 3 definitive plant cell features.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_20',
    nodeId: NODE_C6_BIO_010,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In a "Cellular City / Factory" analogy, match the organelles with their exact operational roles:',
    options: [
      'Nucleus: Control Center / Headquarters; Cell Membrane: Security Gate; Chloroplast: Solar Power Unit; Vacuole: Storage Reservoir',
      'Nucleus: Waste Dump; Cell Membrane: Starch Producer; Chloroplast: Cell Wall; Vacuole: Master Genetic Blueprint',
      'Nucleus: Gatekeeper; Cell Membrane: Solar Panel; Chloroplast: Water Tank; Vacuole: Control Tower',
      'All cell organelles have identical, interchangeable functions',
    ],
    correctIndex: 0,
    explanation: 'The nucleus commands cellular activity using DNA; the semipermeable cell membrane controls inbound/outbound transit; chloroplasts convert light to chemical energy; vacuoles store fluids and wastes.',
    hints: [
      'The nucleus houses hereditary instructions (Headquarters).',
      'The cell membrane acts as a selective barrier (Security Gate).',
      'Chloroplasts harvest solar energy; vacuoles store sap.',
    ],
  },
  {
    id: 'ch_bio_21',
    nodeId: NODE_C6_BIO_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student observes miniature plantlets with roots growing along the notched margins of a Bryophyllum (Patharchatta) leaf. Evaluate the biological significance:',
    options: [
      'This is Vegetative Propagation (Asexual Reproduction) where modified leaf margins produce cloned offspring without seeds',
      'These are miniature parasitic insects laying eggs on the leaf surface',
      'These are fungal spores decomposing the leaf blade',
      'Bryophyllum produces true gymnosperm cones on its leaf veins',
    ],
    correctIndex: 0,
    explanation: 'Bryophyllum exhibits vegetative propagation: foliar adventitious buds along the leaf margin develop into complete plantlets that drop to moist soil and root independently.',
    hints: [
      'Patharchatta propagates without seeds through its leaf notches.',
      'Each baby plantlet has miniature green leaves and tiny adventitious rootlets.',
      'This is vegetative reproduction directly from a modified leaf.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_22',
    nodeId: NODE_C6_BIO_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'As a bio-engineer designing a drought-resistant crop for arid Rajasthan, which leaf adaptation combination best minimizes transpiration while preserving photosynthesis?',
    options: [
      'Thick waxy cuticle, sunken stomata on lower surface, reduced leaf surface area, and chlorophyllous green stem',
      'Ultra-thin broad lamina, wide-open protruding stomata on upper surface, and no waxy cuticle',
      'Total absence of stomata and replacement of chlorophyll with yellow carotene only',
      'Expanding lamina size by 400% to catch dry desert winds',
    ],
    correctIndex: 0,
    explanation: 'Xerophytic adaptations include thick waxy cuticles, sunken stomata (trapping humid micro-pockets), reduced surface area, and photosynthetic stems to dramatically conserve water in arid zones.',
    hints: [
      'How do desert plants prevent water evaporation?',
      'Thick wax blocks water loss; sunken stomatal pits reduce vapor escaping in dry wind.',
      'Option A combines the ideal suite of drought-resistant adaptations.',
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
  nodeId: NODE_C6_BIO_001,
  title: 'Botanical Explorer: Leaf, Flower, Fruit, Seed & Cell Systems',
  definition: 'An integrated study of plant anatomy and physiology covering leaf structure, venation, floral whorls, pollination mechanisms, fertilization, fruit pericarp layering, seed embryo germination, and plant cell organelles.',
  eli5: 'Plants are like master solar-powered factories! Leaves catch light and breathe, flowers invite pollinators to make seeds, fruits protect baby plants in seed lunchboxes, and tiny cell factories power everything.',
  misconceptions: [
    {
      misconception: 'A compound leaf is a group of many separate individual leaves attached together.',
      correction: 'A compound leaf is a single leaf whose lamina is divided into separate leaflets attached to a common rachis stalk.',
    },
    {
      misconception: 'Insectivorous plants eat insects because they cannot perform photosynthesis.',
      correction: 'Insectivorous plants are fully green and make food by photosynthesis; they trap insects only to absorb deficient soil nitrogen.',
    },
    {
      misconception: 'The hard stone in a mango is the seed coat itself.',
      correction: 'The hard woody stone is the endocarp (innermost fruit wall layer); the true seed sits safely inside the endocarp.',
    },
    {
      misconception: 'Plant and animal cells are identical except plants are green.',
      correction: 'Plant cells have a rigid cellulose cell wall, large central sap vacuole, and plastids, which are entirely absent in animal cells.',
    },
    {
      misconception: 'Germinating seeds need direct bright sunlight to sprout.',
      correction: 'Germination relies strictly on moisture, warmth, and oxygen; sunlight is only required after green seedling leaves emerge.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the broad green surface of a leaf called?', options: ['Petiole', 'Lamina', 'Midrib', 'Stipule'], correctIndex: 1 },
    { question: 'Which venation is characteristic of Grass and Maize?', options: ['Reticulate', 'Parallel', 'Radial', 'Pinnate'], correctIndex: 1 },
    { question: 'Cactus spines are modified:', options: ['Stems', 'Roots', 'Leaves', 'Bark'], correctIndex: 2 },
    { question: 'The male reproductive organ of a flower is the:', options: ['Calyx', 'Corolla', 'Androecium (Stamen)', 'Gynoecium (Pistil)'], correctIndex: 2 },
    { question: 'Following fertilization, the ovary develops into the:', options: ['Seed', 'Fruit', 'Petal', 'Pollen grain'], correctIndex: 1 },
    { question: 'In a mango, the edible juicy yellow pulp is the:', options: ['Epicarp', 'Mesocarp', 'Endocarp', 'Endosperm'], correctIndex: 1 },
    { question: 'The embryonic root of a germinating seed is called the:', options: ['Plumule', 'Radicle', 'Cotyledon', 'Micropyle'], correctIndex: 1 },
    { question: 'Which organelle serves as the cell control center?', options: ['Vacuole', 'Chloroplast', 'Nucleus', 'Cell Wall'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of leaf venation, floral whorls, pollination agents, post-fertilization fruit/seed transformation, and cell organelle differentiation.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Leaf Anatomy & Solar Capture',
    instruction: 'Click on different leaf anatomical structures to inspect their physiological role, or toggle venation mode.',
    interactionType: 'interactive-leaf',
    nodeId: NODE_C6_BIO_001,
  },
  {
    title: 'Lab 2: Transpiration & Stomatal Dynamics',
    instruction: 'Slide the Solar Heat slider to watch stomata regulate water vapor loss and xylem suction pull in real-time.',
    interactionType: 'transpiration-sim',
    nodeId: NODE_C6_BIO_002,
  },
  {
    title: 'Lab 3: Flower Architecture (The 4 Whorls)',
    instruction: 'Inspect the four concentric floral whorls from outer Sepals to inner Pistil. Predict pollination matches!',
    interactionType: 'flower-whorls',
    nodeId: NODE_C6_BIO_004,
  },
  {
    title: 'Lab 4: Fruit Pericarp & Seed Anatomy',
    instruction: 'Slice open the ripe drupe to inspect the Epicarp, Mesocarp, Endocarp, and dissect the Dicot seed embryo.',
    interactionType: 'fruit-seed-slice',
    nodeId: NODE_C6_BIO_007,
  },
  {
    title: 'Lab 5: High-Power Plant Cell Micro-Lab',
    instruction: 'Explore the plant cell organelles. Click each organelle to see its bio-factory role.',
    interactionType: 'cell-explorer',
    nodeId: NODE_C6_BIO_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you apply intense solar heat and dry air to a leaf, what will the guard cells do to protect the plant?',
    options: [
      'Guard cells close stomata to prevent lethal water dehydration',
      'Guard cells burst open 100% to pump out all remaining water',
      'Leaves shed all chlorophyll immediately within seconds',
      'Stomata convert instantly into woody bark',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now drag the Solar Heat slider to High (80°C+) in the lab below to verify stomatal closure!',
    nodeId: NODE_C6_BIO_002,
  },
  {
    question: 'Predict: If you soak a bean seed in water and place it on moist cotton at 28°C, which part emerges first?',
    options: [
      'The green leafy Plumule shoot emerges first toward the ceiling',
      'The Radicle root emerges first to establish water uptake and anchor',
      'The seed coat forms flowers before roots appear',
      'Both cotyledons detach and fly away immediately',
    ],
    correctIndex: 1,
    verifyInstruction: 'Inspect the germination simulation to verify that the downward Radicle root always precedes the shoot!',
    nodeId: NODE_C6_BIO_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the rate of transpiration water droplets as you raise temperature from 20°C to 45°C?',
    observableOptions: [
      'Water evaporation rate accelerates and suction pull increases',
      'Water droplets stop moving completely',
      'The leaf instantly turns purple',
      'Veins collapse and stop carrying any water',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_BIO_002,
  },
  {
    question: 'Observation: When comparing Peepal and Grass venation in Lab 1, what structural difference is evident?',
    observableOptions: [
      'Peepal forms a branched spiderweb network; Grass has straight parallel lines',
      'Peepal has no veins at all; Grass has circular spiral rings',
      'Both look 100% identical under sunlight',
      'Grass veins criss-cross at 90-degree right angles only',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_BIO_001,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Field Botanist: Malabar Garden Herbarium Challenge',
  description: 'Step outside into your home garden or school campus. Collect 3 fallen leaves (e.g., Peepal/Mango, Grass/Bamboo, Rose/Neem) and 1 flower (e.g., Hibiscus). Document your findings using the field protocol below.',
  steps: [
    'Classify each leaf as Simple (undivided blade) or Compound (split leaflets).',
    'Hold the leaves against sunlight: record Reticulate (net-like) vs Parallel venation.',
    'Carefully dissect the flower: identify and count the green Sepals, colorful Petals, male Stamens, and central Pistil.',
    'Create an observation card in your notebook and label the 4 whorls with a sketch.',
  ],
};

export default function C6_BiologyLeafStructureTypesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_BIO_001,
  title = DEFAULT_PROPS.title || 'Botanical Explorer',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🌿', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Prediction & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Interactive Lab Visual States
  const [leafTypeMode, setLeafTypeMode] = useState<'reticulate' | 'parallel' | 'compound'>('reticulate');
  const [selectedLeafPart, setSelectedLeafPart] = useState<string | null>(null);
  const [solarHeat, setSolarHeat] = useState<number>(30); // 0 to 100 °C
  const [stomatalState, setStomatalState] = useState<'open' | 'semi' | 'closed'>('open');
  const [waterTranspirationRate, setWaterTranspirationRate] = useState<number>(50);
  const [selectedWhorl, setSelectedWhorl] = useState<number>(0); // 0: Calyx, 1: Corolla, 2: Androecium, 3: Gynoecium
  const [selectedOrganelle, setSelectedOrganelle] = useState<string>('nucleus');
  const [seedMoisture, setSeedMoisture] = useState<number>(60);
  const [seedTemperature, setSeedTemperature] = useState<number>(28);

  // Adaptive mastery and scoring
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

  // Drag-and-drop & Construction states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOTIVATIONAL FEEDBACK STRING (Exact specifications) ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── INITIAL LOAD FROM LOCAL STORAGE MASTERY ───
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

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME STOMATAL CALCULATION ───
  useEffect(() => {
    if (solarHeat > 75) {
      setStomatalState('closed');
      setWaterTranspirationRate(10);
    } else if (solarHeat > 40) {
      setStomatalState('open');
      setWaterTranspirationRate(Math.round(solarHeat * 1.2));
    } else {
      setStomatalState('semi');
      setWaterTranspirationRate(Math.round(solarHeat * 0.8));
    }
  }, [solarHeat]);

  // ─── 2D CANVAS WATER-FLOW & CHLOROPLAST STREAMING ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: { x: number; y: number; speed: number; radius: number; color: string }[] = [];
    for (let i = 0; i < 24; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        radius: 2 + Math.random() * 2.5,
        color: i % 2 === 0 ? '#38bdf8' : '#4ade80',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#064e3b20');
      grad.addColorStop(1, '#022c2240');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.y -= p.speed * (waterTranspirationRate / 40);
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [waterTranspirationRate]);

  // ─── AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACKS ───
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
      speechManager.speak('Let us review the step-by-step biological explanation.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding scientific intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Botanical Laboratories. Explore each living system!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test all variables in the botanical sandbox with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Prove your botanical mastery!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now manipulate the simulation control to verify.');
  }, []);

  const handleLeafPartClick = useCallback((partName: string, detail: string) => {
    setSelectedLeafPart(partName);
    audioManager.play('tap');
    speechManager.speak(`${partName}: ${detail}`);
  }, []);

  const handleSolarHeatChange = useCallback((heatVal: number) => {
    setSolarHeat(heatVal);
    audioManager.play('count');
  }, []);

  const handleWhorlSelect = useCallback((whorlIndex: number) => {
    setSelectedWhorl(whorlIndex);
    audioManager.play('tap');
    const names = ['Calyx (Sepals)', 'Corolla (Petals)', 'Androecium (Stamens)', 'Gynoecium (Pistil)'];
    speechManager.speak(`Inspecting ${names[whorlIndex]}`);
  }, []);

  const handleOrganelleSelect = useCallback((orgKey: string) => {
    setSelectedOrganelle(orgKey);
    audioManager.play('pop');
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
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
    setSortArrangement(prev => {
      const arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
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
    speechManager.speak(`Mastery level achieved! Final score ${finalScore} percent.`);
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
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent botanical deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
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
          speechManager.speak('Explanations unlocked. Study the scientific key.');
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

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-emerald-900/40 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 bg-slate-900/90 rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            className="text-3xl p-2 bg-emerald-950/80 rounded-xl border border-emerald-800/60 inline-block cursor-default"
            aria-label="Biology Subject Icon"
            role="img"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <motion.h1 initial={{ x: -10 }} animate={{ x: 0 }} className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {title}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400 font-medium">
              ICSE Class 6 Science (Biology) • Interactive Laboratory
            </motion.p>
          </div>
        </div>

        {/* Phase Badges & Difficulty */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600'
                : difficulty === 'standard'
                ? 'bg-gold-900/60 text-gold-300 border border-gold-600'
                : 'bg-rose-900/60 text-rose-300 border border-rose-600'
            }`}
            aria-label={`Current Difficulty Tier: ${difficulty}`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700 capitalize"
            aria-label={`Current Simulation Phase: ${phase}`}
          >
            Phase: {phase}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/60"
            >
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Botanical Mission Brief
              </motion.span>
              <motion.h2 initial={{ y: -5 }} animate={{ y: 0 }} className="text-2xl font-bold text-white mt-1">
                {SCENARIO.title}
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-300 text-sm mt-2 leading-relaxed">
                {SCENARIO.intro}
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-400 text-xs mt-2 border-l-2 border-emerald-500 pl-3">
                {SCENARIO.context}
              </motion.p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.005 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base font-semibold text-emerald-300 mb-1">
                Curiosity Discovery Hook:
              </motion.h3>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-sm font-medium mb-4">
                {DISCOVERY_QUESTION.question}
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Discovery option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`p-4 rounded-xl text-left text-sm transition-all border flex items-center justify-between ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-emerald-600'
                    }`}
                  >
                    <span>
                      <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-2">✓</span>
                    )}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-rose-400 font-bold ml-2">✗</span>
                    )}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {discoveryAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-sm flex items-center gap-2 ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}
                    >
                      <span>{discoveryCorrect ? '✓' : 'ℹ'}</span>
                      <span>{discoveryCorrect ? 'Spot on! You unlocked the secret of leaf adaptations.' : DISCOVERY_QUESTION.hintAfter}</span>
                    </motion.p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToExploration}
                      aria-label="Advance to botanical laboratories"
                      className="mt-4 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                    >
                      Enter Botanical Labs →
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Top Step Navigation */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800"
            >
              <div className="flex items-center gap-2">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold text-emerald-400 uppercase">
                  Station {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </motion.span>
                <span className="text-slate-400 text-xs hidden sm:inline">• {EXPLORATION_STEPS[currentSlide].title}</span>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Go to previous lab station"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg disabled:opacity-40"
                >
                  ← Previous
                </motion.button>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Go to next lab station"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Advance to free exploration sandbox"
                    className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-lg shadow"
                  >
                    Free Exploration Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Interactive Lab Workspace */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
              >
                <div>
                  <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold text-emerald-300">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </motion.h3>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-300 text-xs mt-1">
                    👉 {EXPLORATION_STEPS[currentSlide].instruction}
                  </motion.p>
                </div>

                {/* ── LAB 1: LEAF ANATOMY & VENATION ── */}
                {currentSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800"
                  >
                    <div className="lg:col-span-2 flex flex-col items-center justify-center relative min-h-[300px]">
                      <svg viewBox="0 0 450 300" className="w-full max-h-[290px] drop-shadow-xl" role="img" aria-label="Interactive leaf structure diagram">
                        <path d="M 50 280 Q 70 200 90 150" stroke="#78350f" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <path
                          d="M 90 150 Q 120 150 150 150"
                          stroke="#4d7c0f"
                          strokeWidth="6"
                          fill="none"
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Petiole stalk"
                          className="cursor-pointer hover:stroke-emerald-400 transition-colors"
                          onClick={() => handleLeafPartClick('Petiole', 'Slender stalk attaching the leaf lamina to the stem node.')}
                        />

                        {leafTypeMode === 'reticulate' && (
                          <g>
                            <path
                              d="M 150 150 C 180 50, 320 60, 400 150 C 320 240, 180 250, 150 150 Z"
                              fill="#15803d"
                              stroke="#22c55e"
                              strokeWidth="3"
                              role="button"
                              tabIndex={0}
                              aria-label="Inspect Lamina Leaf Blade"
                              className="cursor-pointer hover:fill-emerald-700 transition-colors"
                              onClick={() => handleLeafPartClick('Lamina (Leaf Blade)', 'Broad, flat green solar panel designed for maximum light capture.')}
                            />
                            <path
                              d="M 150 150 Q 275 150 400 150"
                              stroke="#86efac"
                              strokeWidth="4"
                              fill="none"
                              role="button"
                              tabIndex={0}
                              aria-label="Inspect Midrib conduit"
                              className="cursor-pointer hover:stroke-white transition-colors"
                              onClick={() => handleLeafPartClick('Midrib', 'Thick central vascular trunk supporting the leaf and transporting sap.')}
                            />
                            <path d="M 210 150 Q 250 100 290 85" stroke="#86efac" strokeWidth="2" fill="none" />
                            <path d="M 270 150 Q 310 110 340 100" stroke="#86efac" strokeWidth="1.5" fill="none" />
                            <path d="M 210 150 Q 250 200 290 215" stroke="#86efac" strokeWidth="2" fill="none" />
                            <path d="M 270 150 Q 310 190 340 200" stroke="#86efac" strokeWidth="1.5" fill="none" />
                          </g>
                        )}

                        {leafTypeMode === 'parallel' && (
                          <g>
                            <path
                              d="M 150 150 C 180 110, 340 120, 420 150 C 340 180, 180 190, 150 150 Z"
                              fill="#16a34a"
                              stroke="#4ade80"
                              strokeWidth="2.5"
                              role="button"
                              tabIndex={0}
                              aria-label="Inspect Grass Lamina"
                              className="cursor-pointer hover:fill-emerald-700"
                              onClick={() => handleLeafPartClick('Grass Lamina', 'Long, slender blade characteristic of monocot plants.')}
                            />
                            <path d="M 160 140 Q 290 135 410 150" stroke="#bbf7d0" strokeWidth="1.5" fill="none" />
                            <path d="M 150 150 Q 290 150 420 150" stroke="#bbf7d0" strokeWidth="2.5" fill="none" />
                            <path d="M 160 160 Q 290 165 410 150" stroke="#bbf7d0" strokeWidth="1.5" fill="none" />
                          </g>
                        )}

                        {leafTypeMode === 'compound' && (
                          <g>
                            <path d="M 150 150 L 380 150" stroke="#65a30d" strokeWidth="3" fill="none" />
                            {[190, 250, 310].map((lx, i) => (
                              <g key={i}>
                                <path d={`M ${lx} 150 C ${lx + 10} 100, ${lx + 40} 100, ${lx + 30} 150 Z`} fill="#15803d" stroke="#86efac" strokeWidth="1.5" />
                                <path d={`M ${lx} 150 C ${lx + 10} 200, ${lx + 40} 200, ${lx + 30} 150 Z`} fill="#15803d" stroke="#86efac" strokeWidth="1.5" />
                              </g>
                            ))}
                            <path d="M 380 150 C 390 130, 415 130, 410 150 C 415 170, 390 170, 380 150 Z" fill="#15803d" stroke="#86efac" strokeWidth="1.5" />
                          </g>
                        )}

                        <circle
                          cx="405"
                          cy="150"
                          r="8"
                          fill="#facc15"
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Leaf Apex"
                          className="cursor-pointer animate-pulse"
                          onClick={() => handleLeafPartClick('Leaf Apex', 'The pointed terminal tip of the leaf assisting in water droplet shedding.')}
                        />
                      </svg>
                    </div>

                    {/* Leaf Controls & Details */}
                    <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-slate-300">
                        Select Venation / Morphology:
                      </motion.p>
                      <div className="flex flex-wrap gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setLeafTypeMode('reticulate');
                            audioManager.play('tap');
                          }}
                          aria-label="Select Peepal Reticulate Venation"
                          className={`px-3 py-1.5 rounded-lg font-semibold ${
                            leafTypeMode === 'reticulate' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Peepal (Reticulate)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setLeafTypeMode('parallel');
                            audioManager.play('tap');
                          }}
                          aria-label="Select Grass Parallel Venation"
                          className={`px-3 py-1.5 rounded-lg font-semibold ${
                            leafTypeMode === 'parallel' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Grass (Parallel)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setLeafTypeMode('compound');
                            audioManager.play('tap');
                          }}
                          aria-label="Select Neem Compound Leaflets"
                          className={`px-3 py-1.5 rounded-lg font-semibold ${
                            leafTypeMode === 'compound' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Neem (Compound Leaflets)
                        </motion.button>
                      </div>

                      <motion.div whileHover={{ scale: 1.01 }} className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-emerald-400 font-bold block">Selected Part Inspector:</span>
                        <p className="text-slate-300 mt-1">
                          {selectedLeafPart ? selectedLeafPart : 'Click any glowing part on the diagram (Apex, Lamina, Midrib, Petiole) to analyze.'}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ── LAB 2: TRANSPIRATION & STOMATA ── */}
                {currentSlide === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    {!predictionMade && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/80"
                      >
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Predict-Then-Check</span>
                        <p className="text-white text-sm font-medium mt-1">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handlePrediction(i)}
                              aria-label={`Prediction choice ${i + 1}: ${opt}`}
                              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-left text-xs rounded-lg text-slate-200 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="relative rounded-xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center p-2"
                      >
                        <span className="text-xs text-slate-400 font-bold mb-1">Xylem Suction Pull Flow Simulation</span>
                        <canvas ref={canvasRef} width={260} height={180} className="w-full rounded-lg bg-slate-900" />
                        <span className="text-[11px] text-gold-400 mt-1">Transpiration Rate: {waterTranspirationRate} µL/min</span>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="flex flex-col items-center justify-center bg-slate-900 p-3 rounded-xl border border-slate-800"
                      >
                        <span className="text-xs text-emerald-400 font-bold mb-1">Stomatal Pore & Guard Cells</span>
                        <svg viewBox="0 0 200 160" className="w-44 h-36" role="img" aria-label="Microscopic view of stomatal pore and guard cells">
                          <rect x="10" y="10" width="180" height="140" rx="12" fill="#064e3b" opacity="0.4" />
                          <path
                            d={
                              stomatalState === 'closed'
                                ? 'M 95 30 C 70 50, 70 110, 95 130 C 90 100, 90 60, 95 30 Z'
                                : stomatalState === 'semi'
                                ? 'M 88 30 C 55 50, 55 110, 88 130 C 78 100, 78 60, 88 30 Z'
                                : 'M 80 30 C 40 50, 40 110, 80 130 C 65 100, 65 60, 80 30 Z'
                            }
                            fill="#22c55e"
                            stroke="#86efac"
                            strokeWidth="2"
                          />
                          <path
                            d={
                              stomatalState === 'closed'
                                ? 'M 105 30 C 130 50, 130 110, 105 130 C 110 100, 110 60, 105 30 Z'
                                : stomatalState === 'semi'
                                ? 'M 112 30 C 145 50, 145 110, 112 130 C 122 100, 122 60, 112 30 Z'
                                : 'M 120 30 C 160 50, 160 110, 120 130 C 135 100, 135 60, 120 30 Z'
                            }
                            fill="#22c55e"
                            stroke="#86efac"
                            strokeWidth="2"
                          />
                          <circle cx="65" cy="80" r="4" fill="#15803d" />
                          <circle cx="135" cy="80" r="4" fill="#15803d" />
                        </svg>
                        <span className="text-xs font-semibold text-amber-300 uppercase mt-1">Status: {stomatalState}</span>
                      </motion.div>

                      <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                        <span className="font-bold text-slate-300 block">Solar Temperature Control:</span>
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Cool (15°C)</span>
                          <span className="text-emerald-400 font-bold text-sm">{solarHeat}°C</span>
                          <span>Scorching (95°C)</span>
                        </div>
                        <input
                          type="range"
                          min={15}
                          max={95}
                          value={solarHeat}
                          aria-label="Solar heat control slider"
                          onChange={e => handleSolarHeatChange(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          Notice how moderate heat increases transpiration suction pull, but extreme temperature triggers guard cell closure to prevent lethal wilting!
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── LAB 3: FLOWER ARCHITECTURE (4 WHORLS) ── */}
                {currentSlide === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800"
                  >
                    <div className="lg:col-span-2 flex flex-col items-center justify-center min-h-[290px] relative">
                      <svg viewBox="0 0 400 280" className="w-full max-h-[280px]" role="img" aria-label="Floral anatomy diagram showing the 4 concentric whorls">
                        <path d="M 195 240 L 205 240 L 205 280 L 195 280 Z" fill="#4d7c0f" />
                        <ellipse cx="200" cy="235" rx="30" ry="12" fill="#65a30d" />

                        {/* 1st Whorl: Calyx */}
                        <g
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect 1st Whorl: Calyx (Sepals)"
                          className="cursor-pointer"
                          onClick={() => handleWhorlSelect(0)}
                          opacity={selectedWhorl === 0 ? 1 : 0.6}
                        >
                          <path d="M 170 235 Q 130 220 120 200 Q 150 215 175 230 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                          <path d="M 230 235 Q 270 220 280 200 Q 250 215 225 230 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                        </g>

                        {/* 2nd Whorl: Corolla */}
                        <g
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect 2nd Whorl: Corolla (Petals)"
                          className="cursor-pointer"
                          onClick={() => handleWhorlSelect(1)}
                          opacity={selectedWhorl === 1 ? 1 : 0.6}
                        >
                          <path d="M 175 225 C 100 160, 80 70, 150 60 C 170 120, 185 180, 185 220 Z" fill="#f43f5e" stroke="#e11d48" strokeWidth="2" />
                          <path d="M 225 225 C 300 160, 320 70, 250 60 C 230 120, 215 180, 215 220 Z" fill="#f43f5e" stroke="#e11d48" strokeWidth="2" />
                        </g>

                        {/* 3rd Whorl: Androecium */}
                        <g
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect 3rd Whorl: Androecium (Stamens)"
                          className="cursor-pointer"
                          onClick={() => handleWhorlSelect(2)}
                          opacity={selectedWhorl === 2 ? 1 : 0.6}
                        >
                          <path d="M 190 220 Q 160 140 160 90" stroke="#fde047" strokeWidth="3" fill="none" />
                          <ellipse cx="160" cy="85" rx="7" ry="5" fill="#eab308" stroke="#ca8a04" />
                          <path d="M 210 220 Q 240 140 240 90" stroke="#fde047" strokeWidth="3" fill="none" />
                          <ellipse cx="240" cy="85" rx="7" ry="5" fill="#eab308" stroke="#ca8a04" />
                        </g>

                        {/* 4th Whorl: Gynoecium */}
                        <g
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect 4th Whorl: Gynoecium (Pistil / Carpel)"
                          className="cursor-pointer"
                          onClick={() => handleWhorlSelect(3)}
                          opacity={selectedWhorl === 3 ? 1 : 0.6}
                        >
                          <ellipse cx="200" cy="210" rx="18" ry="18" fill="#a3e635" stroke="#65a30d" strokeWidth="2" />
                          <path d="M 197 192 L 197 60 L 203 60 L 203 192 Z" fill="#84cc16" />
                          <ellipse cx="200" cy="55" rx="10" ry="6" fill="#4d7c0f" stroke="#365314" strokeWidth="1.5" />
                          <circle cx="195" cy="210" r="3" fill="#fef08a" />
                          <circle cx="205" cy="210" r="3" fill="#fef08a" />
                        </g>
                      </svg>
                    </div>

                    <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                      <span className="font-bold text-slate-300 block">Select Whorl Ring to Inspect:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {['1. Calyx (Sepals)', '2. Corolla (Petals)', '3. Androecium (Male)', '4. Gynoecium (Female)'].map((wName, wi) => (
                          <motion.button
                            key={wi}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleWhorlSelect(wi)}
                            aria-label={`Select ${wName}`}
                            className={`p-2 rounded-lg text-left font-semibold transition-all ${
                              selectedWhorl === wi ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {wName}
                          </motion.button>
                        ))}
                      </div>

                      <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-lg border border-slate-800 mt-3 text-slate-300">
                        {selectedWhorl === 0 && (
                          <p><strong className="text-emerald-400">Calyx (Sepals):</strong> Outermost green whorl. Protects floral organs during the vulnerable bud stage.</p>
                        )}
                        {selectedWhorl === 1 && (
                          <p><strong className="text-rose-400">Corolla (Petals):</strong> Brightly colored, fragrant whorl producing nectar to attract insect and bird pollinators.</p>
                        )}
                        {selectedWhorl === 2 && (
                          <p><strong className="text-amber-400">Androecium (Stamens):</strong> Male reproductive whorl. Each stamen has a slender filament and anther producing yellow pollen grains.</p>
                        )}
                        {selectedWhorl === 3 && (
                          <p><strong className="text-lime-400">Gynoecium (Pistil):</strong> Innermost female whorl. Has a sticky pollen-receiving stigma, style neck, and ovary containing ovules.</p>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ── LAB 4: FRUIT PERICARP & SEED ANATOMY ── */}
                {currentSlide === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800"
                  >
                    <div className="lg:col-span-2 flex flex-col items-center justify-center min-h-[290px]">
                      <svg viewBox="0 0 420 260" className="w-full max-h-[270px]" role="img" aria-label="Mango drupe pericarp layers and bean seed embryo dissection">
                        <g>
                          <path d="M 50 130 C 50 50, 160 40, 200 130 C 160 220, 50 210, 50 130 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="4" />
                          <path d="M 58 130 C 58 60, 152 52, 192 130 C 152 208, 58 200, 58 130 Z" fill="#facc15" />
                          <ellipse cx="125" cy="130" rx="35" ry="45" fill="#78350f" stroke="#451a03" strokeWidth="3" />
                          <ellipse cx="125" cy="130" rx="20" ry="28" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                          <text x="125" y="134" textAnchor="middle" fontSize="10" fill="#78350f" fontWeight="bold">Seed</text>
                        </g>

                        <g transform="translate(240, 40)">
                          <path d="M 30 90 C 20 40, 80 20, 130 50 C 150 90, 130 150, 80 160 C 30 150, 30 110, 30 90 Z" fill="#b45309" stroke="#78350f" strokeWidth="3" />
                          <path d="M 38 90 C 30 50, 75 30, 120 58 C 138 92, 120 142, 75 150 C 38 142, 38 108, 38 90 Z" fill="#fde68a" />
                          <path d="M 55 90 Q 60 70 75 65" stroke="#15803d" strokeWidth="3" fill="none" />
                          <text x="80" y="65" fontSize="10" fill="#15803d" fontWeight="bold">Plumule (Shoot)</text>
                          <path d="M 55 90 Q 50 110 55 125" stroke="#b45309" strokeWidth="3" fill="none" />
                          <text x="60" y="130" fontSize="10" fill="#b45309" fontWeight="bold">Radicle (Root)</text>
                        </g>
                      </svg>
                    </div>

                    <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                      <span className="font-bold text-slate-300 block">Pericarp & Seed Key:</span>
                      <ul className="space-y-2 text-slate-300 text-[11px]">
                        <motion.li whileHover={{ scale: 1.02 }} className="p-2 bg-slate-950 rounded border border-slate-800">
                          <strong className="text-amber-400">Epicarp:</strong> Outer protective fruit skin.
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.02 }} className="p-2 bg-slate-950 rounded border border-slate-800">
                          <strong className="text-yellow-400">Mesocarp:</strong> Sweet fleshy middle layer storing food and water.
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.02 }} className="p-2 bg-slate-950 rounded border border-slate-800">
                          <strong className="text-amber-600">Endocarp:</strong> Hard woody inner stone protecting the fertilized seed.
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.02 }} className="p-2 bg-slate-950 rounded border border-slate-800">
                          <strong className="text-emerald-400">Embryo Triad:</strong> 2 Cotyledons (food) + Radicle (Root) + Plumule (Shoot).
                        </motion.li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* ── LAB 5: CELL ORGANELLE MICRO-LAB ── */}
                {currentSlide === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800"
                  >
                    <div className="lg:col-span-2 flex flex-col items-center justify-center min-h-[290px]">
                      <svg viewBox="0 0 420 280" className="w-full max-h-[280px]" role="img" aria-label="Plant cell organelle cytology diagram">
                        <rect
                          x="20"
                          y="20"
                          width="380"
                          height="240"
                          rx="24"
                          fill="#064e3b"
                          stroke="#22c55e"
                          strokeWidth="8"
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Cellulose Cell Wall"
                          className="cursor-pointer hover:stroke-emerald-300"
                          onClick={() => handleOrganelleSelect('wall')}
                        />
                        <rect
                          x="32"
                          y="32"
                          width="356"
                          height="216"
                          rx="16"
                          fill="#0f766e"
                          stroke="#5eead4"
                          strokeWidth="2"
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Semipermeable Cell Membrane"
                          className="cursor-pointer"
                          onClick={() => handleOrganelleSelect('membrane')}
                        />
                        <rect x="36" y="36" width="348" height="208" rx="14" fill="#022c22" opacity="0.8" />

                        <path
                          d="M 60 70 C 60 45, 180 45, 200 90 C 220 140, 180 220, 90 220 C 50 220, 60 120, 60 70 Z"
                          fill="#0284c7"
                          opacity="0.6"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Large Central Vacuole"
                          className="cursor-pointer hover:opacity-90"
                          onClick={() => handleOrganelleSelect('vacuole')}
                        />
                        <text x="120" y="140" textAnchor="middle" fontSize="12" fill="#e0f2fe" fontWeight="bold">Central Vacuole</text>

                        <g
                          role="button"
                          tabIndex={0}
                          aria-label="Inspect Cell Nucleus"
                          className="cursor-pointer"
                          onClick={() => handleOrganelleSelect('nucleus')}
                        >
                          <circle cx="290" cy="110" r="38" fill="#7e22ce" stroke="#c084fc" strokeWidth="3" />
                          <circle cx="290" cy="110" r="14" fill="#4c1d95" />
                          <text x="290" y="114" textAnchor="middle" fontSize="10" fill="#f3e8ff" fontWeight="bold">Nucleus</text>
                        </g>

                        {[{ cx: 250, cy: 195 }, { cx: 340, cy: 195 }, { cx: 240, cy: 55 }].map((cp, idx) => (
                          <g
                            key={idx}
                            role="button"
                            tabIndex={0}
                            aria-label={`Inspect Chloroplast Plastid ${idx + 1}`}
                            className="cursor-pointer"
                            onClick={() => handleOrganelleSelect('chloroplast')}
                          >
                            <ellipse cx={cp.cx} cy={cp.cy} rx="22" ry="14" fill="#15803d" stroke="#86efac" strokeWidth="2" />
                            <line x1={cp.cx - 12} y1={cp.cy} x2={cp.cx + 12} y2={cp.cy} stroke="#bbf7d0" strokeWidth="2" />
                          </g>
                        ))}
                      </svg>
                    </div>

                    <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                      <span className="font-bold text-slate-300 block">Click an organelle to inspect:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['nucleus', 'wall', 'membrane', 'vacuole', 'chloroplast'].map(ok => (
                          <motion.button
                            key={ok}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleOrganelleSelect(ok)}
                            aria-label={`Inspect ${ok} organelle`}
                            className={`px-2.5 py-1 rounded-md capitalize font-semibold ${
                              selectedOrganelle === ok ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {ok}
                          </motion.button>
                        ))}
                      </div>

                      <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 mt-2">
                        {selectedOrganelle === 'nucleus' && (
                          <p><strong className="text-purple-400">Nucleus:</strong> The master control center containing genetic instructions (DNA) directing cell metabolism and division.</p>
                        )}
                        {selectedOrganelle === 'wall' && (
                          <p><strong className="text-emerald-400">Cell Wall:</strong> Tough, non-living cellulose boundary providing structural rigidity and osmotic protection (plants only!).</p>
                        )}
                        {selectedOrganelle === 'membrane' && (
                          <p><strong className="text-teal-400">Cell Membrane:</strong> Selectively permeable living security gate controlling entry and exit of molecules.</p>
                        )}
                        {selectedOrganelle === 'vacuole' && (
                          <p><strong className="text-gold-400">Large Vacuole:</strong> Massive central fluid-filled reservoir storing cell sap, sugars, and maintaining internal turgor pressure.</p>
                        )}
                        {selectedOrganelle === 'chloroplast' && (
                          <p><strong className="text-green-400">Chloroplast (Plastid):</strong> Solar power organelle housing green chlorophyll pigment for manufacturing glucose via photosynthesis.</p>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-bold text-emerald-300">
                  Botanical Sandbox & Free Investigation
                </motion.h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  Explore parameters freely with zero grading pressure before tackling the CISCE assessment challenges.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Start challenges assessment mode"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg"
              >
                Start Challenges Now →
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sandbox Card 1: Stomatal Engine */}
              <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">Live Transpiration & Stomata Sim</span>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Ambient Heat: {solarHeat}°C</span>
                  <span className="text-amber-400 font-bold uppercase">Stoma: {stomatalState}</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={95}
                  value={solarHeat}
                  aria-label="Solar heat temperature slider for transpiration sim"
                  onChange={e => handleSolarHeatChange(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300 flex justify-between">
                  <span>Calculated Suction Pull:</span>
                  <span className="text-gold-400 font-bold">{waterTranspirationRate} % Capacity</span>
                </div>
              </motion.div>

              {/* Sandbox Card 2: Seed Germination Incubator */}
              <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">Seed Germination Incubator</span>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Moisture Level: {seedMoisture}%</span>
                  <span>Incubator Temp: {seedTemperature}°C</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={seedMoisture}
                    aria-label="Seed moisture level slider"
                    onChange={e => setSeedMoisture(Number(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                  <input
                    type="range"
                    min={5}
                    max={45}
                    value={seedTemperature}
                    aria-label="Incubator temperature slider"
                    onChange={e => setSeedTemperature(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
                <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300 flex justify-between">
                  <span>Sprouting Viability:</span>
                  <span className={`font-bold ${seedMoisture > 40 && seedTemperature >= 20 && seedTemperature <= 35 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {seedMoisture > 40 && seedTemperature >= 20 && seedTemperature <= 35 ? 'Optimal (Active Radicle Growth)' : 'Dormant / Sub-optimal'}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGE ASSESSMENT ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Progress Header */}
            <motion.div whileHover={{ scale: 1.005 }} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                  Competency: {challenge.competencyLevel}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Challenge Card */}
            <motion.div
              whileHover={{ scale: 1.002 }}
              className="p-6 bg-slate-900/95 rounded-2xl border border-slate-800 space-y-4"
            >
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">{challenge.question}</h2>

              {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5 mt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full p-4 rounded-xl text-left text-sm transition-all border flex items-center justify-between ${
                        wrongFlash
                          ? 'bg-rose-950/70 border-rose-600 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-emerald-500'
                      }`}
                    >
                      <span>
                        <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </span>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                      )}
                      {showExplanation && i !== challenge.correctIndex && wrongFlash && (
                        <span className="text-rose-400 font-bold ml-2">✗</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* TYPE 2: DRAG-LABEL CHALLENGE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 self-center mr-2">Label Palette:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Drag label: ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Drop target for ${item.targetId}`}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-colors ${
                          droppedLabels[item.targetId]
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                            : 'border-slate-700 bg-slate-950 text-slate-500'
                        }`}
                      >
                        <span className="text-[11px] font-mono text-slate-400 mb-1">Target: {item.targetId.replace('_', ' ').toUpperCase()}</span>
                        <span className="font-bold text-sm">
                          {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : 'Drop Label Here'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    aria-label="Verify anatomy labels"
                    className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider"
                  >
                    Verify Anatomy Labels →
                  </motion.button>
                </div>
              )}

              {/* TYPE 3: DRAG-SORT CHALLENGE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag/click items to reorder the biological sequence:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map(idx => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                        whileHover={{ scale: 1.02 }}
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs font-semibold cursor-grab flex items-center gap-3"
                      >
                        <span className="px-2 py-0.5 bg-slate-700 rounded text-emerald-400 font-bold">{displayIdx + 1}</span>
                        {item}
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    aria-label="Submit ordered sequence"
                    className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs uppercase"
                  >
                    Submit Ordered Sequence →
                  </motion.button>
                </div>
              )}

              {/* TYPE 4: NUMERIC CHALLENGE */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      aria-label="Enter numerical calculation result"
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold text-sm w-44"
                    />
                    <span className="text-slate-400 text-sm font-semibold">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      aria-label="Check numerical calculation"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider"
                    >
                      Check Calculation →
                    </motion.button>
                  </div>
                </div>
              )}

              {/* TYPE 5: CONSTRUCT CHALLENGE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        aria-label={`Add transformation part: ${part}`}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg text-xs font-semibold border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((p, pIdx) => (
                      <motion.span
                        key={pIdx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-emerald-950 text-emerald-200 border border-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-2"
                      >
                        {p}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== pIdx))}
                          aria-label={`Remove transformation part ${p}`}
                          className="text-rose-400 font-bold"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && <span className="text-slate-500 text-xs">Click elements above to assemble the developmental pathway.</span>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' + '))}
                    disabled={showExplanation || constructParts.length === 0}
                    aria-label="Validate assembled transformation pathway"
                    className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs uppercase"
                  >
                    Validate Pathway →
                  </motion.button>
                </div>
              )}

              {/* Progressive Step-by-Step Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-5 bg-emerald-950/40 rounded-xl border border-emerald-800/80 space-y-3"
                  >
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Scientific Key & Walkthrough:</span>
                    <div className="space-y-2">
                      {challenge.explanation
                        .split('. ')
                        .filter(s => s.trim().length > 0)
                        .slice(0, revealedSteps + 1)
                        .map((sentence, sIdx) => (
                          <motion.p
                            key={sIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-slate-200 text-xs sm:text-sm leading-relaxed"
                          >
                            <span className="font-bold text-emerald-400 mr-2">{sIdx + 1}.</span>
                            {sentence}{!sentence.endsWith('.') && '.'}
                          </motion.p>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setRevealedSteps(r => r + 1)}
                          aria-label="Reveal next explanation detail"
                          className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-800"
                        >
                          Show Next Detail →
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleNextChallenge}
                          aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finish assessment and view certification' : 'Advance to next challenge'}
                          className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
                        >
                          {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Assessment →' : 'Next Challenge →'}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION, REFLECTION & REAL-WORLD REPORT ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Completion Banner */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/80 text-center space-y-3"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                className="text-4xl inline-block"
                role="img"
                aria-label="Trophy"
              >
                🏆
              </motion.span>
              <motion.h2 initial={{ y: -10 }} animate={{ y: 0 }} className="text-2xl sm:text-3xl font-extrabold text-white">
                Botanical Mastery Certification
              </motion.h2>
              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                You have systematically investigated plant anatomy, leaf venation, floral whorls, fertilization, pericarp architecture, and cell cytology!
              </p>
              <div className="flex justify-center gap-4 text-xs font-bold">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-1.5 bg-emerald-900/60 rounded-full border border-emerald-500 text-emerald-300"
                >
                  ✓ Score: {Math.max(0, 100 - errors * 5)}%
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-1.5 bg-gold-900/60 rounded-full border border-gold-500 text-gold-300 capitalize"
                >
                  Tier Mastery: {masteryLevel}
                </motion.span>
              </div>
            </motion.div>

            {/* Personalized Motivational Feedback Section */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className={`p-5 rounded-2xl border ${
                errors === 0
                  ? 'bg-emerald-950/60 border-emerald-500'
                  : errors <= 3
                  ? 'bg-gold-950/60 border-gold-500'
                  : errors <= 7
                  ? 'bg-amber-950/60 border-amber-500'
                  : 'bg-rose-950/60 border-rose-500'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-slate-300 block mb-1">Motivational Feedback:</span>
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2"
              >
                <span>{errors <= 3 ? '✓' : 'ℹ'}</span>
                <span>{motivationalMessage}</span>
              </motion.h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {errors === 0
                  ? 'Flawless execution! You mastered all botanical diagnostic tasks with 0 errors.'
                  : errors <= 3
                  ? 'High proficiency across all leaf structures, floral whorls, and cell cytology.'
                  : errors <= 7
                  ? 'Solid foundation established. Review the tricky questions to cement your exam readiness.'
                  : 'Every scientist faces challenging experiments. Keep exploring and practicing to unlock total biological mastery!'}
              </p>
            </motion.div>

            {/* Reflection Questions Section */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🤔</span>
                <h3 className="text-base font-bold text-emerald-300 uppercase tracking-wide">Botanist Reflection</h3>
              </div>
              <p className="text-xs text-slate-400">Deepen your conceptual retention by contemplating these three reflective prompts:</p>

              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="ref_surprising" className="text-xs font-bold text-white block">
                    1. What was the most surprising thing you learned?
                  </label>
                  <input
                    id="ref_surprising"
                    type="text"
                    value={reflectionAnswers.surprising}
                    onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                    placeholder="e.g., That cactus spines are actual modified leaves..."
                    aria-label="Reflection: What was the most surprising thing you learned?"
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="ref_explain" className="text-xs font-bold text-white block">
                    2. How would you explain this to a friend?
                  </label>
                  <input
                    id="ref_explain"
                    type="text"
                    value={reflectionAnswers.explain}
                    onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                    placeholder="e.g., Flowers have 4 circular rings designed to attract bees and build seeds..."
                    aria-label="Reflection: How would you explain this to a friend?"
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="ref_reallife" className="text-xs font-bold text-white block">
                    3. Where in real life might you use this?
                  </label>
                  <input
                    id="ref_reallife"
                    type="text"
                    value={reflectionAnswers.realLife}
                    onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                    placeholder="e.g., Identifying healthy garden plants, understanding crop watering in summer..."
                    aria-label="Reflection: Where in real life might you use this?"
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Misconception Tracking Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/80 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wide">Identified Misconception Profile</h3>
                <p className="text-xs text-slate-300">Target these specific misunderstandings before your next examination:</p>
                <div className="space-y-2">
                  {hitMisconceptions.map((mIdx, i) => {
                    const mObj = misconceptions?.[mIdx];
                    if (!mObj) return null;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs"
                      >
                        <p className="text-rose-400 font-bold">✗ Common Trap: {mObj.misconception}</p>
                        <p className="text-emerald-300 font-medium mt-1">✓ Scientific Truth: {mObj.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition Schedule */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-bold text-amber-400 block uppercase">SM-2 Spaced Repetition Protocol</span>
                <p className="text-slate-400 mt-0.5">
                  Next memory review scheduled in{' '}
                  <strong className="text-emerald-300 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '24 hours'}</strong>.
                </p>
              </div>
              <motion.span whileHover={{ scale: 1.05 }} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
                ✓ SRS Active
              </motion.span>
            </motion.div>

            {/* Real-World Activity */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Outdoor Field Expedition</span>
              <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ol className="space-y-1.5 text-xs text-slate-400 pl-4 list-decimal">
                {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                  <motion.li key={sIdx} whileHover={{ x: 3 }} className="transition-transform">
                    {st}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MODALS & FEEDBACK POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}
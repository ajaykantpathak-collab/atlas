'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C9_EVS_001 = 'c9_evs_001';
const NODE_C9_EVS_002 = 'c9_evs_002';
const NODE_C9_EVS_003 = 'c9_evs_003';
const NODE_C9_EVS_004 = 'c9_evs_004';
const NODE_C9_EVS_005 = 'c9_evs_005';
const NODE_C9_EVS_006 = 'c9_evs_006';
const NODE_C9_EVS_007 = 'c9_evs_007';
const NODE_C9_EVS_008 = 'c9_evs_008';
const NODE_C9_EVS_009 = 'c9_evs_009';
const NODE_C9_EVS_010 = 'c9_evs_010';

const ALL_NODE_IDS = [
  NODE_C9_EVS_001,
  NODE_C9_EVS_002,
  NODE_C9_EVS_003,
  NODE_C9_EVS_004,
  NODE_C9_EVS_005,
  NODE_C9_EVS_006,
  NODE_C9_EVS_007,
  NODE_C9_EVS_008,
  NODE_C9_EVS_009,
  NODE_C9_EVS_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Western Ghats Ecological Crisis',
  intro: 'In the Nilgiri biosphere reserve, erratic rainfall, deforestation, and apex predator declines are threatening the delicate balance of five Earth spheres and intricate trophic webs.',
  context: 'As an environmental scientist appointed by the National Biodiversity Authority, your mission is to analyse the biotic and abiotic interactions, restore trophic pyramids, and implement ecocentric solutions.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If the Bengal Tiger population drops by 90% in an Indian reserve, what happens first to the primary producer (grassland) vegetation?',
  options: [
    'Grasslands thrive because there is less animal trampling.',
    'Grasslands are heavily overgrazed and depleted because herbivore numbers explode without apex control.',
    'Grasslands remain identical because tigers do not eat plants.',
    'Grasslands turn into dense rain forests immediately.',
  ],
  correctIndex: 1,
  hintAfter: 'Apex predators act as keystone species! Their removal cascades down through herbivores to producers.',
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct' | 'analysis' | 'application';
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

// ─── CHALLENGES ARRAY (22 Progressive Challenges) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'ch_01_f',
    nodeId: NODE_C9_EVS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is classified as an ABIOTIC component of a forest ecosystem?',
    options: ['Fungi decomposing sal leaves', 'Sunlight reaching the canopy', 'Bark-boring beetle', 'Mycorrhizal network'],
    correctIndex: 1,
    explanation: 'Abiotic components are non-living physical and chemical factors such as sunlight, temperature, water, air, and soil minerals.',
    hints: [
      'Look for the option that is non-living and physical.',
      'Fungi, beetles, and mycorrhizae are all biological organisms.',
      'Sunlight provides the physical radiant energy and is non-living.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_f',
    nodeId: NODE_C9_EVS_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The Gangotri glacier, polar ice caps, and permafrost belong to which distinct Earth sphere?',
    options: ['Hydrosphere', 'Lithosphere', 'Cryosphere', 'Troposphere'],
    correctIndex: 2,
    explanation: 'The cryosphere is all frozen water on Earth (glaciers, ice caps, permafrost). It is distinct because frozen water behaves on long timescales.',
    hints: [
      'Think of the prefix "cryo-" which means icy cold or frozen.',
      'It contains frozen water, distinct from liquid oceans and rivers.',
      'The sphere dedicated specifically to glaciers and ice is the cryosphere.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_f',
    nodeId: NODE_C9_EVS_004,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Construct the balanced chemical equation for oxygenic photosynthesis by arranging the reactants and products.',
    availableParts: ['6CO2', '+', '6H2O', '->', 'C6H12O6', '+', '6O2'],
    targetState: '6CO2 + 6H2O -> C6H12O6 + 6O2',
    validationHint: 'Reactants: 6 carbon dioxide and 6 water molecules; Products: 1 glucose and 6 oxygen molecules.',
    explanation: 'Photosynthesis converts 6CO2 + 6H2O + light energy into 1 glucose (C6H12O6) and 6 oxygen (6O2) in chloroplasts.',
    hints: [
      'Place carbon dioxide and water on the left side before the arrow.',
      'Add the arrow "->" between reactants and products.',
      'Assemble: 6CO2 + 6H2O -> C6H12O6 + 6O2.',
    ],
  },
  {
    id: 'ch_04_f',
    nodeId: NODE_C9_EVS_006,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'India cultivates thousands of traditional rice varieties (Basmati, Pokkali, etc.). This is an example of which level of biodiversity?',
    options: ['Species diversity', 'Genetic diversity', 'Ecosystem diversity', 'Biome diversity'],
    correctIndex: 1,
    explanation: 'Genetic diversity is the variation of genes and alleles within a single species (Oryza sativa), such as distinct rice varieties with different salt or pest tolerances.',
    hints: [
      'All rice varieties belong to a SINGLE species: Oryza sativa.',
      'Differences inside the same species represent allele/gene variations.',
      'Hence, it is genetic diversity.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_f',
    nodeId: NODE_C9_EVS_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Lichens growing on tree bark in Uttarakhand disappear when air is polluted by sulphur dioxide (SO2). Lichens are classified as:',
    options: ['Keystone species', 'Indicator species (Bioindicator)', 'Invasive species', 'Apex predator'],
    correctIndex: 1,
    explanation: 'Indicator species (bioindicators) reveal environmental quality or pollution through their presence, absence, or physiological state.',
    hints: [
      'They act like a diagnostic smoke detector for clean air.',
      'They report pollution levels, rather than physically structuring the food web.',
      'This diagnostic role defines an indicator species.',
    ],
  },
  {
    id: 'ch_06_f',
    nodeId: NODE_C9_EVS_008,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange this Indian grassland food chain in order of energy flow (from lowest trophic level to highest).',
    sortItems: ['Grass (Producer)', 'Grasshopper (Primary Consumer)', 'Frog (Secondary Consumer)', 'Snake (Tertiary Consumer)', 'Peacock (Apex Carnivore)'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Energy flows sequentially from Producers (Trophic level 1) to Primary, Secondary, Tertiary consumers and Apex Carnivores.',
    hints: [
      'Producers (Grass) always capture sunlight first at Level 1.',
      'Herbivores (Grasshopper) eat grass, frogs eat grasshoppers.',
      'Snakes eat frogs, and peacocks prey on snakes.',
    ],
  },
  {
    id: 'ch_07_f',
    nodeId: NODE_C9_EVS_009,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the root nodules of Indian gram and pea crops, Rhizobium bacteria fix nitrogen for the plant and receive carbohydrates. What interaction is this?',
    options: ['Mutualism (+/+)', 'Commensalism (+/0)', 'Parasitism (+/-)', 'Amensalism (0/-)'],
    correctIndex: 0,
    explanation: 'Mutualism is an interaction where BOTH partner species benefit (+/+). Rhizobium gains food/shelter while the legume gains vital nitrates.',
    hints: [
      'Check if both partners benefit or if one is harmed.',
      'Bacteria get sugar; the plant gets fixed nitrogen.',
      'Both gain (+/+), so it is Mutualism.',
    ],
  },

  // STANDARD (8)
  {
    id: 'ch_08_s',
    nodeId: NODE_C9_EVS_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Western Ghats forest, producers (green plants) fix 40,000 kJ of solar energy. By Lindeman’s 10% rule, how much energy (in kJ) is available to the Secondary Consumers (Trophic Level 3)?',
    correctAnswer: 400,
    tolerance: 0,
    unit: 'kJ',
    explanation: 'Trophic Level 1 (Producers) = 40,000 kJ. Level 2 (Primary Consumers/Herbivores) = 10% of 40,000 = 4,000 kJ. Level 3 (Secondary Consumers) = 10% of 4,000 = 400 kJ.',
    hints: [
      'Apply the 10% rule step by step for each level.',
      'Producers = 40,000 kJ -> Herbivores receive 10% (4,000 kJ).',
      'Secondary consumers receive 10% of 4,000 kJ = 400 kJ.',
    ],
  },
  {
    id: 'ch_09_s',
    nodeId: NODE_C9_EVS_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare Anthropocentric and Ecocentric worldviews. Which statement correctly identifies an Ecocentric philosophy?',
    options: [
      'Nature is primarily a resource reserve to be exploited for human technological progress.',
      'All living beings have intrinsic equal standing in the biosphere; humans are one interconnected species among many.',
      'Only economically valuable species like timber and livestock deserve legal protection.',
      'Human intelligence grants moral right to dominate and reshape all abiotic spheres without limits.',
    ],
    correctIndex: 1,
    explanation: 'The ecocentric worldview places all living beings on equal footing, recognising ecological balance and intrinsic value rather than human superiority.',
    hints: [
      '"Eco" refers to the entire ecological house/system, not human-centered ("Anthro").',
      'Look for the option that treats humans as equal partners in the web of life.',
      'Ecocentrism recognizes the equal standing of all species in the biosphere.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_10_s',
    nodeId: NODE_C9_EVS_005,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the specific bacteria to their correct role in the Nitrogen Cycle: (1) Nitrosomonas/Nitrobacter, (2) Rhizobium, (3) Pseudomonas.',
    options: [
      '1: Fixation, 2: Denitrification, 3: Nitrification',
      '1: Nitrification, 2: Nitrogen Fixation, 3: Denitrification',
      '1: Ammonification, 2: Assimilation, 3: Fixation',
      '1: Denitrification, 2: Nitrification, 3: Nitrogen Fixation',
    ],
    correctIndex: 1,
    explanation: 'Rhizobium fixes atmospheric N2 into ammonia; Nitrosomonas/Nitrobacter oxidize ammonia into nitrites and nitrates (nitrification); Pseudomonas returns nitrates into N2 gas (denitrification).',
    hints: [
      'Rhizobium in root nodules performs Nitrogen Fixation.',
      'Nitrosomonas and Nitrobacter produce nitrates (Nitrification).',
      'Pseudomonas completes the cycle back to N2 (Denitrification).',
    ],
  },
  {
    id: 'ch_11_s',
    nodeId: NODE_C9_EVS_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The dodder plant (Cuscuta) has no chlorophyll and produces haustoria that penetrate hedge shrubs to extract water and nutrients. This interaction is:',
    options: ['Commensalism (+/0)', 'Parasitism (+/-)', 'Mutualism (+/+)', 'Amensalism (0/-)'],
    correctIndex: 1,
    explanation: 'Cuscuta is a plant parasite (+/-). It benefits by draining sap and nutrients, while the host shrub is deprived and harmed.',
    hints: [
      'Does Cuscuta give anything in return? No, it has no chlorophyll.',
      'The host plant is weakened while Cuscuta grows.',
      'One benefits and one is harmed: Parasitism.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_12_s',
    nodeId: NODE_C9_EVS_002,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Map the five interacting Earth spheres to their corresponding real-world manifestation in India.',
    dragItems: [
      { label: 'Gangotri Glacier', targetId: 'target_cryo' },
      { label: 'Deccan Basalt Crust', targetId: 'target_litho' },
      { label: 'Monsoon Clouds', targetId: 'target_atmo' },
      { label: 'River Godavari', targetId: 'target_hydro' },
    ],
    correctMapping: {
      target_cryo: 'Gangotri Glacier',
      target_litho: 'Deccan Basalt Crust',
      target_atmo: 'Monsoon Clouds',
      target_hydro: 'River Godavari',
    },
    explanation: 'Gangotri is Cryosphere (ice); Deccan Basalt is Lithosphere (crust/rock); Monsoon Clouds represent Atmosphere; River Godavari is Hydrosphere (liquid water).',
    hints: [
      'Gangotri is frozen water in the Himalayas (Cryosphere).',
      'Deccan plateau consists of volcanic rocks and soil (Lithosphere).',
      'Monsoon clouds consist of atmospheric water vapour.',
    ],
  },
  {
    id: 'ch_13_s',
    nodeId: NODE_C9_EVS_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which statement accurately distinguishes between an organism’s Habitat and its Ecological Niche?',
    options: [
      'Habitat is the functional profession (diet, interactions); Niche is the geographical address.',
      'Habitat is the geographical "address" (where it lives); Niche is the functional "profession" (what it does, eats, and how it interacts).',
      'Habitat applies only to plants; Niche applies only to animals.',
      'Habitat changes daily; Niche never changes across millions of years.',
    ],
    correctIndex: 1,
    explanation: 'Habitat is the physical place/address (e.g. a pond). Ecological Niche is the complete functional role/profession (e.g. eating insects, being preyed on, laying eggs in water).',
    hints: [
      'Remember the classic analogy: Habitat = Address, Niche = Profession.',
      'A frog’s address is the pond; its profession is insect predator and prey for snakes.',
      'Choose the option reflecting Address vs Profession.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_14_s',
    nodeId: NODE_C9_EVS_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why are Sea Otters in kelp forests and Bengal Tigers in Indian forests considered "Keystone Species"?',
    options: [
      'They have the highest population numbers and largest physical biomass in their ecosystems.',
      'Their ecological impact is disproportionately large relative to their abundance; removing them collapses the community structure.',
      'They are the only species that can photosynthesise in their biomes.',
      'They are harmless indicator organisms that produce no effect on other trophic levels.',
    ],
    correctIndex: 1,
    explanation: 'A keystone species holds an ecosystem together. Its impact is disproportionately vast relative to its numbers; removing it causes trophic cascades.',
    hints: [
      'Keystone comes from the central stone in an arch that prevents it from collapsing.',
      'Tigers control herbivore populations, preventing entire forests from being stripped bare.',
      'Disproportionate impact relative to abundance is the scientific definition.',
    ],
  },
  {
    id: 'ch_15_s',
    nodeId: NODE_C9_EVS_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the largest active carbon sink on planet Earth that absorbs over 25% of anthropogenic CO2 emissions?',
    options: ['Tropical rainforest soil', 'Atmospheric clouds', 'The Global Ocean', 'Limestone quarries in Rajasthan'],
    correctIndex: 2,
    explanation: 'The global ocean is the largest active carbon sink, dissolving atmospheric CO2 as bicarbonate ions and locking it in marine carbonate shells.',
    hints: [
      'It covers 71% of the planetary surface.',
      'It dissolves carbon dioxide directly into chemical carbonate and bicarbonate pools.',
      'The ocean is the massive marine sink.',
    ],
  },

  // ADVANCED (7)
  {
    id: 'ch_16_a',
    nodeId: NODE_C9_EVS_006,
    type: 'analysis',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Forest A has 50 tree species, but 92% of all individual trees belong to a single teak species. Forest B has 50 tree species, each making up about 2% of the population. Which statement is correct?',
    options: [
      'Forest A has higher species richness and higher species evenness than Forest B.',
      'Both forests have identical species richness (50), but Forest B has much higher species evenness and resilience.',
      'Forest B has higher richness, while Forest A has higher evenness.',
      'Forest A is more stable because having one dominant tree prevents competition.',
    ],
    correctIndex: 1,
    explanation: 'Richness is the count of species (50 for both). Evenness is the relative balance of abundances. Forest B is far more even and less vulnerable to single-pest blights.',
    hints: [
      'Count the number of species: both have 50 (identical richness).',
      'Look at population distribution: 92% vs 2% spread.',
      'Balanced distribution equals high species evenness.',
    ],
  },
  {
    id: 'ch_17_a',
    nodeId: NODE_C9_EVS_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyse this feedback loop: Fossil fuel burning -> Global warming -> Warmer Arabian Sea -> Stronger cyclones hitting Mumbai -> Destruction of human coastal infrastructure. This illustrates:',
    options: [
      'A one-way anthropogenic impact where nature cannot respond.',
      'A two-way human-environment feedback loop where human actions return through altered spheres to impact humans.',
      'An abiotic-only process independent of the biosphere.',
      'Proof that the anthropocentric worldview is biologically sustainable.',
    ],
    correctIndex: 1,
    explanation: 'This is a circular causation feedback loop demonstrating that human disruptions to the atmosphere/hydrosphere rebound directly onto human society.',
    hints: [
      'Notice that the starting point is human activity, and the endpoint damages human settlements.',
      'The environmental change transmits and amplifies the impact.',
      'It is a two-way feedback loop.',
    ],
  },
  {
    id: 'ch_18_a',
    nodeId: NODE_C9_EVS_004,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does the ongoing Sixth Mass Extinction (Anthropocene) fundamentally differ from the historical Five Mass Extinctions (e.g. End-Cretaceous)?',
    options: [
      'It occurs much slower across millions of years rather than sudden decades.',
      'It is primarily driven by anthropogenic activities (deforestation, climate change, pollution) occurring at rates hundreds of times the background rate.',
      'It only affects marine invertebrates while terrestrial vertebrates are unaffected.',
      'It is caused by a massive extraterrestrial asteroid impact in the Indian ocean.',
    ],
    correctIndex: 1,
    explanation: 'The Sixth Mass Extinction is uniquely driven by human actions at unprecedented speed (decades/centuries rather than geological epochs) and is preventable through conservation.',
    hints: [
      'Think about the driving agent: humans vs natural geological catastrophes.',
      'Consider the speed: human destruction happens over centuries, not millions of years.',
      'Anthropogenic cause and rapid rate define the Sixth Mass Extinction.',
    ],
  },
  {
    id: 'ch_19_a',
    nodeId: NODE_C9_EVS_010,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the 7 ecological hierarchy levels in strict ascending order from smallest individual unit to planetary scale.',
    sortItems: ['Organism', 'Species', 'Population', 'Community', 'Ecosystem', 'Biome', 'Biosphere'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    explanation: 'The nested hierarchy ascends from Organism -> Species -> Population -> Community -> Ecosystem -> Biome -> Biosphere.',
    hints: [
      'Start with a single individual (Organism).',
      'Interbreeding individuals make a Species; one species in a park is a Population.',
      'All interacting populations make a Community; add abiotic factors for Ecosystem, then Biome and Biosphere.',
    ],
  },
  {
    id: 'ch_20_a',
    nodeId: NODE_C9_EVS_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Penicillium mould produces penicillin which inhibits and kills surrounding bacteria, while the mould itself gains neither food nor direct benefit. What interaction is this?',
    options: ['Amensalism (0/-)', 'Competition (-/-)', 'Predation (+/-)', 'Commensalism (+/0)'],
    correctIndex: 0,
    explanation: 'Amensalism is an asymmetrical interaction where one organism is inhibited or harmed (bacteria, -) while the other remains completely unaffected (mould, 0).',
    hints: [
      'Does the mould eat the bacteria? No.',
      'Bacteria are harmed (-), but the mould experiences no gain or loss (0).',
      'The (0/-) relationship is called Amensalism.',
    ],
  },
  {
    id: 'ch_21_a',
    nodeId: NODE_C9_EVS_005,
    type: 'application',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A farmer in Punjab applies excessive chemical urea fertiliser and heavily pumps deep borewells. What combined ecological disruptions occur?',
    options: [
      'Nitrogen cycle overload (causing algal blooms/eutrophication & N2O emissions) and Hydrosphere water table depletion exceeding recharge rates.',
      'Increased atmospheric ozone layer thickness and oceanic freezing.',
      'Elimination of all soil decomposers with zero impact on groundwater.',
      'Immediate conversion of the ecosystem into a temperate tundra biome.',
    ],
    correctIndex: 0,
    explanation: 'Excess urea leaches into water bodies causing eutrophication and denitrification release of N2O, while tube-wells over-extract groundwater faster than monsoon infiltration can replenish.',
    hints: [
      'Connect urea to the Nitrogen cycle (nitrate runoff, eutrophication).',
      'Connect deep tube-wells to the Hydrosphere (aquifer water table drop).',
      'Select the option covering both nitrogen overload and groundwater depletion.',
    ],
  },
  {
    id: 'ch_22_a',
    nodeId: NODE_C9_EVS_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a lake, phytoplankton absorb 125,000 kJ of sunlight. Zooplankton eat the phytoplankton, small fish eat zooplankton, and an Osprey (apex bird) eats the small fish. Calculate the energy reaching the Osprey in kJ.',
    correctAnswer: 125,
    tolerance: 0,
    unit: 'kJ',
    explanation: 'Phytoplankton (Level 1) = 125,000 kJ. Zooplankton (Level 2) = 12,500 kJ. Small fish (Level 3) = 1,250 kJ. Osprey (Level 4) = 125 kJ.',
    hints: [
      'Level 1 (Producers) = 125,000 kJ.',
      'Level 2 = 10% of 125,000 = 12,500 kJ; Level 3 = 10% of 12,500 = 1,250 kJ.',
      'Level 4 (Osprey) = 10% of 1,250 kJ = 125 kJ.',
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
  nodeId: NODE_C9_EVS_001,
  title: 'Earth & Its Biotic/Abiotic Environment',
  definition: 'The environment is the sum total of all external biotic (living) and abiotic (non-living) conditions that surround and affect an organism across Earth’s interacting spheres.',
  eli5: 'Earth is a giant living spaceship where air, water, rocks, and ice interact continuously to support plants, animals, and decomposers in balanced energy cycles.',
  misconceptions: [
    {
      misconception: 'Abiotic components are unimportant because they are not alive.',
      correction: 'Abiotic components (sunlight, water, soil minerals, air) provide the fundamental energy and chemical building blocks without which no living organism can survive.',
    },
    {
      misconception: 'The cryosphere is merely a sub-part of the hydrosphere and does not warrant separate study.',
      correction: 'The cryosphere locks water in solid ice form for millennia, dictating global planetary albedo, sea levels, and freshwater river flows across continents.',
    },
    {
      misconception: 'Humans are superior to nature and sit outside the ecological web.',
      correction: 'Humans are a biological species embedded inside the biosphere, dependent on other organisms for oxygen, food, and nutrient recycling, and vulnerable to environmental collapse.',
    },
    {
      misconception: 'Species richness alone measures biodiversity.',
      correction: 'True biodiversity incorporates species richness (number of distinct species) AND species evenness (how equally balanced their population numbers are).',
    },
    {
      misconception: 'Parasites kill their hosts immediately just like predators do.',
      correction: 'Parasites evolve to keep their host alive as long as possible to sustain their own continuous shelter and nutrient extraction.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which is a living (biotic) component?', options: ['Soil pH', 'Sunlight', 'Nitrogen-fixing bacteria', 'Rainfall'], correctIndex: 2 },
    { question: 'What percentage of global species does India harbour on just 2.4% of land area?', options: ['1-2%', '7-8%', '25-30%', '50%'], correctIndex: 1 },
    { question: 'What happens to available energy as you move up each trophic level?', options: ['Multiplies by 10x', 'Decreases by ~90% (10% rule)', 'Remains 100% constant', 'Converts into matter'], correctIndex: 1 },
    { question: 'In mutualism, what is the net effect on the two interacting species?', options: ['+ / -', '+ / 0', '+ / +', '0 / -'], correctIndex: 2 },
    { question: 'Which organism is a key bioindicator of atmospheric SO2 pollution?', options: ['Earthworm', 'Lichen', 'Tiger', 'Termite'], correctIndex: 1 },
    { question: 'What is the role of Rhizobium in legume root nodules?', options: ['Decompose cellulose', 'Fix inert atmospheric N2 into ammonia', 'Produce oxygen', 'Kill insects'], correctIndex: 1 },
    { question: 'Which sphere comprises all frozen ice, glaciers, and permafrost?', options: ['Lithosphere', 'Cryosphere', 'Mesosphere', 'Stratosphere'], correctIndex: 1 },
    { question: 'What is the term for all individuals of a single species in one protected area?', options: ['Community', 'Population', 'Biome', 'Biosphere'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is demonstrated by analysing biotic-abiotic interactions, balancing biogeochemical and energy flow models, and resolving ecological cascade problems.',
};

// ─── EXPLORATION STEPS (5 Interactive Hands-on Labs) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Five Interlocking Earth Spheres',
    instruction: 'Click each sphere node to observe energy and matter exchanges across Lithosphere, Hydrosphere, Atmosphere, Cryosphere, and Biosphere.',
    interactionType: 'click-spheres',
    nodeId: NODE_C9_EVS_002,
  },
  {
    title: 'Lab 2: Sunlight to Biomass - Photosynthesis & Respiration',
    instruction: 'Adjust the Solar Radiation and CO2 sliders to discover how photosynthetic production drives biomass creation.',
    interactionType: 'slider-photosynthesis',
    nodeId: NODE_C9_EVS_004,
  },
  {
    title: 'Lab 3: Trophic Energy Flow & Lindeman’s 10% Pyramid',
    instruction: 'Vary the base Primary Producer biomass and watch the energy transfer attenuate up to the apex predator.',
    interactionType: 'slider-trophic',
    nodeId: NODE_C9_EVS_008,
  },
  {
    title: 'Lab 4: The Nitrogen & Carbon Biogeochemical Engines',
    instruction: 'Toggle chemical pathways to trace nitrogen fixation by Rhizobium, nitrification, and ocean carbon buffering.',
    interactionType: 'toggle-biogeochem',
    nodeId: NODE_C9_EVS_005,
  },
  {
    title: 'Lab 5: Ecological Niche & Species Interactions',
    instruction: 'Pair different Indian organisms in the interaction chamber to see the mathematical payoff (+/+, +/-, +/0, 0/-).',
    interactionType: 'matrix-interactions',
    nodeId: NODE_C9_EVS_009,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If human fossil fuel emissions double atmospheric CO2 from 420 ppm to 840 ppm, how will the global ocean respond?',
    options: [
      'The ocean will stop absorbing carbon completely.',
      'The ocean will absorb more dissolved CO2, forming carbonic acid and causing ocean acidification that damages coral reefs.',
      'The ocean will instantly turn into freshwater.',
      'The ocean will emit pure nitrogen gas.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Carbon cycle combustion slider to 800+ ppm in the simulation to verify oceanic acidification and sink saturation.',
    nodeId: NODE_C9_EVS_005,
  },
  {
    question: 'Predict: What will happen to a forest ecosystem if all apex predators (Bengal Tigers) are removed?',
    options: [
      'Herbivore populations explode, causing severe overgrazing, loss of saplings, and downstream soil erosion.',
      'Herbivores voluntarily reduce their birth rates to maintain balance.',
      'Trees grow 500% faster because there are no tigers.',
      'The climate immediately becomes colder.',
    ],
    correctIndex: 0,
    verifyInstruction: 'In the trophic sandbox, set Apex Predator density to 0 and observe the herbivore surge and producer collapse.',
    nodeId: NODE_C9_EVS_007,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the trophic energy pyramid, what happens to the total available energy at each ascending step?',
    observableOptions: [
      'It increases because animals are stronger at the top.',
      'Only approximately 10% transfers upward; 90% is lost as metabolic heat and respiration.',
      'It stays 100% constant because energy cannot be destroyed.',
      'It doubles with each consumer level.',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_EVS_008,
  },
  {
    question: 'Observation: What pattern emerged when you paired Rhizobium bacteria with Legume root cells in the interaction lab?',
    observableOptions: [
      'Both organisms benefited (+/+), proving a mutualistic nitrogen-fixing symbiosis.',
      'The bacteria destroyed the plant roots (-/+).',
      'The plant consumed the bacteria with no reciprocal benefit (+/0).',
      'Neither organism was affected (0/0).',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_EVS_009,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Western Ghats Community Ecological Restoration Audit',
  description: 'Apply the ecocentric framework to audit an endangered biodiversity patch in your region (or the Nilgiris reserve).',
  steps: [
    'Identify 3 native producers (e.g., Teak, Sal, Ferns) and 2 key bioindicators (Lichens on bark, Mayflies in hill streams).',
    'Map one 4-level food chain (Producer -> Herbivore -> Carnivore -> Apex Predator) and calculate the 10% energy reduction at each step.',
    'Formulate a 3-point plan to replace an anthropocentric threat (e.g. monoculture eucalyptus plantation) with an ecocentric polyculture restoration plan.',
    'Present your species interaction and watershed preservation matrix to your school eco-club.',
  ],
};

export function C9_EVSEarthEnvironmentBioticSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Science', emoji: '🌿', color: 'emerald' };

  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant Exploration & Sandbox Variables
  const [selectedSphere, setSelectedSphere] = useState<string>('biosphere');
  const [solarIntensity, setSolarIntensity] = useState<number>(75);
  const [co2Level, setCo2Level] = useState<number>(420);
  const [producerBiomass, setProducerBiomass] = useState<number>(10000);
  const [predatorPresence, setPredatorPresence] = useState<boolean>(true);
  const [activeCycle, setActiveCycle] = useState<'carbon' | 'nitrogen' | 'water'>('carbon');
  const [selectedInteractionPair, setSelectedInteractionPair] = useState<string>('rhizobium_legume');
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);
  const [predictionVerified, setPredictionVerified] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);
  const [sandboxReady, setSandboxReady] = useState<boolean>(false);

  // Performance & SRS State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Escalating Hints & Validation
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Construct Interactive State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Visual Feedback Components State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Additional Interactive Sliders
  const [moistureLevel, setMoistureLevel] = useState<number>(60);
  const [herbivorePressure, setHerbivorePressure] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<'model' | 'analytics' | 'glossary'>('model');

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM LOCAL STORAGE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY UPDATE EFFECT ───
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

  // ─── 2D CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -Math.random() * 1.2 - 0.2,
      radius: Math.random() * 2.5 + 1.5,
      hue: Math.random() > 0.5 ? 142 : 217,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 142 ? 'rgba(52, 211, 153, 0.7)' : 'rgba(96, 165, 250, 0.7)';
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.hue === 142 ? '#10b981' : '#3b82f6';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── DERIVED BIOLOGICAL METRICS ───
  const photosynthesisRate = useMemo(() => {
    return Math.round((solarIntensity / 100) * (co2Level / 400) * (moistureLevel / 100) * 120);
  }, [solarIntensity, co2Level, moistureLevel]);

  const trophicLevelsCalc = useMemo(() => {
    const t1_producers = producerBiomass;
    const t2_herbivores = Math.round(t1_producers * 0.1);
    const t3_carnivores = Math.round(t2_herbivores * 0.1);
    const t4_apex = predatorPresence ? Math.round(t3_carnivores * 0.1) : 0;
    return { t1_producers, t2_herbivores, t3_carnivores, t4_apex };
  }, [producerBiomass, predatorPresence]);

  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Flawless understanding! You demonstrated complete comprehension of the 5 spheres, 10% trophic attenuation, and mutualistic biogeochemical cycles.';
    if (errors <= 3) return 'Great work! You have achieved solid scientific competency. Review the minor misconceptions below to lock in permanent retention.';
    if (errors <= 7) return 'Good effort! You are developing a strong grasp of biotic and abiotic interactions. Revisit the interactive labs to reinforce key concepts.';
    return 'Do not give up — You WILL get this! Practice makes perfect. Step through the guided labs again to master ecological cascades!';
  }, [errors]);

  // ─── HANDLERS ───
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
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete ecological explanation.');
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate hypothesis! That is the keystone trophic cascade in action.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive ecology laboratories. Manipulate the parameters to discover Earth systems.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with the ecological variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge stage commenced. Apply your knowledge to real-world ecological scenarios.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now interact with the simulation below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent scientific observation!' : 'Review the visualization values once more.');
  }, []);

  const handleSphereClick = useCallback((sphere: string) => {
    setSelectedSphere(sphere);
    audioManager.play('tap');
    const desc: Record<string, string> = {
      lithosphere: 'Lithosphere: Solid outer crust and upper mantle supplying minerals and soil.',
      hydrosphere: 'Hydrosphere: All liquid water on Earth covering 71% of planetary surface.',
      atmosphere: 'Atmosphere: 78% N2, 21% O2, 0.04% CO2 protecting and sustaining life.',
      cryosphere: 'Cryosphere: Glaciers, ice caps, and permafrost regulating climate albedo.',
      biosphere: 'Biosphere: The narrow zone where life thrives across all other spheres.',
    };
    speechManager.speak(desc[sphere] || sphere);
  }, []);

  const handleSolarChange = useCallback((val: number) => {
    setSolarIntensity(val);
    audioManager.play('count');
  }, []);

  const handleCo2Change = useCallback((val: number) => {
    setCo2Level(val);
    audioManager.play('count');
  }, []);

  const handleProducerChange = useCallback((val: number) => {
    setProducerBiomass(val);
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
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
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
    speechManager.speak('Ecological mastery achieved! Review your detailed performance and review timetable below.');
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

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match' || challenge.type === 'analysis') {
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
    } else if (challenge.type === 'application') {
      isCorrect = answer === challenge.correctIndex;
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
        localStorage.setItem(`mastery_${challenge.nodeId}`, 'proficient');
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
        speechManager.speak('Let us analyse the step-by-step resolution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide(s => s + 1);
      audioManager.play('whoosh');
    } else {
      handleAdvanceToSandbox();
    }
  }, [currentSlide, handleAdvanceToSandbox]);

  const handlePrevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
      audioManager.play('whoosh');
    }
  }, [currentSlide]);

  const handleReset = useCallback(() => {
    setSolarIntensity(75);
    setCo2Level(420);
    setProducerBiomass(10000);
    setMoistureLevel(60);
    setPredatorPresence(true);
    audioManager.play('pop');
  }, []);

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
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800"
      >
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.01 }}>
          <motion.span
            className="text-3xl p-2 bg-emerald-950/60 rounded-xl border border-emerald-800/80"
            role="img"
            aria-label="EVS"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xs font-semibold px-2 py-0.5 bg-emerald-900/50 text-emerald-400 rounded-full border border-emerald-700/50"
              >
                ICSE Class 9 EVS
              </motion.span>
              <span className="text-xs font-medium text-slate-400">Nodes 001 - 010</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </motion.div>

        {/* Phase Navigation Tracker */}
        <motion.div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.span
              key={p}
              whileHover={{ scale: 1.05 }}
              className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                  : 'text-slate-500'
              }`}
            >
              {p}
            </motion.span>
          ))}
        </motion.div>
      </motion.header>

      {/* ─── PHASE TRANSITIONS WITH ANIMATE PRESENCE ─── */}
      <AnimatePresence mode="wait">
        {/* ���── PHASE 1: DISCOVERY PHASE ─── */}
        {phase === 'discovery' && (
          <motion.section
            key="discovery-phase"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="space-y-6"
          >
            {/* Narrative Scenario Box */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/60 relative overflow-hidden"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2"
                >
                  <span>🌲</span> Narrative Field Scenario
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
                <p className="text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-emerald-300/90 font-medium"
                >
                  🎯 {SCENARIO.context}
                </motion.div>
              </div>
            </motion.div>

            {/* Interactive Curiosity Hook */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>💡</span> Initial Discovery Hypothesis
              </div>
              <h3 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Hypothesis option ${i + 1}: ${opt}`}
                    className={`text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/40 border border-slate-800 text-slate-500'
                        : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:border-emerald-600/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{discoveryCorrect ? '🎉' : '🔍'}</span>
                    <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {discoveryCorrect
                        ? 'Spot on! You understand top-down trophic cascades.'
                        : DISCOVERY_QUESTION.hintAfter}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/40 shrink-0"
                  >
                    Enter Ecology Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}

        {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.section
            key="explore-phase"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Exploration Step Card */}
            <motion.div
              whileHover={{ scale: 1.002 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-xs font-bold px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full"
                >
                  Interactive Discovery Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </motion.span>
                <span className="text-xs text-slate-400">Topic: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
              <p className="text-sm text-emerald-300 font-medium mb-6">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* Visual Workspace for Current Exploration Step */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800"
              >
                {/* Step 0: Five Spheres Visualizer */}
                {currentSlide === 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7">
                      <svg viewBox="0 0 500 400" className="w-full h-auto drop-shadow-xl" aria-label="Five Spheres Interactive Diagram">
                        <defs>
                          <linearGradient id="atmoGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
                          </linearGradient>
                          <linearGradient id="hydroGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#0284c7" />
                          </linearGradient>
                          <linearGradient id="lithoGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#78350f" />
                            <stop offset="100%" stopColor="#451a03" />
                          </linearGradient>
                          <linearGradient id="cryoGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#e0f2fe" />
                            <stop offset="100%" stopColor="#93c5fd" />
                          </linearGradient>
                        </defs>

                        {/* Atmosphere Envelope */}
                        <circle cx="250" cy="200" r="185" fill="url(#atmoGrad)" opacity="0.2" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" />

                        {/* Lithosphere Crust Base */}
                        <path d="M 80,240 Q 250,180 420,240 L 420,350 Q 250,380 80,350 Z" fill="url(#lithoGrad)" />

                        {/* Hydrosphere Ocean Basin */}
                        <path d="M 160,260 Q 280,270 410,250 Q 380,340 160,330 Z" fill="url(#hydroGrad)" opacity="0.85" />

                        {/* Cryosphere Himalayan Glaciers */}
                        <polygon points="90,240 140,150 190,240" fill="url(#cryoGrad)" stroke="#bae6fd" strokeWidth="2" />
                        <polygon points="170,240 210,170 250,240" fill="url(#cryoGrad)" stroke="#bae6fd" strokeWidth="2" />

                        {/* Biosphere Interactive Core Nodes */}
                        {[
                          { id: 'atmosphere', label: 'Atmosphere (Air)', cx: 250, cy: 60, col: '#38bdf8' },
                          { id: 'cryosphere', label: 'Cryosphere (Ice)', cx: 150, cy: 150, col: '#e0f2fe' },
                          { id: 'biosphere', label: 'Biosphere (Life)', cx: 250, cy: 210, col: '#10b981' },
                          { id: 'hydrosphere', label: 'Hydrosphere (Water)', cx: 330, cy: 280, col: '#06b6d4' },
                          { id: 'lithosphere', label: 'Lithosphere (Land)', cx: 130, cy: 300, col: '#b45309' },
                        ].map(s => (
                          <g
                            key={s.id}
                            onClick={() => handleSphereClick(s.id)}
                            className="cursor-pointer transition-transform hover:scale-110"
                          >
                            <circle
                              cx={s.cx}
                              cy={s.cy}
                              r={selectedSphere === s.id ? 32 : 25}
                              fill={s.col}
                              opacity={selectedSphere === s.id ? 1 : 0.75}
                              stroke={selectedSphere === s.id ? '#ffffff' : '#334155'}
                              strokeWidth={selectedSphere === s.id ? 3 : 1.5}
                            />
                            <text
                              x={s.cx}
                              y={s.cy + 4}
                              textAnchor="middle"
                              fill={s.id === 'cryosphere' ? '#0f172a' : '#ffffff'}
                              fontSize="9"
                              fontWeight="bold"
                            >
                              {s.label.split(' ')[0]}
                            </text>
                          </g>
                        ))}

                        {/* Dynamic Interconnecting Energy Arrows */}
                        <line x1="150" y1="180" x2="250" y2="210" stroke="#bae6fd" strokeWidth="2" strokeDasharray="4,3" />
                        <line x1="250" y1="90" x2="250" y2="180" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,3" />
                        <line x1="330" y1="255" x2="250" y2="210" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4,3" />
                        <line x1="155" y1="280" x2="250" y2="210" stroke="#b45309" strokeWidth="2" strokeDasharray="4,3" />
                      </svg>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                      <motion.div
                        key={selectedSphere}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-slate-900 rounded-xl border border-slate-800"
                      >
                        <h4 className="text-sm font-bold text-emerald-400 capitalize mb-1">
                          Selected: {selectedSphere}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {selectedSphere === 'lithosphere' && 'Rigid outer crust (5-50 km thick) and upper mantle. Supplies essential nutrient minerals (phosphorus, potassium) and soil matrices.'}
                          {selectedSphere === 'hydrosphere' && 'Covers ~71% of Earth’s surface. Drives hydrological cycles, thermal regulation, and provides aquatic habitats (Ganga, Bay of Bengal).'}
                          {selectedSphere === 'atmosphere' && 'Multi-layered envelope (troposphere to thermosphere). Supplies CO2 for photosynthesis and O2 for cellular respiration.'}
                          {selectedSphere === 'cryosphere' && 'All frozen ice reservoirs (Gangotri glacier). Regulates global climate albedo and sustains perennial Himalayan river flows.'}
                          {selectedSphere === 'biosphere' && 'The narrow living zone where organisms interact with all 4 abiotic spheres across forest, desert, and aquatic ecosystems.'}
                        </p>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-slate-400"
                      >
                        💡 <strong>Pairwise Interaction:</strong> Gangotri Glacier melt (Cryosphere) &rarr; Feeds River Ganga (Hydrosphere) &rarr; Irrigates Indo-Gangetic farmlands (Biosphere/Lithosphere).
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Step 1: Photosynthesis & Solar Slider */}
                {currentSlide === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <label className="text-xs font-semibold text-slate-400 flex justify-between">
                          <span>☀️ Solar Radiation</span>
                          <span className="text-amber-400 font-bold">{solarIntensity}%</span>
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={solarIntensity}
                          onChange={e => handleSolarChange(Number(e.target.value))}
                          className="w-full mt-2 accent-amber-500"
                          aria-label="Solar radiation intensity slider"
                        />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <label className="text-xs font-semibold text-slate-400 flex justify-between">
                          <span>💨 Atmospheric CO2</span>
                          <span className="text-blue-400 font-bold">{co2Level} ppm</span>
                        </label>
                        <input
                          type="range"
                          min={200}
                          max={800}
                          value={co2Level}
                          onChange={e => handleCo2Change(Number(e.target.value))}
                          className="w-full mt-2 accent-blue-500"
                          aria-label="Carbon dioxide concentration slider"
                        />
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <label className="text-xs font-semibold text-slate-400 flex justify-between">
                          <span>💧 Soil Moisture</span>
                          <span className="text-cyan-400 font-bold">{moistureLevel}%</span>
                        </label>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={moistureLevel}
                          onChange={e => setMoistureLevel(Number(e.target.value))}
                          className="w-full mt-2 accent-cyan-500"
                          aria-label="Soil moisture percentage slider"
                        />
                      </motion.div>
                    </div>

                    {/* Real-time Photosynthetic Factory Display */}
                    <div className="p-6 bg-slate-900/90 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center items-center">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-950 rounded-lg">
                        <div className="text-xs text-slate-400">Chemical Reactants</div>
                        <div className="text-sm font-bold text-emerald-400 mt-1">6 CO2 + 6 H2O</div>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-950 rounded-lg border border-emerald-900/50">
                        <div className="text-xs text-slate-400">Net Photosynthetic Rate</div>
                        <div className="text-2xl font-black text-white mt-1">{photosynthesisRate} <span className="text-xs font-normal text-slate-400">g/m²/day</span></div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                          <motion.div
                            className="bg-emerald-500 h-full rounded-full"
                            animate={{ width: `${Math.min(100, (photosynthesisRate / 150) * 100)}%` }}
                          />
                        </div>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-950 rounded-lg">
                        <div className="text-xs text-slate-400">Synthesised Products</div>
                        <div className="text-sm font-bold text-amber-300 mt-1">C6H12O6 (Glucose) + 6 O2</div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Step 2: Trophic Energy Pyramid */}
                {currentSlide === 2 && (
                  <div className="space-y-6">
                    {/* Predict Then Check Integration */}
                    {!predictionMade && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800"
                      >
                        <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">Predict Before Adjusting</h4>
                        <p className="text-sm text-white mb-3">{PREDICTION_QUESTIONS[1].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePrediction(i)}
                              className="text-left p-3 bg-slate-900 hover:bg-slate-850 rounded-lg text-xs text-slate-200 border border-slate-800"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {predictionMade && !predictionVerified && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-amber-950/40 rounded-xl border border-amber-800 text-xs text-amber-300"
                      >
                        ⚡ {PREDICTION_QUESTIONS[1].verifyInstruction}
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-5 space-y-4">
                        <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <label className="text-xs font-semibold text-slate-400 flex justify-between">
                            <span>🌱 Producer Biomass (Trophic Level 1)</span>
                            <span className="text-emerald-400 font-bold">{producerBiomass} kJ</span>
                          </label>
                          <input
                            type="range"
                            min={2000}
                            max={50000}
                            step={1000}
                            value={producerBiomass}
                            onChange={e => handleProducerChange(Number(e.target.value))}
                            className="w-full mt-2 accent-emerald-500"
                            aria-label="Producer biomass slider"
                          />
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800"
                        >
                          <span className="text-xs font-semibold text-slate-300">🐅 Bengal Tiger (Apex Keystone)</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setPredatorPresence(p => !p);
                              audioManager.play('pop');
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              predatorPresence ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                            }`}
                          >
                            {predatorPresence ? 'Present (Balanced)' : 'Extirpated (Removed)'}
                          </motion.button>
                        </motion.div>
                      </div>

                      {/* SVG Energy Pyramid Representation */}
                      <div className="lg:col-span-7">
                        <svg viewBox="0 0 400 240" className="w-full h-auto">
                          {/* Level 4: Apex Predator */}
                          <polygon
                            points="170,40 230,40 250,80 150,80"
                            fill={predatorPresence ? '#ef4444' : '#475569'}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                          <text x="200" y="65" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                            Apex: {trophicLevelsCalc.t4_apex} kJ (0.1%)
                          </text>

                          {/* Level 3: Secondary Consumers */}
                          <polygon points="150,85 250,85 280,130 120,130" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                          <text x="200" y="112" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                            Carnivores: {trophicLevelsCalc.t3_carnivores} kJ (1%)
                          </text>

                          {/* Level 2: Primary Consumers */}
                          <polygon points="120,135 280,135 320,180 80,180" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                          <text x="200" y="162" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                            Herbivores: {trophicLevelsCalc.t2_herbivores} kJ (10%)
                          </text>

                          {/* Level 1: Producers */}
                          <polygon points="80,185 320,185 360,230 40,230" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                          <text x="200" y="212" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                            Producers: {trophicLevelsCalc.t1_producers} kJ (100%)
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Biogeochemical Cycles Engine */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    <div className="flex gap-2 border-b border-slate-800 pb-3">
                      {(['carbon', 'nitrogen', 'water'] as const).map(c => (
                        <motion.button
                          key={c}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveCycle(c);
                            audioManager.play('tap');
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                            activeCycle === c ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {c} Cycle Engine
                        </motion.button>
                      ))}
                    </div>

                    <motion.div
                      key={activeCycle}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-900 rounded-xl border border-slate-800"
                    >
                      {activeCycle === 'carbon' && (
                        <div className="space-y-3 text-xs text-slate-300">
                          <div className="font-bold text-sm text-emerald-400">Carbon Cycle Pathway</div>
                          <p>1. <strong>Photosynthesis:</strong> Green plants & marine phytoplankton fix atmospheric CO2 into glucose.</p>
                          <p>2. <strong>Respiration & Decomposition:</strong> Plants, animals, and soil bacteria return CO2 to air.</p>
                          <p>3. <strong>Major Sink:</strong> The Global Ocean absorbs ~25% of all anthropogenic emissions as bicarbonate.</p>
                          <p>4. <strong>Combustion:</strong> Burning fossil fuels injects ancient geological carbon, overburdening natural sinks.</p>
                        </div>
                      )}
                      {activeCycle === 'nitrogen' && (
                        <div className="space-y-3 text-xs text-slate-300">
                          <div className="font-bold text-sm text-blue-400">5 Stages of the Nitrogen Cycle</div>
                          <p>1. <strong>Nitrogen Fixation:</strong> <em>Rhizobium</em> (legume nodules) converts inert N2 into ammonia (NH3).</p>
                          <p>2. <strong>Nitrification:</strong> <em>Nitrosomonas</em> & <em>Nitrobacter</em> oxidize ammonia to nitrites & nitrates.</p>
                          <p>3. <strong>Assimilation:</strong> Plant roots absorb nitrates to synthesize essential proteins and DNA.</p>
                          <p>4. <strong>Ammonification:</strong> Decomposers return organic nitrogen from dead matter to ammonia.</p>
                          <p>5. <strong>Denitrification:</strong> <em>Pseudomonas</em> reduces nitrates back into N2 gas, closing the loop.</p>
                        </div>
                      )}
                      {activeCycle === 'water' && (
                        <div className="space-y-3 text-xs text-slate-300">
                          <div className="font-bold text-sm text-cyan-400">Hydrological (Water) Cycle Mechanics</div>
                          <p>1. <strong>Evaporation & Transpiration:</strong> Solar heat lifts water vapour from oceans & Western Ghats canopy.</p>
                          <p>2. <strong>Condensation & Precipitation:</strong> Clouds condense into monsoon rain across the subcontinent.</p>
                          <p>3. <strong>Infiltration & Percolation:</strong> Water penetrates soil to recharge deep aquifers.</p>
                          <p>4. <strong>Human Disruption:</strong> Over-pumping tube wells in Punjab lowers water tables by &gt; 1m/decade.</p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                )}

                {/* Step 4: Species Interaction Matrix */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'rhizobium_legume', label: 'Rhizobium + Legume', type: 'Mutualism (+/+)' },
                        { id: 'tiger_deer', label: 'Tiger + Chital Deer', type: 'Predation (+/-)' },
                        { id: 'cuscuta_hedge', label: 'Cuscuta + Hedge Shrub', type: 'Parasitism (+/-)' },
                        { id: 'orchid_tree', label: 'Orchid + Mango Tree', type: 'Commensalism (+/0)' },
                        { id: 'penicillium_bacteria', label: 'Penicillium + Bacteria', type: 'Amensalism (0/-)' },
                        { id: 'wheat_weeds', label: 'Wheat + Weed Species', type: 'Competition (-/-)' },
                      ].map(pair => (
                        <motion.button
                          key={pair.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setSelectedInteractionPair(pair.id);
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            selectedInteractionPair === pair.id
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{pair.label}</div>
                          <div className="text-[11px] text-emerald-400 mt-1">{pair.type}</div>
                        </motion.button>
                      ))}
                    </div>

                    <motion.div
                      key={selectedInteractionPair}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300"
                    >
                      {selectedInteractionPair === 'rhizobium_legume' && (
                        <p><strong>Mutualism (+/+):</strong> Legume provides photosynthetic carbohydrates; Rhizobium fixes atmospheric N2 into absorbable nitrates.</p>
                      )}
                      {selectedInteractionPair === 'tiger_deer' && (
                        <p><strong>Predation (+/-):</strong> Tiger benefits from energy; deer is killed. Keeps herbivore population from degrading the forest canopy.</p>
                      )}
                      {selectedInteractionPair === 'cuscuta_hedge' && (
                        <p><strong>Parasitism (+/-):</strong> Cuscuta taps host vascular haustoria for sap without killing the shrub immediately.</p>
                      )}
                      {selectedInteractionPair === 'orchid_tree' && (
                        <p><strong>Commensalism (+/0):</strong> Epiphytic orchid perches high for sunlight; mango tree experiences zero nutrient loss.</p>
                      )}
                      {selectedInteractionPair === 'penicillium_bacteria' && (
                        <p><strong>Amensalism (0/-):</strong> Penicillin antibiotic kills neighbouring bacterial colonies without the fungus deriving direct nutrition.</p>
                      )}
                      {selectedInteractionPair === 'wheat_weeds' && (
                        <p><strong>Competition (-/-):</strong> Both species suffer reduced access to limited sunlight, soil nitrogen, and water.</p>
                      )}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>
              <motion.span whileHover={{ scale: 1.05 }} className="text-xs font-bold text-slate-500">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </motion.span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Sandbox Free Play →'}
              </motion.button>
            </div>
          </motion.section>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox-phase"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.002 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <div className="flex items-center justify-between mb-2">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-xs font-bold px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full"
                >
                  Sandbox Mode (Ungraded Exploration)
                </motion.span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Reset Default Values
                </motion.button>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Ecological Biosphere Simulator</h2>
              <p className="text-xs text-slate-400 mb-6">
                Adjust variables freely across solar radiation, CO2, and biomass to observe live system equilibriums.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-400 flex justify-between">
                    <span>☀️ Solar Energy</span>
                    <span className="text-amber-400 font-bold">{solarIntensity}%</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={solarIntensity}
                    onChange={e => handleSolarChange(Number(e.target.value))}
                    className="w-full mt-2 accent-amber-500"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-400 flex justify-between">
                    <span>💨 CO2 Level</span>
                    <span className="text-blue-400 font-bold">{co2Level} ppm</span>
                  </label>
                  <input
                    type="range"
                    min={200}
                    max={800}
                    value={co2Level}
                    onChange={e => handleCo2Change(Number(e.target.value))}
                    className="w-full mt-2 accent-blue-500"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-400 flex justify-between">
                    <span>🌿 Primary Biomass</span>
                    <span className="text-emerald-400 font-bold">{producerBiomass} kJ</span>
                  </label>
                  <input
                    type="range"
                    min={2000}
                    max={40000}
                    step={1000}
                    value={producerBiomass}
                    onChange={e => handleProducerChange(Number(e.target.value))}
                    className="w-full mt-2 accent-emerald-500"
                  />
                </motion.div>
              </div>

              {/* Canvas Particle Visualizer */}
              <motion.div
                whileHover={{ scale: 1.005 }}
                className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950"
              >
                <canvas ref={canvasRef} width={600} height={120} className="w-full h-28" />
                <div className="absolute inset-0 flex items-center justify-around pointer-events-none text-xs font-bold px-4">
                  <span className="bg-slate-900/80 px-3 py-1 rounded-lg text-emerald-300 border border-emerald-800">
                    Photosynthesis: {photosynthesisRate} g/m²/d
                  </span>
                  <span className="bg-slate-900/80 px-3 py-1 rounded-lg text-blue-300 border border-blue-800">
                    Herbivore Yield: {trophicLevelsCalc.t2_herbivores} kJ
                  </span>
                  <span className="bg-slate-900/80 px-3 py-1 rounded-lg text-amber-300 border border-amber-800">
                    Apex Biomass: {trophicLevelsCalc.t4_apex} kJ
                  </span>
                </div>
              </motion.div>

              {/* Observation Check Question */}
              {!observationAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800"
                >
                  <p className="text-sm font-semibold text-white mb-3">
                    🔍 {OBSERVATION_QUESTIONS[0].question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleObservation(i)}
                        className="text-left p-3 bg-slate-900 hover:bg-slate-850 rounded-lg text-xs text-slate-200 border border-slate-800"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-base shadow-xl shadow-emerald-900/50"
              >
                Start Competency Challenges →
              </motion.button>
            </div>
          </motion.section>
        )}

        {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
        {phase === 'challenge' && (
          <motion.section
            key="challenge-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Challenge Header & Adaptive Badge */}
            <motion.div
              whileHover={{ scale: 1.002 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs font-semibold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-lg font-bold text-white">
                    Competency: <span className="capitalize text-emerald-400">{challenge.competencyLevel}</span>
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : difficulty === 'standard'
                      ? 'bg-blue-950 text-blue-400 border-blue-800'
                      : 'bg-rose-950 text-rose-400 border-rose-800'
                  }`}
                >
                  {difficulty} Tier
                </motion.span>
              </div>
            </motion.div>

            {/* Animated Progress Bar */}
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Challenge Container */}
            <motion.div
              className={`p-6 bg-slate-900 rounded-2xl border ${wrongFlash ? 'bg-rose-950/40 border-2 border-rose-500' : 'border-slate-800'}`}
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
                {challenge.question}
              </h3>

              {/* 1. Multiple Choice / Classify / Distinguish / Match / Analysis / Application */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match' || challenge.type === 'analysis' || challenge.type === 'application') && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:border-emerald-500/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. Drag-Label Diagram Challenge */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <motion.div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 self-center mr-2">Draggable Items:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'target_cryo', title: 'Cryosphere Target' },
                      { id: 'target_litho', title: 'Lithosphere Target' },
                      { id: 'target_atmo', title: 'Atmosphere Target' },
                      { id: 'target_hydro', title: 'Hydrosphere Target' },
                    ].map(target => (
                      <motion.div
                        key={target.id}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col items-center justify-center ${
                          droppedLabels[target.id]
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold text-xs'
                            : 'bg-slate-950/80 border-slate-700 text-slate-400 text-xs'
                        }`}
                      >
                        <div className="text-[11px] text-slate-500 mb-1">{target.title}</div>
                        <div>{droppedLabels[target.id] || 'Drop Label Here'}</div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="mt-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-lg"
                  >
                    Verify Target Placements
                  </motion.button>
                </div>
              )}

              {/* 3. Drag-Sort Challenge */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
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
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 cursor-grab flex items-center justify-between"
                      >
                        <span>{displayIdx + 1}. {item}</span>
                        <span className="text-slate-500 text-[10px]">☰ Drag to Reorder</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const ans =
                        sortArrangement.length > 0
                          ? sortArrangement
                          : challenge.sortItems!.map((_, i) => i);
                      handleAnswer(ans);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-lg"
                  >
                    Check Sequence Order
                  </motion.button>
                </div>
              )}

              {/* 4. Numeric Calculation Challenge */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter calculated energy"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 w-48"
                    />
                    <span className="text-slate-400 text-sm font-semibold">{challenge.unit}</span>
                    <motion.button
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-lg"
                    >
                      Submit Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. Construct Chemical Equation Challenge */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <motion.div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 self-center mr-2">Available Terms:</span>
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center"
                  >
                    {constructParts.map((part, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-indigo-950 text-indigo-200 border border-indigo-700 rounded-lg text-xs font-bold flex items-center gap-2"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 font-bold"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500 italic">Click the terms above to assemble the equation...</span>
                    )}
                  </motion.div>

                  <div className="flex gap-2">
                    <motion.button
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(constructParts.join(' '))}
                      disabled={showExplanation || constructParts.length === 0}
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-lg"
                    >
                      Validate Equation
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts([])}
                      className="px-4 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-semibold"
                    >
                      Clear
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Progressive Step-by-Step Explanation Banner */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-emerald-950/40 border border-emerald-800/80 rounded-2xl space-y-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider"
                  >
                    <span>📘</span> Step-by-Step Pedagogical Explanation
                  </motion.div>

                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-slate-200 leading-relaxed"
                        >
                          <strong className="text-emerald-400">{i + 1}.</strong> {sentence}
                          {!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-emerald-800/60 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                      >
                        Show Next Explanatory Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}

        {/* ─── PHASE 5: COMPLETION & SYNTHESIS ─── */}
        {phase === 'complete' && (
          <motion.section
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                className="inline-block p-4 bg-emerald-950/80 rounded-2xl border border-emerald-800 mb-4 shadow-xl"
              >
                <span className="text-4xl">🏆</span>
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Ecological Mastery Verified!
              </h2>
              <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
                You have successfully completed the ICSE Class 9 Earth & Biotic Environment interactive simulation.
              </p>

              {/* SPACED REPETITION SYSTEM (SRS) SCHEDULE BANNER */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-slate-900 rounded-2xl border border-indigo-700/60 max-w-2xl mx-auto mb-6 text-left shadow-lg"
              >
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <span>📅</span> Spaced Repetition (SRS) Review Plan
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-black text-white">
                      {errors === 0
                        ? 'Next Review: In 7 Days'
                        : errors <= 3
                        ? 'Next Review: In 3 Days'
                        : 'Next Review: In 1 Day'}
                    </div>
                    <p className="text-xs text-indigo-200/80 mt-0.5">
                      {errors === 0
                        ? 'Zero errors logged — retention interval set to 7 days for maximum memory consolidation.'
                        : errors <= 3
                        ? 'Moderate retention — revisit in 3 days to reinforce biotic & abiotic interaction pathways.'
                        : 'Immediate reinforcement needed — schedule review in 1 day to lock in core ecological laws.'}
                    </p>
                  </div>
                  <span className="px-3 py-1.5 bg-indigo-900/80 text-indigo-300 rounded-xl text-xs font-bold border border-indigo-700/50 shrink-0">
                    {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6">
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-500">Final Score</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">
                    {Math.max(0, 100 - errors * 5)}%
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-500">Mastery Level</div>
                  <div className="text-xl font-black text-blue-400 mt-1 capitalize">{masteryLevel}</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-500">Nodes Covered</div>
                  <div className="text-xl font-black text-amber-400 mt-1">10 Nodes</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-500">SRS Interval</div>
                  <div className="text-xl font-black text-purple-400 mt-1">
                    {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                  </div>
                </motion.div>
              </div>

              {/* Personalised Motivational Feedback */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/80 max-w-2xl mx-auto text-left"
              >
                <p className="text-xs sm:text-sm text-emerald-300 font-medium leading-relaxed">
                  {motivationalMessage}
                </p>
              </motion.div>
            </motion.div>

            {/* Misconception Review (if any hit) */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-slate-900 rounded-2xl border border-rose-900/60"
              >
                <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-3">
                  ⚠️ Misconceptions Profile To Reinforce
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((mIdx, i) => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-950 rounded-xl border border-slate-800"
                      >
                        <p className="text-xs font-bold text-rose-300">❌ Misconception: {m.misconception}</p>
                        <p className="text-xs text-emerald-400 mt-1">✓ Correction: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Real World Field Activity */}
            <motion.div
              whileHover={{ scale: 1.002 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <h3 className="text-base font-bold text-emerald-400 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 mb-4">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300"
                  >
                    <span className="font-bold text-emerald-400 mr-1.5">{idx + 1}.</span> {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Topic Completed Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C9_EVSEarthEnvironmentBioticSim;
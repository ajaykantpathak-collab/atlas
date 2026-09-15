'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_EVS_001 = 'c11_evs_001';
const NODE_C11_EVS_002 = 'c11_evs_002';
const NODE_C11_EVS_003 = 'c11_evs_003';
const NODE_C11_EVS_004 = 'c11_evs_004';
const NODE_C11_EVS_005 = 'c11_evs_005';
const NODE_C11_EVS_006 = 'c11_evs_006';
const NODE_C11_EVS_007 = 'c11_evs_007';
const NODE_C11_EVS_008 = 'c11_evs_008';
const NODE_C11_EVS_009 = 'c11_evs_009';
const NODE_C11_EVS_010 = 'c11_evs_010';

const ALL_NODE_IDS = [
  NODE_C11_EVS_001,
  NODE_C11_EVS_002,
  NODE_C11_EVS_003,
  NODE_C11_EVS_004,
  NODE_C11_EVS_005,
  NODE_C11_EVS_006,
  NODE_C11_EVS_007,
  NODE_C11_EVS_008,
  NODE_C11_EVS_009,
  NODE_C11_EVS_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Niyamgiri & Eco-Catchment Crisis',
  intro: 'A pristine biosphere corridor in Eastern Ghats is facing multi-layered stress: industrial bauxite mining, agricultural expansion, transhumant pastoral grazing, and ancestral tribal reverence collide over water, forests, and biodiversity.',
  context: 'As an Environmental Impact Assessment (EIA) Lead Scientist, you must dissect how human modes of existence, ecosystem thermodynamics, trophic biomagnification, and inter-species relationships govern ecological stability and resource governance.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In an aquatic food web poisoned by DDT, which organism will inevitably register the HIGHEST concentration of the toxin?',
  options: [
    'Phytoplankton (primary producers absorbing water directly)',
    'Herbivorous zooplankton feeding on algal blooms',
    'Small forage fish swimming in the water column',
    'Apex fish-eating raptors (e.g., Osprey / Pelican)',
  ],
  correctIndex: 3,
  hintAfter: 'Think about trophic concentration — biomagnification amplifies fat-soluble toxins at each ascending level of the food pyramid!',
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

// ─── 24 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_EVS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Indian environmental governance, which statutory procedure predicts ecological, social, and economic consequences before major projects (dams, mines, highways) receive clearance?',
    options: [
      'Environmental Impact Assessment (EIA)',
      'Joint Forest Management (JFM)',
      'Corporate Social Responsibility (CSR)',
      'Public Interest Litigation (PIL)',
    ],
    correctIndex: 0,
    explanation: 'Environmental Impact Assessment (EIA), codified under the Environment Protection Act Notification, is mandatory in India to foresee ecological, hydrological, and social consequences before project execution.',
    hints: [
      'Recall the tool used before clearing dams like Tehri or Sardar Sarovar.',
      'It involves baseline studies, prediction, mitigation planning, and public consultation.',
      'The abbreviation is EIA.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_EVS_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The Sentinelese of North Sentinel Island are classified as a Particularly Vulnerable Tribal Group (PVTG). What are their two core defining subsistence features?',
    options: [
      'Sedentary wheat agriculture and bronze metallurgy',
      'Dependence on wild resources and high mobility with no external trade',
      'Pastoral cattle transhumance and commercial dairy trade',
      'Shifting slash-and-burn cultivation with regional timber export',
    ],
    correctIndex: 1,
    explanation: 'The Sentinelese sustain themselves strictly through hunting, gathering wild tubers, and fishing within their island ecosystem, completely isolated with zero external trade.',
    hints: [
      'They do not cultivate crops or keep domesticated herds.',
      'They rely entirely on wild flora and fauna within island boundaries.',
      'Their mode of existence is classic hunting-gathering with absolute self-reliance.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_EVS_003,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A hunter-gatherer relies on metabolic energy (~2,000 kcal/day). An urban industrial consumer requires equivalent energy throughput of 100,000 kcal/day (power, transport, embodied goods). What is the ratio increase (X-fold)?',
    correctAnswer: 50,
    tolerance: 1,
    unit: 'fold increase',
    explanation: '100,000 kcal divided by 2,000 kcal = 50. Industrial lifestyles demand a 50-fold per capita energy throughput compared to ancestral metabolic baselines.',
    hints: [
      'Divide the industrial energy consumption by the hunter-gatherer metabolic value.',
      '100000 / 2000 = ?',
      'The answer is exactly 50.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_EVS_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which industrial-chemical innovation now fixes more atmospheric nitrogen (N2) into reactive ammonia than all natural terrestrial biological fixation combined?',
    options: [
      'Bessemer converter process',
      'Haber-Bosch process',
      'Solvay sodium process',
      'Fischer-Tropsch synthesis',
    ],
    correctIndex: 1,
    explanation: 'The Haber-Bosch process (invented 1909) synthesises ammonia from atmospheric nitrogen and fossil hydrogen, fixing over 150 million tonnes of reactive N annually and dominating the global nitrogen cycle.',
    hints: [
      'It combines atmospheric N2 and H2 under high pressure with an iron catalyst.',
      'It enables modern synthetic chemical fertiliser production.',
      'It is named after Fritz Haber and Carl Bosch.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_EVS_005,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Arrange the typical human group sizes from smallest to largest across the evolutionary modes of existence.',
    sortItems: [
      'Hunting-Gathering Band (20–50 individuals)',
      'Pastoral Lineage / Clan (100–500 individuals)',
      'Agricultural Village / Chiefdom (Hundreds to Thousands)',
      'Industrial Metropolis / Megacity (Millions)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Group size escalates as food storability and agricultural/industrial surplus increase: 20-50 (band) -> 100-500 (tribe/clan) -> thousands (settled agrarian village) -> millions (industrial megacities).',
    hints: [
      'Start with nomadic foragers who must prevent local resource depletion.',
      'Pastoralists herd livestock in medium clans.',
      'Industrial cities like Mumbai or Delhi represent the largest agglomerations.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_EVS_006,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does the Jarawa tribal worldview (animistic kinship) contrast with industrial extractivism?',
    options: [
      'Jarawa treat nature as sacred kin/mother with self-imposed taboos; industry treats nature as commodified raw material',
      'Jarawa maximize timber yields through clearfelling; industry prioritises sacred grove conservation',
      'Jarawa operate commercial monoculture plantations; industry practices subsistence hunting',
      'Both worldviews share identical financial profit-maximisation objectives',
    ],
    correctIndex: 0,
    explanation: 'The Jarawa view the forest as a nourishing mother, enforcing taboos against hunting pregnant animals or over-harvesting, contrasting with industrial paradigms that view ecosystems as commodified stocks for profit.',
    hints: [
      'Consider the difference between reverence/restraint and commodity extraction.',
      'Animism sees life and spirit in natural elements.',
      'Industrialism focuses on mass extraction and capital accumulation.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_EVS_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the landmark 2013 Supreme Court ruling on the Niyamgiri hills bauxite mining dispute, which local institution was given binding statutory power to reject the mine?',
    options: [
      'The State Mining Corporation Board',
      'The Gram Sabhas of the Dongria Kondh indigenous villages',
      'The National Highway Authority of India',
      'The Central Pollution Control Board executive committee',
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court upheld the constitutional authority of the Dongria Kondh Gram Sabhas under the Forest Rights Act (Panchayats Extension to Scheduled Areas), who unanimously voted against bauxite mining on their sacred Niyam Raja hill.',
    hints: [
      'It represents village-level direct grassroots democracy.',
      'Governed under the Forest Rights Act (FRA 2006) and PESA.',
      'The Gram Sabha assembly of villagers.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_EVS_008,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each ecological component to its functional classification in a lake ecosystem.',
    dragItems: [
      { label: 'Phytoplankton (Algae)', targetId: 'slot_producer' },
      { label: 'Zooplankton & Small Fish', targetId: 'slot_consumer' },
      { label: 'Benthic Fungi & Bacteria', targetId: 'slot_decomposer' },
      { label: 'Dissolved O2 & Sunlight', targetId: 'slot_abiotic' },
    ],
    correctMapping: {
      slot_producer: 'Phytoplankton (Algae)',
      slot_consumer: 'Zooplankton & Small Fish',
      slot_decomposer: 'Benthic Fungi & Bacteria',
      slot_abiotic: 'Dissolved O2 & Sunlight',
    },
    explanation: 'Ecosystems require autotrophic producers (phytoplankton), heterotrophic consumers (zooplankton/fish), saprotrophic decomposers (bacteria/fungi), and abiotic environmental matrices (O2, photons, nutrients).',
    hints: [
      'Producers fix solar energy into sugars.',
      'Consumers eat other organisms.',
      'Decomposers recycle dead biomass back to minerals.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_EVS_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In an estuarine food chain, DDT concentration starts at 0.04 ppm in phytoplankton and reaches 25.0 ppm in apex fish-eating ospreys. By what factor (magnification ratio) has the toxin concentrated?',
    correctAnswer: 625,
    tolerance: 5,
    unit: 'x magnification',
    explanation: '25.0 ppm / 0.04 ppm = 625. Biomagnification concentrates persistent organochlorines over 600-fold up trophic pyramids, leading to eggshell thinning in top predators.',
    hints: [
      'Divide the apex predator concentration (25.0) by the producer concentration (0.04).',
      '25 / 0.04 = 2500 / 4',
      'The answer is 625.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_EVS_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Rhizobium bacteria fixing nitrogen inside leguminous root nodules while receiving plant carbohydrates is an example of which biological interaction?',
    options: [
      'Amensalism (- / 0)',
      'Mutualism (+ / +)',
      'Parasitism (+ / -)',
      'Commensalism (+ / 0)',
    ],
    correctIndex: 1,
    explanation: 'Mutualism is an obligate or facultative interaction where both species derive net physiological or ecological fitness benefits (+/+).',
    hints: [
      'Both the plant and the bacterium gain crucial resources.',
      'The plant gets bio-available nitrogen; the bacteria get sugar and anaerobic shelter.',
      'Positive-positive interaction.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_EVS_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the geographic resource catchment scale between a Rajasthani Raika pastoralist and an industrial consumer using a modern smartphone.',
    options: [
      'Pastoralist: ~50 km seasonal transhumance corridor; Industrial: Global catchment spanning Africa (cobalt), Asia (silicon), and worldwide logistics',
      'Pastoralist: Worldwide international shipping; Industrial: 5 km radius foraging',
      'Both operate strictly within identical 10 km watershed boundaries',
      'Pastoralist uses fossil fuels; Industrial relies exclusively on metabolic human labour',
    ],
    correctIndex: 0,
    explanation: 'Pastoral catchments span regional corridors (~50 km) along seasonal grazing routes, whereas industrial supply chains are planetary (e.g. DRC cobalt, Chilean lithium, Taiwanese semiconductors).',
    hints: [
      'Think about where the materials in a phone originate.',
      'Pastoralists migrate between foothills and plains with the monsoon.',
      'Industrial economies decouple local consumption from local land boundaries.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_EVS_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 4-lane national expressway is constructed through the Satpura-Maikal tiger corridor in Central India. What is the primary ecological hazard generated?',
    options: [
      'Increased soil fertility and seed germination rates',
      'Severe habitat fragmentation, genetic isolation of tiger metapopulations, and roadkill mortality',
      'Rapid conversion of deciduous forest into pristine marine coral biomes',
      'Elimination of atmospheric nitrogen fixation',
    ],
    correctIndex: 1,
    explanation: 'Linear infrastructure fragments contiguous habitats, severing dispersal corridors, preventing gene flow among feline metapopulations, and amplifying edge effects and roadkill.',
    hints: [
      'Consider what happens when a highway splits a forest in half.',
      'Wide-ranging carnivores cannot cross safely to breed.',
      'Habitat fragmentation and loss of wildlife connectivity.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_EVS_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'At Plachimada (Kerala), deep industrial borewells operated by a beverage plant dried up surrounding open agricultural wells. What structural dynamic caused this conflict?',
    options: [
      'Differential of scale: industrial extraction throughput overwhelmed the local unconfined aquifer renewal rate',
      'Agricultural farmers intentionally pumped water into industrial cooling towers',
      'Pastoral transhumance overgrazed the aquatic water lilies',
      'Atmospheric ozone depletion evaporated surface ponds overnight',
    ],
    correctIndex: 0,
    explanation: 'Industrial plants draw groundwater at volumetric rates thousands of times greater than shallow dug wells, creating cone-of-depression drawdown that strips adjacent agrarian livelihoods of water security.',
    hints: [
      'Compare high-capacity deep industrial submersible pumps with shallow village wells.',
      'Throughput scale difference depletes shared common pool aquifers.',
      'Differential of extraction scale and political-economic power.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_EVS_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is an enclosed glass aquarium classified as an ARTIFICIAL ecosystem, whereas a natural wetland lake like Loktak is a NATURAL ecosystem?',
    options: [
      'Aquariums contain no living biotic components',
      'An aquarium is not thermodynamically self-sustaining; it collapses without continuous human feeding, aeration, and filtration',
      'Natural lakes do not require sunlight for photosynthesis',
      'Aquariums have higher biodiversity than tropical wetlands',
    ],
    correctIndex: 1,
    explanation: 'Natural ecosystems possess self-regulating biogeochemical cycles and energy flows. Artificial ecosystems (aquariums, croplands) require external human subsidies (food, energy, waste removal) to prevent entropy collapse.',
    hints: [
      'What happens if you turn off the power and stop feeding fish in a tank for 2 weeks?',
      'Natural ecosystems sustain themselves through complete internal nutrient recycling.',
      'Self-sustainability is the defining criterion.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_EVS_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Which historical environmental tragedy in 1950s Japan proved that industrial methylmercury discharges biomagnify through marine food chains into top human fish consumers?',
    options: [
      'Bhopal Gas Tragedy',
      'Minamata Disease disaster',
      'Chernobyl Nuclear fallout',
      'Love Canal chemical leak',
    ],
    correctIndex: 1,
    explanation: 'Minamata disease occurred when Chisso Corporation dumped methylmercury into Minamata Bay; it bioaccumulated in shellfish and fish, biomagnified, and caused severe neurological damage (ataxia, numbness, congenital palsy) in humans.',
    hints: [
      'It occurred in a Japanese coastal fishing bay.',
      'Caused by organic methylmercury bioaccumulation in seafood.',
      'Minamata Bay.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_EVS_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do ectoparasites and endoparasites differ in anatomical habitat and evolutionary specialisation? Select the accurate pairing.',
    options: [
      'Ectoparasites: Live on external host surfaces (e.g. ticks, lice); Endoparasites: Inhabit internal tissues/gut (e.g. Taenia tapeworm, Plasmodium)',
      'Ectoparasites: Synthesize nitrogen (+/+); Endoparasites: Hunt live prey with venom',
      'Ectoparasites: Always lethal within 24 hours; Endoparasites: Never absorb host nutrition',
      'Both types inhabit strictly abiotic rock crevices',
    ],
    correctIndex: 0,
    explanation: 'Ectoparasites (ticks, lice, leeches) attach to the outer tegument/skin, while endoparasites (tapeworms, Plasmodium, Ascaris) reside inside organs, blood, or cells, adapting to survive host digestive enzymes and immune systems.',
    hints: [
      '"Ecto" means external/outer; "Endo" means internal/inner.',
      'Think of head lice vs intestinal tapeworms.',
      'Surface dwellers vs internal tissue parasites.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_EVS_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does contemporary India represent an ecological MOSAIC rather than a uniform evolutionary ladder of human existence?',
    options: [
      'Because all 4 modes (Sentinelese foragers, Maldhari pastoralists, Punjab farmers, and Jamshedpur industrial workers) coexist simultaneously within the same sovereign borders',
      'Because all tribal populations in India have converted to heavy industrial manufacturing',
      'Because agriculture was completely outlawed under the Environment Protection Act 1986',
      'Because hunting-gathering is the only legal economic activity in metropolitan Delhi',
    ],
    correctIndex: 0,
    explanation: 'India exemplifies a complex coexisting mosaic: hunting-gatherers (Sentinelese, Jarawa), transhumant pastoralists (Gujjars, Maldharis), intensive agriculturalists (Punjab), and industrial urbanites (Jamshedpur/Mumbai) all operate concurrently under shared constitutional governance.',
    hints: [
      'Look at the vast spectrum of living cultures across India today.',
      'Is one mode completely replacing all others, or do they share the territory?',
      'Coexistence of all four modes in different geographic and social spaces.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_EVS_007,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the full statutory name of India\'s landmark 2006 legislation that legally recognises the ancestral land and biodiversity access rights of forest communities.',
    availableParts: [
      'Scheduled Tribes and Other Traditional Forest Dwellers',
      '(Recognition of Forest Rights) Act, 2006',
      'National Green Tribunal Act',
      'Wildlife Protection Amendment',
    ],
    targetState: 'Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006',
    validationHint: 'Combine the tribal community clause with the formal Recognition of Forest Rights title.',
    explanation: 'The Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006 (FRA) is the crucial legal instrument empowering Gram Sabhas with title rights and biodiversity conservation stewardship.',
    hints: [
      'Click the two parts that form the official FRA 2006 title in sequence.',
      'First: "Scheduled Tribes and Other Traditional Forest Dwellers..."',
      'Second: "...(Recognition of Forest Rights) Act, 2006".',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_EVS_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In ecosystem energetics, what fundamental distinction separates a Grazing Food Chain (GFC) from a Detritus Food Chain (DFC)?',
    options: [
      'GFC begins with living autotrophic plants fixing solar photons; DFC begins with non-living dead organic matter decomposed by microbes',
      'GFC contains no animal consumers; DFC contains no decomposers',
      'GFC operates only in dark ocean trenches; DFC occurs exclusively in high-altitude deserts',
      'GFC creates inorganic minerals; DFC destroys solar radiation',
    ],
    correctIndex: 0,
    explanation: 'Grazing food chains directly convert solar energy via living producers (grass -> deer -> tiger). Detritus food chains unlock energy stored in dead organic matter via saprotrophs (dead leaves -> fungi/bacteria -> earthworm -> bird).',
    hints: [
      'What is the starting energy substrate for each chain?',
      'Living photosynthetic plant vs dead litter/corpses.',
      'Solar-driven vs decomposition-driven.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_EVS_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The fungus Penicillium secretes penicillin that inhibits and destroys surrounding bacterial colonies while the fungus itself remains unaffected. This interaction represents:',
    options: [
      'Amensalism (- / 0)',
      'Commensalism (+ / 0)',
      'Predation (+ / -)',
      'Mutualism (+ / +)',
    ],
    correctIndex: 0,
    explanation: 'Amensalism is an asymmetric interaction where one species is inhibited or destroyed while the other experiences zero biological effect or energetic benefit (- / 0). Antibiosis by Penicillium is the classic textbook case.',
    hints: [
      'One organism is harmed (-); the other is neutral/unaffected (0).',
      'Penicillium does not feed on the dead bacteria for food, it just eliminates competition.',
      'Antibiosis is classified under Amensalism.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_EVS_004,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An average hunter-gatherer has an ecological footprint of ~0.5 hectares/person. An average high-consumption industrial urban citizen has a footprint of 8.0 hectares/person. By what factor (X-fold) has human spatial resource demand increased?',
    correctAnswer: 16,
    tolerance: 0.5,
    unit: 'fold increase',
    explanation: '8.0 ha / 0.5 ha = 16. The transition from foraging subsistence to industrial urban consumerism expands per-capita ecological footprint sixteenfold.',
    hints: [
      'Divide 8.0 by 0.5.',
      '8 / 0.5 = 8 * 2',
      'The answer is 16.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C11_EVS_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'understanding',
    question: 'The Madagascar Star Orchid features a 30 cm deep nectar spur, and only the hawk moth Xanthopan morganii with its 30 cm long proboscis can pollinate it. What evolutionary phenomenon is this?',
    options: [
      'Coevolution (mutual selective reciprocal adaptation)',
      'Intraspecific territory competition',
      'Detritus bioaccumulation',
      'Eutrophication run-off',
    ],
    correctIndex: 0,
    explanation: 'Coevolution occurs when two interacting species exert reciprocal selective pressures over evolutionary time, shaping each other’s morphological adaptations (e.g. orchid spur depth and moth proboscis length).',
    hints: [
      'Both species evolved matching extreme physical traits together.',
      'Neither could reproduce or feed effectively without the other.',
      'Reciprocal evolutionary adaptation: Coevolution.',
    ],
  },
  {
    id: 'ch_23',
    nodeId: NODE_C11_EVS_005,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did pastoral societies predominantly develop patrilineal kinship and clan structures, whereas hunter-gatherers maintained bilateral extended kinship?',
    options: [
      'Pastoralism generated transmissible, defendable wealth in livestock (controlled by male herders), necessitating lineage inheritance rules',
      'Hunter-gatherers had large corporate real estate companies',
      'Pastoralists possessed no animals or property',
      'Hunter-gatherers practiced strict hereditary caste division of labour',
    ],
    correctIndex: 0,
    explanation: 'In pastoral economies, livestock represents mobile accumulated wealth requiring coordinated defence and male inheritance lineages (patriliny). Foragers lack stored wealth, fostering flexible bilateral kinship.',
    hints: [
      'Think about what constitutes "wealth" in each society.',
      'Herds of cattle/camels can be passed from father to son.',
      'Wild tubers and game cannot be hoarded or inherited across generations.',
    ],
  },
  {
    id: 'ch_24',
    nodeId: NODE_C11_EVS_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluating the winter smog crisis in Delhi requires atmospheric chemistry (PM2.5/NOx), agronomy (Punjab stubble burning), meteorology (inversion), economics, and governance (GRAP). Why is Environmental Science the only discipline equipped to resolve it?',
    options: [
      'Because EVS is fundamentally interdisciplinary, synthesizing physical sciences, economics, law, and sociology into one operational governance framework',
      'Because traditional chemistry has been declared unconstitutional by the Supreme Court',
      'Because meteorologists alone can physically prevent cold winter winds from blowing',
      'Because EVS ignores all scientific data and relies purely on folklore',
    ],
    correctIndex: 0,
    explanation: 'No single traditional subject can solve multi-dimensional environmental crises. Environmental Science bridges natural sciences (chemistry, biology), social sciences (economics, sociology), and law to formulate evidence-based policy.',
    hints: [
      'Consider the term "interdisciplinary".',
      'The crisis spans chemical particles, farm economics, legal court orders, and wind patterns.',
      'Only an integrated framework unites science and public policy.',
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
  nodeId: NODE_C11_EVS_001,
  title: 'Environmental Science: Scope, Modes of Existence & Ecological Dynamics',
  definition: 'Environmental Science is the interdisciplinary study of human-nature interactions, tracing how human modes of subsistence transform resource catchments, biogeochemical cycles, and ecological trophic webs.',
  eli5: 'EVS is like a master puzzle: it connects how humans get food and energy (from jungle hunting to giant factories) with how animals, plants, water, and air work together in nature without getting poisoned or destroyed.',
  misconceptions: [
    {
      misconception: 'Environmental Science is just a minor sub-branch of Biology or Geography.',
      correction: 'EVS is a distinct interdisciplinary science integrating chemistry, ecology, economics, technology, and environmental law (e.g. EIA, EPA 1986).',
    },
    {
      misconception: 'The Sentinelese are settled agriculturalists because they stay on one island.',
      correction: 'The Sentinelese are a nomadic hunter-gatherer PVTG who forage wild tubers and hunt game with zero crop cultivation or trade.',
    },
    {
      misconception: 'The Haber-Bosch nitrogen fixation process is purely agricultural with no industrial ties.',
      correction: 'Haber-Bosch is a high-temperature industrial chemical process powered by fossil fuels that manufactures fertilisers for agricultural application.',
    },
    {
      misconception: 'Bioaccumulation and Biomagnification are identical terms.',
      correction: 'Bioaccumulation occurs within a SINGLE organism over its lifespan; Biomagnification is the escalating concentration ACROSS successive trophic levels.',
    },
    {
      misconception: 'Removing apex predators like tigers benefits an ecosystem by saving deer.',
      correction: 'Apex predators provide top-down population regulation; removing them leads to herbivore overpopulation, catastrophic overgrazing, and habitat collapse.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the primary role of Environmental Impact Assessment (EIA)?', options: ['Predicting environmental effects before project approval', 'Selling forest timber', 'Building amusement parks', 'Extracting groundwater'], correctIndex: 0 },
    { question: 'Which mode of existence relies almost entirely on human metabolic energy (~2000 kcal/day)?', options: ['Industrial', 'Agricultural', 'Hunting-gathering', 'Pastoral'], correctIndex: 2 },
    { question: 'What is transhumance in pastoralism?', options: ['Sedentary urban manufacturing', 'Seasonal migration of herds between pastures', 'Monoculture wheat farming', 'Deep underground mining'], correctIndex: 1 },
    { question: 'Which chemical pesticide caused bald eagle and osprey eggshell thinning?', options: ['Urea', 'DDT', 'Penicillin', 'Methane'], correctIndex: 1 },
    { question: 'What is the interaction between Rhizobium and legume roots?', options: ['Parasitism', 'Amensalism', 'Mutualism', 'Predation'], correctIndex: 2 },
    { question: 'Which landmark Act recognises tribal forest rights in India?', options: ['FRA 2006', 'Factories Act', 'Motor Vehicles Act', 'IT Act 2000'], correctIndex: 0 },
    { question: 'What starts a Detritus Food Chain?', options: ['Living green grass', 'Dead organic matter and microbes', 'Solar photons', 'Synthetic plastics'], correctIndex: 1 },
    { question: 'What type of interaction is Penicillium antibiotic secretion against bacteria?', options: ['Mutualism', 'Amensalism', 'Commensalism', 'Herbivory'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of EVS scope, human modes of existence, resource throughput, ecological impact escalation, ecosystem structures, food webs, biomagnification, and inter-species interactions.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Modes of Existence & Resource Throughput',
    instruction: 'Adjust the Human Subsistence Mode slider to observe how energy throughput, material complexity, and geographic catchment expand.',
    interactionType: 'slider-modes',
    nodeId: NODE_C11_EVS_002,
  },
  {
    title: 'Lab 2: Biogeochemical & Habitat Perturbation',
    instruction: 'Simulate land transformation by increasing Industrial & Synthetic Agricultural input to observe the nitrogen runoff and forest fragmentation.',
    interactionType: 'slider-impact',
    nodeId: NODE_C11_EVS_004,
  },
  {
    title: 'Lab 3: Trophic Energy Flow & Biomagnification',
    instruction: 'Inject pesticide ppm into the aquatic trophic chain and watch toxin concentration multiply from phytoplankton up to apex raptors.',
    interactionType: 'slider-biomag',
    nodeId: NODE_C11_EVS_009,
  },
  {
    title: 'Lab 4: Ecosystem Structure & Abiotic Matrices',
    instruction: 'Toggle between Natural Lake and Artificial Aquarium to discover what happens when human maintenance subsidies are removed.',
    interactionType: 'toggle-ecosystem',
    nodeId: NODE_C11_EVS_008,
  },
  {
    title: 'Lab 5: Interspecific Matrix Simulator',
    instruction: 'Select pairs of organisms to inspect the direction of fitness benefit (+), harm (-), or neutrality (0).',
    interactionType: 'matrix-interactions',
    nodeId: NODE_C11_EVS_010,
  },
];

// ─── PREDICT-THEN-CHECK DATA ───
const PREDICTION_QUESTIONS = [
  {
    question: 'PREDICT: If an industrial fertilizer plant doubles nitrogen fixation runoff into a calm freshwater lake, what will happen first to dissolved oxygen (DO)?',
    options: [
      'DO will surge to 100% as fish breathe faster',
      'DO will plummet after algal blooms die and decomposer bacteria consume all oxygen (Eutrophication)',
      'Water will freeze into solid ice',
      'Phytoplankton will instantly turn into gold',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the "Fertiliser Runoff" dial in Lab 2 above 70% and observe the Dissolved O2 gauge turn red!',
    nodeId: NODE_C11_EVS_004,
  },
  {
    question: 'PREDICT: If all apex tigers are removed from a protected forest reserve, what happens to the forest sapling regeneration rate?',
    options: [
      'Saplings flourish because no tigers step on them',
      'Sapling regeneration collapses because uncontrolled deer populations overgraze every young shoot',
      'Trees grow 10 times taller in one day',
      'Earthworms stop decomposing dead leaves',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set Apex Predator density to 0 in Lab 5 and observe the Herbivore explosion leading to vegetation depletion.',
    nodeId: NODE_C11_EVS_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the geographic catchment scale as you move from Hunting-Gathering to Industrial mode?',
    observableOptions: [
      'It expands from a 5 km local walking radius to an interconnected planetary network (>10,000 km)',
      'It shrinks from global oceans to a single cave',
      'It remains strictly fixed at 50 km throughout all modes',
      'It disappears entirely as humans stop using physical materials',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_EVS_003,
  },
  {
    question: 'In the biomagnification simulator, what happens to the ratio of toxin to body mass at the highest trophic tier?',
    observableOptions: [
      'It is lowest in the top predator',
      'It amplifies exponentially because top predators consume hundreds of contaminated prey over their lifespan',
      'It drops to absolute zero due to avian immunity',
      'It remains constant across all organisms',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_EVS_009,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Environmental Impact Assessment (EIA) Field Lead',
  description: 'Conduct a rapid simulated EIA for a proposed infrastructure or mining corridor in your state. Identify the affected modes of existence, calculate catchment strain, and propose mitigation measures.',
  steps: [
    'Identify the core resource bundle: Forest canopy, tribal habitat, or river aquifer.',
    'Map competing modes: Agrarian cultivators, pastoral grazing routes, or industrial extraction.',
    'Formulate mandatory mitigation: Wildlife overpasses, Gram Sabha consent under FRA 2006, and effluent treatment.',
    'Present your EIA executive summary to your class or teacher.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_EVSEnvironmentalScienceScopeSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Science', emoji: '🌿', color: 'emerald' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Simulation Lab States
  const [modeIndex, setModeIndex] = useState<number>(0);
  const [fertilizerLevel, setFertilizerLevel] = useState<number>(25);
  const [forestClearing, setForestClearing] = useState<number>(10);
  const [ddtInputPpm, setDdtInputPpm] = useState<number>(0.04);
  const [aquariumPlugged, setAquariumPlugged] = useState<boolean>(true);
  const [selectedPair, setSelectedPair] = useState<string>('rhizobium-legume');
  const [catchmentKm, setCatchmentKm] = useState<number>(5);
  const [energyKcal, setEnergyKcal] = useState<number>(2000);
  const [ecologicalFootprintHa, setEcologicalFootprintHa] = useState<number>(0.5);
  const [dissolvedOxygenMgL, setDissolvedOxygenMgL] = useState<number>(8.5);
  const [nitrogenFixationTg, setNitrogenFixationTg] = useState<number>(110);
  const [trophicPlanktonPpm, setTrophicPlanktonPpm] = useState<number>(0.04);
  const [trophicSmallFishPpm, setTrophicSmallFishPpm] = useState<number>(0.5);
  const [trophicLargeFishPpm, setTrophicLargeFishPpm] = useState<number>(2.0);
  const [trophicApexRaptorPpm, setTrophicApexRaptorPpm] = useState<number>(25.0);

  // Brilliant Patterns States
  const [predictionMade, setPredictionMade] = useState(false);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating Hints & Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Construction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery & Visual Feedback
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [lastClickedIdx, setLastClickedIdx] = useState<number | null>(null);

  // BKT Ref & Inactivity Timer
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

  // ─── EFFECTS: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECTS: BKT MASTERY ADAPTATION ───
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

  // ─── EFFECTS: REAL-TIME PARAMETER DERIVATIONS ───
  useEffect(() => {
    if (modeIndex === 0) {
      setEnergyKcal(2000);
      setCatchmentKm(5);
      setEcologicalFootprintHa(0.5);
    } else if (modeIndex === 1) {
      setEnergyKcal(5000);
      setCatchmentKm(50);
      setEcologicalFootprintHa(2.0);
    } else if (modeIndex === 2) {
      setEnergyKcal(20000);
      setCatchmentKm(300);
      setEcologicalFootprintHa(3.5);
    } else {
      setEnergyKcal(100000);
      setCatchmentKm(12000);
      setEcologicalFootprintHa(8.0);
    }
  }, [modeIndex]);

  useEffect(() => {
    const doLevel = Math.max(0.5, 9.0 - (fertilizerLevel / 100) * 6.5 - (forestClearing / 100) * 1.5);
    setDissolvedOxygenMgL(Number(doLevel.toFixed(1)));
    const nFix = 110 + (fertilizerLevel / 100) * 160;
    setNitrogenFixationTg(Math.round(nFix));
  }, [fertilizerLevel, forestClearing]);

  useEffect(() => {
    const plankton = Number((ddtInputPpm * 1.0).toFixed(3));
    const smallFish = Number((ddtInputPpm * 12.5).toFixed(2));
    const largeFish = Number((ddtInputPpm * 50.0).toFixed(1));
    const apex = Number((ddtInputPpm * 625.0).toFixed(1));
    setTrophicPlanktonPpm(plankton);
    setTrophicSmallFishPpm(smallFish);
    setTrophicLargeFishPpm(largeFish);
    setTrophicApexRaptorPpm(apex);
  }, [ddtInputPpm]);

  // ─── 2D CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; speed: number; radius: number; hue: number }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.2,
        radius: 1.5 + Math.random() * 2.5,
        hue: 140 + Math.random() * 60,
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue}, 80%, 60%)`;
        ctx.fill();
      });

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * 0.04 + Date.now() * 0.003) * 8;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CALLBACK HANDLERS ───
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
    speechManager.speak(
      isCorrect ? 'Outstanding scientific intuition!' : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Environmental Science Exploration Labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the free sandbox. Test variables freely before starting your formal challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode active. Good luck!');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now manipulate the simulation dials to test your hypothesis.');
  }, []);

  const handleModeSlider = useCallback((val: number) => {
    setModeIndex(val);
    audioManager.play('count');
  }, []);

  const handleFertilizerSlider = useCallback((val: number) => {
    setFertilizerLevel(val);
    audioManager.play('count');
  }, []);

  const handleDdtSlider = useCallback((val: number) => {
    setDdtInputPpm(val);
    audioManager.play('count');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have successfully completed the Environmental Science Master Simulation.');
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
    setLastClickedIdx(null);
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

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (typeof answer === 'number') {
        setLastClickedIdx(answer);
      }

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
        speechManager.speak('Brilliant! That is correct.');
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
          speechManager.speak('Let us study the complete ecological explanation.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

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
      const arr = [...(prev.length > 0 ? prev : [0, 1, 2, 3])];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    handleAnswer(answer);
  }, [sortArrangement, handleAnswer]);

  const handleSparkleTrigger = useCallback((e: React.MouseEvent) => {
    setSparklePos({ x: e.clientX, y: e.clientY });
    setShowSparkle(true);
    audioManager.play('sparkle');
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              ISC Class 11 • {subjectConfig.name}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-700 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-300">Phase: {phase.toUpperCase()}</span>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSparkleTrigger}
            aria-label="Encouragement sparkle"
            className="px-3 py-1.5 bg-indigo-950/70 border border-indigo-700 text-indigo-300 rounded-xl text-xs font-bold"
          >
            ✨ Focus Spark
          </motion.button>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/80 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-800/60 text-emerald-200 rounded-md">
                EIA Mission Brief
              </span>
              <h2 className="text-lg font-bold text-emerald-300">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
              📌 <span className="font-semibold text-slate-200">Investigation Context:</span> {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 text-lg">💡</span>
              <h3 className="text-base font-bold text-white">Curiosity Hook: Predict Before Learning</h3>
            </div>
            <p className="text-sm text-slate-200 font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  aria-label={`Discovery option ${idx + 1}`}
                  className={`p-4 text-left rounded-xl text-xs sm:text-sm transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-emerald-400">[{String.fromCharCode(65 + idx)}]</span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className={`text-xs sm:text-sm font-medium ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Persistent organochlorines amplify upward across food trophic webs.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter interactive labs"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-900/40"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6 shadow-xl"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-300 font-medium mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── INTERACTIVE VISUALIZATION MATRICES ─── */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80">
                {currentSlide === 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Hunting-Gathering', 'Pastoral Transhumance', 'Agricultural Sedentary', 'Industrial Mechanised'].map(
                        (name, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleModeSlider(idx)}
                            aria-label={`Select mode ${name}`}
                            className={`p-3 rounded-xl text-left border transition-all ${
                              modeIndex === idx
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className="text-xs font-mono text-emerald-400 block mb-1">Mode 0{idx + 1}</span>
                            <span className="text-xs font-bold leading-tight block">{name}</span>
                          </motion.button>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <svg viewBox="0 0 360 200" className="w-full bg-slate-900/60 rounded-xl border border-slate-800">
                        <circle cx="180" cy="100" r={Math.min(85, 12 + modeIndex * 24)} fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="2" strokeDasharray={modeIndex === 3 ? '4 4' : 'none'} />
                        <circle cx="180" cy="100" r="10" fill="#047857" />
                        <text x="180" y="104" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Center</text>

                        <line x1="180" y1="100" x2={180 + Math.min(85, 12 + modeIndex * 24)} y2="100" stroke="#34d399" strokeWidth="1.5" />
                        <text x={180 + Math.min(85, 12 + modeIndex * 24) / 2} y="95" fill="#a7f3d0" fontSize="8" textAnchor="middle">
                          Catchment: {catchmentKm} km
                        </text>

                        <text x="15" y="25" fill="#e2e8f0" fontSize="10" fontWeight="bold">
                          {modeIndex === 0 && 'Sentinelese / Jarawa (Andaman PVTG)'}
                          {modeIndex === 1 && 'Maldhari / Gujjar Pastoralists'}
                          {modeIndex === 2 && 'Punjab Wheat-Paddy Agrarian Basin'}
                          {modeIndex === 3 && 'Industrial Ludhiana / Jamshedpur City'}
                        </text>
                        <text x="15" y="40" fill="#94a3b8" fontSize="8">
                          {modeIndex === 0 && 'Tools: Stone, wood, bone • Fuel: Human metabolic'}
                          {modeIndex === 1 && 'Tools: Leather, wool, horn • Fuel: Draught animals'}
                          {modeIndex === 2 && 'Tools: Iron plough, clay • Fuel: Biomass / wood'}
                          {modeIndex === 3 && 'Tools: Steel, polymers, rare earths • Fuel: Fossil fuels & grid'}
                        </text>
                      </svg>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                          <span className="text-slate-400 text-[10px] block uppercase font-mono">Energy / Capita</span>
                          <span className="text-sm sm:text-base font-black text-emerald-400 mt-1 block">
                            {energyKcal.toLocaleString()} kcal
                          </span>
                          <span className="text-[9px] text-slate-500">per day throughput</span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                          <span className="text-slate-400 text-[10px] block uppercase font-mono">Catchment Area</span>
                          <span className="text-sm sm:text-base font-black text-indigo-400 mt-1 block">
                            {catchmentKm >= 1000 ? 'Global' : `${catchmentKm} km`}
                          </span>
                          <span className="text-[9px] text-slate-500">resource radius</span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                          <span className="text-slate-400 text-[10px] block uppercase font-mono">Eco-Footprint</span>
                          <span className="text-sm sm:text-base font-black text-amber-400 mt-1 block">
                            {ecologicalFootprintHa} ha
                          </span>
                          <span className="text-[9px] text-slate-500">per person load</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-300">
                        <span className="font-bold text-emerald-400">Scientific Takeaway:</span> Human history is not just about tools; it is an exponential escalation in per-capita energetic throughput (from 2,000 to 100,000+ kcal/day) and geographic extraction reach.
                      </p>
                    </div>
                  </div>
                )}

                {currentSlide === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300">Synthetic Nitrogen Fertiliser Runoff:</span>
                          <span className="font-mono text-emerald-400">{fertilizerLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={fertilizerLevel}
                          onChange={e => handleFertilizerSlider(Number(e.target.value))}
                          aria-label="Adjust synthetic nitrogen fertiliser runoff"
                          className="w-full accent-emerald-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300">Forest Canopy Clearance:</span>
                          <span className="font-mono text-amber-400">{forestClearing}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={90}
                          value={forestClearing}
                          onChange={e => setForestClearing(Number(e.target.value))}
                          aria-label="Adjust forest canopy clearance percentage"
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>

                    <svg viewBox="0 0 380 180" className="w-full bg-slate-900/60 rounded-xl border border-slate-800">
                      <rect x="20" y="80" width="160" height="85" rx="8" fill={dissolvedOxygenMgL < 4.0 ? '#451a03' : '#0c4a6e'} />
                      <text x="100" y="105" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        {dissolvedOxygenMgL < 4.0 ? '⚠️ Eutrophic Dead Zone' : 'Freshwater Aquatic Lake'}
                      </text>
                      <text x="100" y="125" textAnchor="middle" fill="#93c5fd" fontSize="9">
                        DO: {dissolvedOxygenMgL} mg/L
                      </text>
                      <text x="100" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="8">
                        {dissolvedOxygenMgL < 4.0 ? 'Fish suffocating / Anoxic' : 'Healthy Biotic Respiration'}
                      </text>

                      <rect x="200" y="80" width="160" height="85" rx="8" fill="#064e3b" />
                      {forestClearing > 40 && (
                        <rect x="270" y="80" width="20" height="85" fill="#475569" stroke="#94a3b8" strokeDasharray="2 2" />
                      )}
                      <text x="280" y="105" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        {forestClearing > 40 ? 'Fragmented Corridor' : 'Contiguous Forest Biome'}
                      </text>
                      <text x="280" y="125" textAnchor="middle" fill="#86efac" fontSize="9">
                        Haber-Bosch Fixation: {nitrogenFixationTg} Tg/yr
                      </text>
                      <text x="280" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="8">
                        {forestClearing > 40 ? 'Highway Severing Gene Flow' : 'Undisturbed Wildlife Dispersal'}
                      </text>
                    </svg>

                    {!predictionMade ? (
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-xs sm:text-sm text-amber-300 font-semibold mb-2">
                          🔮 {PREDICTION_QUESTIONS[0].question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              aria-label={`Prediction option ${i + 1}`}
                              className="p-2.5 text-left bg-slate-800/80 hover:bg-slate-700 rounded-lg text-xs text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-800 flex items-center justify-between">
                        <p className="text-xs text-emerald-300">
                          ✓ Prediction recorded! Check the DO gauge above as you slide fertiliser past 70%.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {currentSlide === 2 && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Initial Water DDT Concentration (ppm):</span>
                        <span className="font-mono text-emerald-400">{ddtInputPpm} ppm</span>
                      </div>
                      <input
                        type="range"
                        min={0.01}
                        max={0.10}
                        step={0.01}
                        value={ddtInputPpm}
                        onChange={e => handleDdtSlider(Number(e.target.value))}
                        aria-label="Adjust initial water DDT concentration"
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-emerald-900/60 text-center">
                        <span className="text-[10px] text-emerald-400 uppercase font-mono">Trophic Tier 1</span>
                        <p className="text-xs font-bold text-white mt-1">Phytoplankton</p>
                        <span className="text-sm font-black text-emerald-300 block my-1">{trophicPlanktonPpm} ppm</span>
                        <span className="text-[9px] text-slate-400">Primary Producers</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-cyan-900/60 text-center">
                        <span className="text-[10px] text-cyan-400 uppercase font-mono">Trophic Tier 2</span>
                        <p className="text-xs font-bold text-white mt-1">Small Forage Fish</p>
                        <span className="text-sm font-black text-cyan-300 block my-1">{trophicSmallFishPpm} ppm</span>
                        <span className="text-[9px] text-slate-400">Primary Consumers</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-indigo-900/60 text-center">
                        <span className="text-[10px] text-indigo-400 uppercase font-mono">Trophic Tier 3</span>
                        <p className="text-xs font-bold text-white mt-1">Predatory Fish</p>
                        <span className="text-sm font-black text-indigo-300 block my-1">{trophicLargeFishPpm} ppm</span>
                        <span className="text-[9px] text-slate-400">Secondary Consumers</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-rose-900/80 bg-rose-950/20 text-center">
                        <span className="text-[10px] text-rose-400 uppercase font-mono">Trophic Tier 4</span>
                        <p className="text-xs font-bold text-white mt-1">Osprey / Pelican</p>
                        <span className="text-sm font-black text-rose-400 block my-1">{trophicApexRaptorPpm} ppm</span>
                        <span className="text-[9px] text-rose-300 font-semibold">Eggshell Thinning & Collapse</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-300">
                        <span className="font-bold text-rose-400">Bioaccumulation vs Biomagnification:</span> While bioaccumulation occurs inside a single organism over time, biomagnification magnifies non-biodegradable, fat-soluble compounds (DDT, methylmercury) across trophic transfers due to high predatory consumption ratios.
                      </p>
                    </div>
                  </div>
                )}

                {currentSlide === 3 && (
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setAquariumPlugged(true)}
                        aria-label="Set ecosystem to Natural Lake"
                        className={`flex-1 p-3 rounded-xl border text-left ${
                          aquariumPlugged ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold block">1. Natural Lake Ecosystem</span>
                        <span className="text-[10px] text-slate-400">Self-sustaining natural nutrient recycling</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setAquariumPlugged(false)}
                        aria-label="Set ecosystem to Unmaintained Artificial Aquarium"
                        className={`flex-1 p-3 rounded-xl border text-left ${
                          !aquariumPlugged ? 'bg-rose-950 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold block">2. Artificial Aquarium (Power Cut)</span>
                        <span className="text-[10px] text-slate-400">Requires continuous human energy subsidies</span>
                      </motion.button>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-mono text-slate-400 block mb-1">Ecosystem Status:</span>
                        <p className="text-sm font-bold text-white">
                          {aquariumPlugged
                            ? 'Stable: Complete solar energy conversion, natural bacterial mineralization, balanced trophic levels.'
                            : 'Collapsed: Zero aeration, toxic ammonia accumulation from unmanaged waste, rapid mortality.'}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-400 block mb-1">ISC Exam Distinction:</span>
                        <p className="text-xs text-slate-300">
                          Natural ecosystems sustain themselves through natural biogeochemical loops. Artificial ecosystems (aquariums, croplands) require external human maintenance to prevent entropic degradation.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide === 4 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'rhizobium-legume', label: 'Rhizobium & Pea Plant', type: 'Mutualism (+ / +)' },
                        { id: 'tiger-chital', label: 'Tiger & Chital Deer', type: 'Predation (+ / -)' },
                        { id: 'penicillium-bacteria', label: 'Penicillium & Bacteria', type: 'Amensalism (- / 0)' },
                        { id: 'cuscuta-host', label: 'Cuscuta & Host Tree', type: 'Parasitism (+ / -)' },
                        { id: 'barnacle-whale', label: 'Barnacles & Whale', type: 'Commensalism (+ / 0)' },
                        { id: 'lions-hyenas', label: 'Lions & Hyenas', type: 'Competition (- / -)' },
                      ].map(item => (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedPair(item.id)}
                          aria-label={`Select interaction pair ${item.label}`}
                          className={`p-3 rounded-xl text-left border ${
                            selectedPair === item.id
                              ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="text-xs font-bold block text-white">{item.label}</span>
                          <span className="text-[10px] font-mono text-emerald-400 block mt-1">{item.type}</span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs font-mono uppercase text-indigo-400 block mb-1">
                        Selected Ecological Analysis
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {selectedPair === 'rhizobium-legume' &&
                          'Mutualism (+/+): Rhizobium bacteria fix atmospheric N2 into ammonia for protein synthesis in legumes, receiving photosynthetic carbohydrates and anaerobic shelter in root nodules.'}
                        {selectedPair === 'tiger-chital' &&
                          'Predation (+/-): Tigers regulate prey density, preventing herbivore overgrazing and driving evolutionary speed adaptations in deer populations.'}
                        {selectedPair === 'penicillium-bacteria' &&
                          'Amensalism (-/0): Penicillium fungus naturally secretes penicillin which destroys bacterial cell walls without deriving food or direct benefit from dead bacteria.'}
                        {selectedPair === 'cuscuta-host' &&
                          'Total Parasitism (+/-): Cuscuta completely lacks chlorophyll and pierces host vascular bundles with haustoria to draw water, minerals, and organic sap.'}
                        {selectedPair === 'barnacle-whale' &&
                          'Commensalism (+/0): Barnacles gain physical mobility and rich plankton-feeding currents while the whale experiences zero harm or benefit.'}
                        {selectedPair === 'lions-hyenas' &&
                          'Interspecific Competition (-/-): Both carnivores contend for the same limited ungulate carcasses, mutually expending energy and risking mortality.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentSlide === 0}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  aria-label="Previous exploration lab"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs text-slate-500 font-mono">
                  {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    aria-label="Next exploration lab"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Proceed to Free Sandbox"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-900/30"
                  >
                    Proceed to Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>
      )}

      {/* ─── PHASE 3: FREE SANDBOX PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">Free Ecological Sandbox Simulator</h3>
                <p className="text-xs text-slate-400">
                  Manipulate environmental parameters freely with zero grading pressure before formal evaluation.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Start formal challenges"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-900/40"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-emerald-400 block">1. Mode Throughput</span>
                <input
                  type="range"
                  min={0}
                  max={3}
                  value={modeIndex}
                  onChange={e => handleModeSlider(Number(e.target.value))}
                  aria-label="Sandbox mode selector slider"
                  className="w-full accent-emerald-500"
                />
                <p className="text-xs text-slate-300">
                  Mode: <span className="font-bold text-white">{['Forager', 'Pastoral', 'Agrarian', 'Industrial'][modeIndex]}</span>
                </p>
                <p className="text-[10px] text-slate-400">Footprint: {ecologicalFootprintHa} ha/capita</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-cyan-400 block">2. Eutrophication Input</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={fertilizerLevel}
                  onChange={e => handleFertilizerSlider(Number(e.target.value))}
                  aria-label="Sandbox fertilizer level slider"
                  className="w-full accent-cyan-500"
                />
                <p className="text-xs text-slate-300">
                  Dissolved O2: <span className="font-bold text-white">{dissolvedOxygenMgL} mg/L</span>
                </p>
                <p className="text-[10px] text-slate-400">Haber-Bosch Load: {nitrogenFixationTg} Tg N/yr</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-rose-400 block">3. Toxin Biomagnification</span>
                <input
                  type="range"
                  min={0.01}
                  max={0.10}
                  step={0.01}
                  value={ddtInputPpm}
                  onChange={e => handleDdtSlider(Number(e.target.value))}
                  aria-label="Sandbox DDT concentration slider"
                  className="w-full accent-rose-500"
                />
                <p className="text-xs text-slate-300">
                  Apex Raptor: <span className="font-bold text-rose-400">{trophicApexRaptorPpm} ppm</span>
                </p>
                <p className="text-[10px] text-slate-400">Magnification: 625x factor</p>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-mono text-slate-500 block mb-1">
                Thermodynamic Biomass Particle Energy Flow:
              </span>
              <canvas ref={canvasRef} width={600} height={50} className="w-full rounded-xl bg-slate-950 border border-slate-800" />
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </h2>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : difficulty === 'standard'
                      ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {difficulty}
                </motion.span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Competency: <span className="text-emerald-300 uppercase">{challenge.competencyLevel}</span> • Target Node:{' '}
                <span className="text-slate-300">{challenge.nodeId}</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-slate-400">Mastery: {masteryLevel.toUpperCase()}</span>
              <div className="w-32 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="text-xs text-indigo-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* Question Card with Visual Feedback and Shake Animation */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-sm sm:text-base font-bold text-white mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ TYPE (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={wrongShake && lastClickedIdx === idx ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      disabled={showExplanation}
                      onClick={() => handleAnswer(idx)}
                      aria-label={`Answer option ${idx + 1}`}
                      className={`p-4 text-left rounded-xl text-xs sm:text-sm border transition-all ${
                        showExplanation && idx === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100 font-bold'
                          : wrongFlash && lastClickedIdx === idx
                          ? 'bg-rose-900/60 border-rose-500 text-rose-100'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2 text-emerald-400">[{String.fromCharCode(65 + idx)}]</span>
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-mono text-slate-400 w-full mb-1">Draggable Classification Tokens:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable token ${item.label}`}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { slot: 'slot_producer', label: '1. Autotrophic Producer Tier' },
                    { slot: 'slot_consumer', label: '2. Heterotrophic Consumer Tier' },
                    { slot: 'slot_decomposer', label: '3. Saprotrophic Decomposer Tier' },
                    { slot: 'slot_abiotic', label: '4. Non-Living Abiotic Matrix' },
                  ].map(target => (
                    <div
                      key={target.slot}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.slot)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex flex-col justify-between min-h-[75px]"
                    >
                      <span className="text-[11px] font-mono text-slate-400">{target.label}</span>
                      <span className="text-xs font-bold text-emerald-300 mt-2">
                        {droppedLabels[target.slot] ? `✓ ${droppedLabels[target.slot]}` : '📥 Drop Token Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify Dropped Labels"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
                >
                  Verify Dropped Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
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
                      aria-label={`Sortable item ${displayIdx + 1}`}
                      className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <span className="font-bold text-emerald-400 mr-2">{displayIdx + 1}.</span>
                        {item}
                      </span>
                      <span className="text-slate-500 text-xs">☰ Drag to Reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Verify Sequence Order"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
                >
                  Verify Sequence Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    aria-label="Numeric answer input"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-64 focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric answer"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-emerald-950 text-emerald-200 border border-emerald-700 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        aria-label="Remove part"
                        className="text-rose-400 hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click parts above to construct the statutory legal title</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Legal Construction"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
                >
                  Verify Legal Construction
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP CLICK-TO-REVEAL EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/80 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Step-by-Step ISC Ecological Explanation
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
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
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-emerald-400 mr-1.5">[{idx + 1}]</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal Next Step"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Next Challenge or Complete"
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700 shadow-2xl text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">EIA & Ecological Scope Mastery Achieved!</h2>
            
            {/* Personalised Motivational Feedback */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-emerald-500/50 max-w-lg mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-1">Performance Evaluation</span>
              <p className="text-xl sm:text-2xl font-black text-white">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                {errors === 0
                  ? 'Flawless execution across all ecological models and case studies.'
                  : `Completed with ${errors} total retry ${errors === 1 ? 'attempt' : 'attempts'}. Keep strengthening your mastery!`}
              </p>
            </div>

            <p className="text-sm text-slate-300 max-w-2xl mx-auto">
              You have completed all analytical dimensions of Environmental Science across human subsistence modes, biogeochemical modifications, ecosystem dynamics, and legal conservation frameworks.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] uppercase font-mono text-slate-400">Final Score</span>
                <p className="text-2xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] uppercase font-mono text-slate-400">Mastery Tier</span>
                <p className="text-2xl font-black text-indigo-400 mt-1">{masteryLevel.toUpperCase()}</p>
              </div>
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] uppercase font-mono text-slate-400">SRS Review</span>
                <p className="text-2xl font-black text-amber-400 mt-1">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </p>
              </div>
            </div>

            {/* Explicit Spaced Repetition Notification */}
            <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 max-w-xl mx-auto text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-emerald-400 text-sm">📅</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Spaced Repetition Schedule (SRS)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Based on your performance ({errors} {errors === 1 ? 'error' : 'errors'}), optimal memory retention requires reviewing this topic in{' '}
                <span className="font-bold text-amber-300">
                  {errors === 0 ? '7 days (Mastery Interval)' : errors <= 3 ? '3 days (Consolidation Interval)' : '1 day (Reinforcement Interval)'}
                </span>.
              </p>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-slate-900 rounded-3xl border border-rose-900/60 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-rose-400 text-lg">⚠️</span>
                <h3 className="text-sm font-bold text-white">Targeted Misconception Correction Profile</h3>
              </div>
              <p className="text-xs text-slate-400">
                Review these specific misconceptions flagged during your evaluation:
              </p>
              <div className="space-y-3 pt-1">
                {hitMisconceptions.map(idx => {
                  const item = misconceptions?.[idx];
                  if (!item) return null;
                  return (
                    <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-rose-300 mb-1">❌ Misconception: {item.misconception}</p>
                      <p className="text-xs text-emerald-300">✓ Scientific Fact: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World EIA Mission Arc */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-emerald-300">🌿 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-emerald-400 mr-2">Step 0{i + 1}:</span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Meta-Cognitive Reflection Questions */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300">🤔 Self-Reflection Prompts</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>1. Why is human metabolic energy (2000 kcal) qualitatively different from fossil fuel consumption (100,000 kcal)?</li>
              <li>2. How does the 2013 Niyamgiri Supreme Court ruling exemplify the clash of worldviews in ecological conflicts?</li>
              <li>3. In your own words, how does Rachel Carson’s DDT eggshell finding demonstrate trophic biomagnification?</li>
            </ul>
          </div>
        </motion.section>
      )}

      {/* ─── FEEDBACK SYSTEM OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="EIA Mission Mastery Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_EVSEnvironmentalScienceScopeSim;
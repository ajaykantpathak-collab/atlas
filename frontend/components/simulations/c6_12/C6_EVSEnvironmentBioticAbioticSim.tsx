'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ───
const NODE_C6_EVS_001 = 'c6_evs_001';
const NODE_C6_EVS_002 = 'c6_evs_002';
const NODE_C6_EVS_003 = 'c6_evs_003';
const NODE_C6_EVS_004 = 'c6_evs_004';
const NODE_C6_EVS_005 = 'c6_evs_005';
const NODE_C6_EVS_006 = 'c6_evs_006';
const NODE_C6_EVS_007 = 'c6_evs_007';
const NODE_C6_EVS_008 = 'c6_evs_008';
const NODE_C6_EVS_009 = 'c6_evs_009';
const NODE_C6_EVS_010 = 'c6_evs_010';

const ALL_NODE_IDS = [
  NODE_C6_EVS_001,
  NODE_C6_EVS_002,
  NODE_C6_EVS_003,
  NODE_C6_EVS_004,
  NODE_C6_EVS_005,
  NODE_C6_EVS_006,
  NODE_C6_EVS_007,
  NODE_C6_EVS_008,
  NODE_C6_EVS_009,
  NODE_C6_EVS_010,
];

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Sundarban: Saving the Living Biosphere',
  intro: 'You are an environmental field officer posted to the Sundarbans and Western Ghats eco-zones in India. A sudden ecological imbalance is threatening wildlife, water tables, and farming communities.',
  context: 'Balance sunlight, soil, rainfall, vegetation, and food chains to stabilize 10 interrelated environmental zones!',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a thriving forest ecosystem, if all fungi and soil bacteria suddenly disappear, what happens first?',
  options: [
    'Tigers and lions will starve within 2 days.',
    'Dead leaves and wood will pile up, halting soil nutrient cycling and starving plants.',
    'Rainfall will completely stop falling across India.',
    'Air will instantly run out of oxygen in 5 minutes.',
  ],
  correctIndex: 1,
  hintAfter: "Let's explore why decomposers form the secret backbone linking living (biotic) and non-living (abiotic) worlds!",
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

// ─── 22 CHALLENGES ACROSS 10 NODES (NEP 2020 aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Biotic vs Abiotic (c6_evs_001) - Drag Label (Foundation - Understanding)
  {
    id: 'ch_01',
    nodeId: NODE_C6_EVS_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify components into their fundamental environmental categories: Biotic or Abiotic.',
    dragItems: [
      { label: 'Neem Tree', targetId: 'slot_biotic1' },
      { label: 'Sunlight', targetId: 'slot_abiotic1' },
      { label: 'Soil Minerals', targetId: 'slot_abiotic2' },
      { label: 'Soil Fungi', targetId: 'slot_biotic2' },
    ],
    correctMapping: {
      slot_biotic1: 'Neem Tree',
      slot_abiotic1: 'Sunlight',
      slot_abiotic2: 'Soil Minerals',
      slot_biotic2: 'Soil Fungi',
    },
    explanation: 'Biotic components are living organisms showing growth, reproduction, and response. Abiotic components are physical and chemical factors like minerals, sunlight, air, and water.',
    hints: [
      'Look for things that grow, breathe, or decompose organic matter.',
      'Sunlight and soil mineral particles do not reproduce or feed.',
      'Neem and Fungi are living (biotic); Sunlight and Minerals are non-living (abiotic).',
    ],
    misconceptionIndex: 0,
  },
  // 2. Misconception about Soil Material (c6_evs_001) - Classify (Foundation - Recall)
  {
    id: 'ch_02',
    nodeId: NODE_C6_EVS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A student claims: "Soil as a physical material is biotic because earthworms crawl inside it." How should this be evaluated?',
    options: [
      'Correct, anything holding worms is biotic.',
      'Incorrect, soil particles are abiotic minerals; only the organisms inside it are biotic.',
      'Correct, soil undergoes reproduction when crops grow.',
      'Incorrect, soil is made of plastic residues.',
    ],
    correctIndex: 1,
    explanation: 'Soil itself is an abiotic material composed of weathered mineral fragments, water, and air. The living roots, insects, and earthworms dwelling in it are biotic.',
    hints: [
      'Separate the physical container/medium from the organisms living in it.',
      'Does crushed mineral rock reproduce by itself?',
      'Soil particles are abiotic minerals, while organisms within are biotic.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Ecosystem Food Chain (c6_evs_002) - Drag Sort (Foundation - Understanding)
  {
    id: 'ch_03',
    nodeId: NODE_C6_EVS_002,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange this grassland food chain in the proper sequence of energy flow from solar capture to top predator.',
    sortItems: ['Grass (Producer)', 'Grasshopper (Herbivore)', 'Frog (Carnivore)', 'Snake (Top Predator)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Energy flows unidirectional: Sun → Producers (Grass) → Primary Consumers (Grasshopper) → Secondary Consumers (Frog) → Tertiary Consumers (Snake).',
    hints: [
      'Energy always starts with the organism that does photosynthesis.',
      'Who eats grass? Then who eats that insect?',
      'Sequence: Grass → Grasshopper → Frog → Snake.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Ecosystem Interdependence (c6_evs_002) - Classify (Standard - Application)
  {
    id: 'ch_04',
    nodeId: NODE_C6_EVS_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Kaziranga pond ecosystem (Algae → Small Fish → Big Fish → Kingfisher), pesticide runoff kills all small fish. What immediate double-ripple occurs?',
    options: [
      'Algae decrease dramatically while Kingfishers multiply 10-fold.',
      'Algae bloom unchecked while Big Fish starve and decline.',
      'Kingfishers switch to eating dry sand and water plants.',
      'Decomposers instantly stop working.',
    ],
    correctIndex: 1,
    explanation: 'Removing a middle link causes its prey (Algae) to multiply rapidly due to lack of grazing, while predators above (Big Fish) lose their main food source and decline.',
    hints: [
      'Think what happens below the missing link (no predator eating them).',
      'Think what happens above the missing link (no prey to eat).',
      'Algae grow unchecked; Big Fish face acute food shortage.',
    ],
  },
  // 5. Plant Biodiversity Classification (c6_evs_003) - Classify (Foundation - Recall)
  {
    id: 'ch_05',
    nodeId: NODE_C6_EVS_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How are Pea plants and Pumpkin vines correctly distinguished by their growth habit?',
    options: [
      'Pea is a creeper along the ground; Pumpkin climbs with wooden trunks.',
      'Pea is a climber using tendrils on upright support; Pumpkin is a creeper trailing along the ground.',
      'Both are tall woody trees of evergreen rain forests.',
      'Both are aquatic floating herbs.',
    ],
    correctIndex: 1,
    explanation: 'Climbers (like pea) have weak stems that scale upright supports with tendrils. Creepers (like pumpkin) have weak stems that spread horizontally across the ground bearing heavy fruits.',
    hints: [
      'Does a pumpkin climb high into tree branches or rest its heavy fruit on soil?',
      'Peas use spiraling tendrils to climb sticks.',
      'Pea = climber (upwards on support); Pumpkin = creeper (trails on soil).',
    ],
  },
  // 6. Animal Grouping & Whale Misconception (c6_evs_003) - Distinguish (Standard - Analysis)
  {
    id: 'ch_06',
    nodeId: NODE_C6_EVS_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the Blue Whale classified scientifically as a Mammal rather than a Fish?',
    options: [
      'Because it swims using broad tail fins in ocean waters.',
      'Because it is warm-blooded, breathes air through lungs, and nourishes its young with milk.',
      'Because it lays thousands of soft eggs in sea mud.',
      'Because it has cold blood and scaly gills.',
    ],
    correctIndex: 1,
    explanation: 'Scientific classification depends on structural and reproductive traits, not habitat. Whales give live birth, produce milk, and breathe atmospheric oxygen through lungs, making them mammals.',
    hints: [
      'Do whales have gills or come to the surface for air?',
      'Do mother whales feed their babies milk?',
      'Mammal traits: lungs, warm-blooded, live birth, milk nursing.',
    ],
    misconceptionIndex: 2,
  },
  // 7. Renewable vs Non-renewable (c6_evs_004) - Classify (Foundation - Understanding)
  {
    id: 'ch_07',
    nodeId: NODE_C6_EVS_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are Coal and Petroleum classified as Non-Renewable resources even though they formed from dead organic plants and plankton?',
    options: [
      'Because they do not contain carbon atoms.',
      'Because their geological formation took millions of years, so they cannot replenish on a human timescale.',
      'Because they dissolve instantly in rainwater.',
      'Because plants no longer grow anywhere on Earth.',
    ],
    correctIndex: 1,
    explanation: 'Non-renewability is determined by the rate of replenishment relative to human consumption. Fossil fuels take geological epochs (millions of years) to form under immense heat and pressure.',
    hints: [
      'Can a mined coal seam regrow within our lifetime?',
      'Formation speed vs consumption speed is key.',
      'Formed over millions of years; irreplaceable on a human timescale.',
    ],
  },
  // 8. Resource Depletion vs Disadvantage (c6_evs_004) - Distinguish (Standard - Analysis)
  {
    id: 'ch_08',
    nodeId: NODE_C6_EVS_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following describes a CAUSE of fossil fuel depletion rather than an environmental effect/disadvantage?',
    options: [
      'Formation of acid rain corroding the Taj Mahal.',
      'Rapidly rising industrial energy demand and exponential increase in motor vehicles.',
      'Smog formation causing acute bronchitis in Delhi.',
      'Global warming raising ocean sea levels.',
    ],
    correctIndex: 1,
    explanation: 'Causes of depletion are factors driving rapid extraction (population growth, vehicles, factories). Acid rain, smog, and warming are harmful consequences/effects.',
    hints: [
      'Look for the driver that burns up the fuel supply faster.',
      'Effects are consequences; causes are extraction drivers.',
      'Vehicle increase and factory demand directly empty the fuel reserves.',
    ],
    misconceptionIndex: 3,
  },
  // 9. Water Cycle Sequence (c6_evs_005) - Drag Sort (Foundation - Recall)
  {
    id: 'ch_09',
    nodeId: NODE_C6_EVS_005,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the 4 continuous stages of the global Water Cycle in scientific order.',
    sortItems: [
      'Evaporation (Solar heating lifts vapor)',
      'Condensation (Cooling vapors form clouds)',
      'Precipitation (Droplets fall as rain/snow)',
      'Collection (Runoff refills aquifers & rivers)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Solar energy drives Evaporation → rising vapor undergoes Condensation into clouds → clouds release Precipitation → water undergoes Collection in waterbodies and groundwater.',
    hints: [
      'Water turns to vapor first under sun heat.',
      'Vapor cools into clouds before falling.',
      'Order: Evaporation → Condensation → Precipitation → Collection.',
    ],
  },
  // 10. Water Conservation Math (c6_evs_005) - Numeric (Standard - Application)
  {
    id: 'ch_10',
    nodeId: NODE_C6_EVS_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A school campus has 15 leaking taps. If one untreated leaking tap wastes 30 litres per day, how many litres of water are saved in 30 days if all are repaired?',
    correctAnswer: 13500,
    tolerance: 10,
    unit: 'litres',
    explanation: '15 taps × 30 litres/day = 450 litres saved per day. In 30 days: 450 × 30 = 13,500 litres of clean water conserved!',
    hints: [
      'Calculate daily loss first: 15 × 30.',
      'Daily waste = 450 litres.',
      'Multiply daily waste by 30 days: 450 × 30 = 13,500.',
    ],
  },
  // 11. Composition of Air (c6_evs_006) - Numeric (Foundation - Recall)
  {
    id: 'ch_11',
    nodeId: NODE_C6_EVS_006,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What percentage of clean dry atmospheric air by volume is Nitrogen gas?',
    correctAnswer: 78,
    tolerance: 1,
    unit: '%',
    explanation: 'Earth’s atmospheric air is composed of approximately 78% Nitrogen, 21% Oxygen, 0.93% Argon, and 0.04% Carbon Dioxide.',
    hints: [
      'Nitrogen is roughly four-fifths of the whole atmosphere.',
      'Oxygen is 21%, Nitrogen is much higher.',
      'The exact standard textbook value is 78%.',
    ],
  },
  // 12. Combustion & Respiration in Air (c6_evs_006) - Classify (Standard - Understanding)
  {
    id: 'ch_12',
    nodeId: NODE_C6_EVS_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does an inverted bell jar over a burning candle extinguish the flame after 20 seconds?',
    options: [
      'Nitrogen is consumed by the wax flame.',
      'The candle consumes the limited ~21% Oxygen needed for combustion until exhausted.',
      'Carbon dioxide freezes the flame solid.',
      'Water vapor blows out the wick.',
    ],
    correctIndex: 1,
    explanation: 'Combustion requires oxygen. Inside a closed jar, the 21% oxygen is converted to CO2 and water vapor until oxygen concentration drops below the combustion threshold.',
    hints: [
      'Which gas actively supports combustion and respiration?',
      'Nitrogen is inert; oxygen is active.',
      'Oxygen gets exhausted inside the sealed container.',
    ],
  },
  // 13. Soil Formation & Humus (c6_evs_007) - Construct (Foundation - Understanding)
  {
    id: 'ch_13',
    nodeId: NODE_C6_EVS_007,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Construct the true recipe for fertile agricultural topsoil from its essential building blocks.',
    availableParts: ['Weathered Mineral Particles', 'Plastic Waste', 'Humus (Organic Matter)', 'Air & Water'],
    targetState: 'Weathered Mineral Particles Humus (Organic Matter) Air & Water',
    validationHint: 'Select all genuine components of fertile soil (exclude synthetic pollutants).',
    explanation: 'Fertile topsoil = Weathered parent rock minerals + Humus (decomposed organic matter) + Soil Air & Soil Water holding dissolved nutrients.',
    hints: [
      'Fertile soil needs mineral particles from rock weathering.',
      'It also needs organic matter (humus) and air/water for root respiration.',
      'Leave out plastic waste!',
    ],
  },
  // 14. Soil Types Identification (c6_evs_007) - Classify (Standard - Application)
  {
    id: 'ch_14',
    nodeId: NODE_C6_EVS_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Sample X drains 100ml water in 1 minute and feels coarse and gritty. Sample Y holds water for 35 minutes, becoming sticky and cracking upon drying. Identify X and Y.',
    options: [
      'X = Clayey Soil, Y = Sandy Soil',
      'X = Sandy Soil (Thar Desert), Y = Clayey Soil (River Delta)',
      'X = Loamy Soil, Y = Gravel',
      'X = Humus, Y = Sandstone',
    ],
    correctIndex: 1,
    explanation: 'Sandy soil has large particles, large pore spaces, and high percolation (drains fast). Clayey soil has micro-particles that bind water tightly, turning sticky and cracking when dehydrated.',
    hints: [
      'Gritty + fast draining = Sand.',
      'Sticky + high water retention + cracking = Clay.',
      'X is Sandy Soil; Y is Clayey Soil.',
    ],
  },
  // 15. Forest Types of India (c6_evs_008) - Match (Foundation - Recall)
  {
    id: 'ch_15',
    nodeId: NODE_C6_EVS_008,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the Indian forest type with its signature climate adaptation and timber tree.',
    options: [
      'Tropical Evergreen (>200cm rain) → Dense multi-tier canopy, Rosewood & Mahogany',
      'Tropical Deciduous (70-200cm rain) → Sheds leaves in dry season, Teak & Sal',
      'Thorn & Scrub (<70cm rain) → Spines and deep taproots, Acacia & Babool',
      'All of the above are correctly matched pairs',
    ],
    correctIndex: 3,
    explanation: 'All three represent major Indian forest biomes matched with their exact rainfall zones and characteristic hardwood/xerophytic species.',
    hints: [
      'Evergreen has heavy rain (>200cm) and hardwoods like rosewood.',
      'Deciduous (monsoon forest) sheds leaves to save water (Teak/Sal).',
      'All options listed are accurate CISCE textbook pairings.',
    ],
  },
  // 16. Mangrove Breathing Roots (c6_evs_008) - Classify (Standard - Understanding)
  {
    id: 'ch_16',
    nodeId: NODE_C6_EVS_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Sundari trees in the Sundarbans develop vertical upward-growing roots called pneumatophores. What critical abiotic challenge does this overcome?',
    options: [
      'Intense desert heat causing stem burning.',
      'Lack of oxygen in waterlogged, salty coastal marsh mud.',
      'Heavy snowfall crushing forest branches.',
      'Excessive nitrogen gas in the clouds.',
    ],
    correctIndex: 1,
    explanation: 'Waterlogged marsh mud has almost zero dissolved oxygen. Mangroves send pneumatophores (breathing roots) up into the air above the high-tide level to exchange respiratory gases.',
    hints: [
      'Coastal delta soils are submerged in water and silt.',
      'Roots need oxygen to respire.',
      'Pneumatophores rise above muddy salt water to take in atmospheric oxygen.',
    ],
  },
  // 17. Wildlife Protected Areas Distinction (c6_evs_009) - Distinguish (Standard - Analysis)
  {
    id: 'ch_17',
    nodeId: NODE_C6_EVS_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does Jim Corbett National Park differ fundamentally in legal restriction from Periyar Wildlife Sanctuary?',
    options: [
      'Sanctuaries allow full industrial mining; National Parks allow timber logging.',
      'National Parks strictly protect both flora and fauna with minimal human activity; Sanctuaries focus on faunal protection with regulated grazing/eco-tourism.',
      'Sanctuaries are managed by private corporations; National Parks by foreign zoos.',
      'National Parks protect only fish; Sanctuaries protect birds.',
    ],
    correctIndex: 1,
    explanation: 'National Parks have the highest legal conservation status protecting entire habitats (flora + fauna), whereas Wildlife Sanctuaries focus on protecting animal species while permitting limited traditional rights.',
    hints: [
      'Look at what is protected: fauna only vs complete ecosystem (flora + fauna).',
      'National Parks impose stricter restrictions on human interference.',
      'National Parks protect flora & fauna strictly; sanctuaries protect fauna with limited human use.',
    ],
    misconceptionIndex: 4,
  },
  // 18. Conservation Project Tiger (c6_evs_009) - Numeric (Foundation - Recall)
  {
    id: 'ch_18',
    nodeId: NODE_C6_EVS_009,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In which milestone year was India’s flagship conservation initiative "Project Tiger" launched to protect the Bengal Tiger?',
    correctAnswer: 1973,
    tolerance: 0,
    unit: 'Year',
    explanation: 'Project Tiger was launched in 1973 by the Government of India, establishing dedicated reserves that revived tiger counts from ~1,800 to over 3,000 today.',
    hints: [
      'It occurred in the early 1970s.',
      'Project Elephant was 1992; Project Tiger was 19 years earlier.',
      'Launched in the year 1973.',
    ],
  },
  // 19. Agriculture Types Classification (c6_evs_010) - Classify (Foundation - Understanding)
  {
    id: 'ch_19',
    nodeId: NODE_C6_EVS_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A farmer in Punjab grows wheat on 20 acres, keeps 8 dairy cows, and fertilizes his crop fields using cow dung manure. Which farming system is this?',
    options: [
      'Subsistence Shifting Cultivation',
      'Mixed Farming (Crops + Livestock integration)',
      'Commercial Monoculture Plantation',
      'Nomadic Herding',
    ],
    correctIndex: 1,
    explanation: 'Mixed farming integrates crop cultivation with animal husbandry on the same agricultural holding, providing dual income streams and closed-loop nutrient recycling through manure.',
    hints: [
      'The farm combines both plant crops and livestock animals.',
      'Waste from animals enriches the fields.',
      'This integration of crops and cattle is termed Mixed Farming.',
    ],
  },
  // 20. Kharif vs Rabi Cropping Seasons (c6_evs_010) - Drag Label (Standard - Application)
  {
    id: 'ch_20',
    nodeId: NODE_C6_EVS_010,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Map the major Indian staple crops to their exact seasonal cropping cycle.',
    dragItems: [
      { label: 'Rice (Paddy)', targetId: 'slot_kharif1' },
      { label: 'Cotton', targetId: 'slot_kharif2' },
      { label: 'Wheat', targetId: 'slot_rabi1' },
      { label: 'Mustard', targetId: 'slot_rabi2' },
    ],
    correctMapping: {
      slot_kharif1: 'Rice (Paddy)',
      slot_kharif2: 'Cotton',
      slot_rabi1: 'Wheat',
      slot_rabi2: 'Mustard',
    },
    explanation: 'Kharif crops (Rice, Cotton, Maize) are monsoon-sown (June-July) and autumn-harvested. Rabi crops (Wheat, Mustard, Gram) are winter-sown (Oct-Nov) and spring-harvested.',
    hints: [
      'Rice and Cotton need heavy monsoon rains (Kharif).',
      'Wheat and Mustard grow during the cool northern winter (Rabi).',
      'Kharif: Rice, Cotton. Rabi: Wheat, Mustard.',
    ],
  },
  // 21. Food Security 3 Pillars (c6_evs_010) - Construct (Advanced - Evaluation)
  {
    id: 'ch_21',
    nodeId: NODE_C6_EVS_010,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Assemble the THREE indispensable pillars that define true Food Security according to national policy.',
    availableParts: ['Availability', 'Over-Fertilization', 'Accessibility', 'Affordability', 'Export Subsidies'],
    targetState: 'Availability Accessibility Affordability',
    validationHint: 'Select the 3 universal core pillars (Availability, Accessibility, Affordability).',
    explanation: 'National food security requires: 1) Availability (sufficient production), 2) Accessibility (reaches all regions/people), and 3) Affordability (purchasable by all citizens).',
    hints: [
      'Food must be produced, physically reachable, and reasonably priced.',
      'Think of the 3 "A"s of food security.',
      'Availability + Accessibility + Affordability.',
    ],
  },
  // 22. Environmental Policy & Soil Conservation (c6_evs_007) - Classify (Advanced - Analysis)
  {
    id: 'ch_22',
    nodeId: NODE_C6_EVS_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On the steep slopes of Tehri Garhwal (Uttarakhand), which combination of sustainable practices best prevents devastating topsoil runoff?',
    options: [
      'Clear-felling tree canopy and running cattle downhill.',
      'Terrace farming along hillsides combined with Contour Ploughing and Afforestation.',
      'Spraying heavy chemical insecticides and flood irrigation.',
      'Paving hillsides in solid concrete slabs.',
    ],
    correctIndex: 1,
    explanation: 'Terrace farming breaks steep slopes into flat steps to slow runoff, contour ploughing traps water along hillside curves, and afforestation root systems anchor the topsoil.',
    hints: [
      'Water speeds downhill; steps and horizontal furrows slow it down.',
      'Roots bind loose earth particles together.',
      'Terrace farming + Contour ploughing + Afforestation.',
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
  nodeId: NODE_C6_EVS_001,
  title: 'Environmental Systems: Biotic & Abiotic Balance',
  definition: 'The environment comprises interacting living (biotic: producers, consumers, decomposers) and non-living (abiotic: sunlight, air, water, soil, minerals) components that sustain global ecosystems.',
  eli5: 'Think of Earth as a self-running spaceship: plants cook food using sunlight and rain, animals eat food and breathe, decomposers recycle trash back to soil, and everything stays in balance!',
  misconceptions: [
    {
      misconception: 'Soil itself is biotic because organisms crawl in it.',
      correction: 'Soil particles are abiotic weathered minerals; only the organisms, roots, and microbes dwelling within it are biotic.',
    },
    {
      misconception: 'The food chain arrows point from the eater to what is eaten.',
      correction: 'Food chain arrows point in the direction of energy flow (from food to consumer: Grass → Deer → Tiger).',
    },
    {
      misconception: 'A whale is a fish because it swims in oceans.',
      correction: 'Whales are warm-blooded mammals that breathe air with lungs and nurse their offspring with milk.',
    },
    {
      misconception: 'Renewable resources can never run out regardless of usage.',
      correction: 'Renewables can be exhausted locally if overused faster than renewal rates (e.g., groundwater depletion, deforestation).',
    },
    {
      misconception: 'Sanctuaries and National Parks have identical legal rules.',
      correction: 'National Parks strictly preserve all flora and fauna with minimal human entry, whereas Sanctuaries protect fauna with regulated traditional use.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which of the following is an abiotic component?', options: ['Fungi', 'Nitrogen gas in air', 'Earthworm', 'Banyan tree'], correctIndex: 1 },
    { question: 'What is the primary role of decomposers in an ecosystem?', options: ['Make sugar from sunlight', 'Recycle nutrients to soil', 'Hunt herbivores', 'Produce oxygen'], correctIndex: 1 },
    { question: 'Which animal is an amphibian?', options: ['Turtle', 'Rohu fish', 'Frog', 'Crocodile'], correctIndex: 2 },
    { question: 'Which fossil fuel was formed from ancient buried swamp plants?', options: ['Coal', 'Petroleum', 'Solar energy', 'Biogas'], correctIndex: 0 },
    { question: 'How much water can a single leaking tap waste per day?', options: ['1 litre', '5 litres', 'Up to 30 litres', '100 litres'], correctIndex: 2 },
    { question: 'What is the proportion of Oxygen in dry atmospheric air?', options: ['78%', '21%', '0.04%', '1%'], correctIndex: 1 },
    { question: 'What is the dark organic component of fertile soil called?', options: ['Silt', 'Gravel', 'Humus', 'Clay'], correctIndex: 2 },
    { question: 'Which Indian national park protects the One-horned Rhinoceros?', options: ['Gir', 'Kaziranga', 'Corbett', 'Sundarbans'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates comprehensive understanding of biotic/abiotic interactions, ecosystem energy flows, resource conservation, soil/water dynamics, and Indian biodiversity reserves.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Biotic & Abiotic Balance',
    instruction: 'Adjust Sunlight and Water sliders to see how producers thrive and release oxygen!',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_EVS_001,
  },
  {
    title: 'Ecosystem Energy Flow',
    instruction: 'Click each organism in the trophic chain to observe energy transfer from Sun to Apex Predator.',
    interactionType: 'click-parts',
    nodeId: NODE_C6_EVS_002,
  },
  {
    title: 'Soil Percolation & Layers',
    instruction: 'Change Soil Type (Sand vs Clay vs Loam) to see water drainage and crop health in real-time.',
    interactionType: 'soil-percolation',
    nodeId: NODE_C6_EVS_007,
  },
  {
    title: 'Forest Biomes of India',
    instruction: 'Vary the Annual Rainfall slider to observe the forest transition from Thorn Desert to Tropical Rain Forest.',
    interactionType: 'forest-biome',
    nodeId: NODE_C6_EVS_008,
  },
  {
    title: 'Cropping Seasons: Kharif vs Rabi',
    instruction: 'Toggle seasons (Monsoon vs Winter) to match temperature, sowing schedules, and harvest cycles.',
    interactionType: 'crop-season',
    nodeId: NODE_C6_EVS_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If annual rainfall drops below 70 cm in Western Rajasthan, what forest type will dominate?',
    options: ['Dense Evergreen Rain Forest', 'Thorn & Scrub with spiny leaves and deep taproots', 'Mangrove Forest with breathing roots', 'Montane Alpine Meadows'],
    correctIndex: 1,
    verifyInstruction: 'Drag the Rainfall slider below 70 cm on the Forest Biome lab to test your hypothesis!',
    nodeId: NODE_C6_EVS_008,
  },
  {
    question: 'Predict: If groundwater is extracted at 3x the annual monsoon recharge rate in Punjab, what happens?',
    options: ['The water table drops rapidly, drying out shallow tube wells', 'Ocean water fills local freshwater wells instantly', 'Soil permanently turns into limestone rock', 'Rainfall increases by 200%'],
    correctIndex: 0,
    verifyInstruction: 'Observe the aquifer level gauge in the Sandbox as pumping increases!',
    nodeId: NODE_C6_EVS_005,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the Loamy Soil percolation test compared to pure Sand?',
    observableOptions: [
      'Loam lets 100% water rush through in 2 seconds like a sieve.',
      'Loam drains excess water steadily while holding ample moisture and humus for roots.',
      'Loam blocks all water, turning completely rock hard.',
      'Loam releases toxic fumes.',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_EVS_007,
  },
  {
    question: 'What happens to the Ecosystem stability gauge when producers receive both optimal sunlight and water?',
    observableOptions: [
      'Producers wither away.',
      'Biomass production peaks and energy safely flows upward to herbivores and carnivores.',
      'Decomposers immediately die out.',
      'Atmospheric oxygen drops to zero.',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_EVS_002,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be an Eco-Auditor in Your Neighborhood',
  description: 'Conduct a real-world environmental sustainability audit of your home or school campus.',
  steps: [
    'Check all water taps for leaks (a single drip wastes up to 30 litres/day; calculate total waste).',
    'Identify 3 biotic organisms (e.g., Neem tree, sparrow, soil earthworm) and 3 abiotic factors (sunlight hours, soil texture, tap water pH).',
    'Set up a simple kitchen waste compost bin to recycle organic matter into dark, fertile humus for potted plants.',
    'Plant a native Indian sapling (Tulsi, Hibiscus, or Neem) and record weekly growth in your nature journal.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C6_EVSEnvironmentBioticAbioticSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── SUBJECT CONFIG ───
  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Studies', emoji: '🌿', color: 'emerald' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org style interactive states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Simulation Sliders & Interactive Controls
  const [sunlightLevel, setSunlightLevel] = useState(70); // 0 - 100%
  const [waterLevel, setWaterLevel] = useState(65); // 0 - 100%
  const [soilType, setSoilType] = useState<'sandy' | 'clayey' | 'loamy'>('loamy');
  const [rainfallAnnual, setRainfallAnnual] = useState(150); // 20 - 300 cm
  const [cropSeason, setCropSeason] = useState<'kharif' | 'rabi'>('kharif');
  const [groundwaterPumping, setGroundwaterPumping] = useState(40); // 0 - 100
  const [airPollutionIndex, setAirPollutionIndex] = useState(35); // 0 - 100
  const [activeTrophicNode, setActiveTrophicNode] = useState<string | null>('producer');
  const [decomposerActive, setDecomposerActive] = useState(true);

  // Adaptive difficulty & BKT state
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
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection State
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED ECOSYSTEM METRICS ───
  const ecosystemHealth = useMemo(() => {
    let score = (sunlightLevel * 0.35) + (waterLevel * 0.35);
    if (soilType === 'loamy') score += 20;
    else if (soilType === 'clayey') score += 10;
    else score += 5;
    if (decomposerActive) score += 10;
    score -= (airPollutionIndex * 0.25);
    return Math.max(5, Math.min(100, Math.round(score)));
  }, [sunlightLevel, waterLevel, soilType, decomposerActive, airPollutionIndex]);

  const activeForestName = useMemo(() => {
    if (rainfallAnnual > 200) return 'Tropical Evergreen Forest (Western Ghats & Sundarbans)';
    if (rainfallAnnual >= 70) return 'Tropical Deciduous Forest (Teak & Sal Woodlands)';
    return 'Thorn & Scrub Desert (Acacia, Babool & Cacti in Rajasthan)';
  }, [rainfallAnnual]);

  // ─── MOUNT MASTERY INITIALIZER ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATER ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner')
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

  // ─── CANVAS 2D ANIMATION EFFECT (PARTICLE RAIN & AIR PARTICLES) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.5 + Math.random() * 1.5,
      radius: 1 + Math.random() * 2,
    }));

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render atmosphere background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#022c22');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render drifting rain/air particles
      ctx.fillStyle = waterLevel > 50 ? '#38bdf8' : '#fbbf24';
      particles.forEach(p => {
        p.y += p.speed * (waterLevel / 50);
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Atmospheric balance bar text
      ctx.fillStyle = '#a7f3d0';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(`🌿 Ecosystem Dynamic Equilibrium: ${ecosystemHealth}%`, 14, 20);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [waterLevel, ecosystemHealth]);

  // ─── CALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction! Decomposers complete the nutrient cycle.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive environmental laboratory! Let us discover how nature stays balanced.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test extreme variables in the sandbox without any grading pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Get ready for ICSE competency challenges! Read carefully.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the control to check your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! Loam balances drainage and moisture.' : 'Notice how water moves through the soil texture.');
  }, []);

  const handleSunlightChange = useCallback((val: number) => {
    setSunlightLevel(val);
    audioManager.play('count');
  }, []);

  const handleWaterChange = useCallback((val: number) => {
    setWaterLevel(val);
    audioManager.play('count');
  }, []);

  const handleRainfallChange = useCallback((val: number) => {
    setRainfallAnnual(val);
    if (predictionMade && !predictionVerified) setPredictionVerified(true);
    audioManager.play('count');
  }, [predictionMade, predictionVerified]);

  const handleSoilSelect = useCallback((type: 'sandy' | 'clayey' | 'loamy') => {
    setSoilType(type);
    audioManager.play('tap');
  }, []);

  const handleTrophicClick = useCallback((nodeKey: string) => {
    setActiveTrophicNode(nodeKey);
    audioManager.play('pop');
    const descriptions: Record<string, string> = {
      producer: 'Producers (Neem, Grass, Algae) convert solar energy into glucose via photosynthesis.',
      herbivore: 'Herbivores (Deer, Grasshopper) feed directly on producers to gain energy.',
      carnivore: 'Carnivores (Frogs, Snakes) eat herbivores, transferring energy up the food chain.',
      top: 'Apex Predators (Tiger, Eagle) sit atop the food web controlling lower populations.',
      decomposer: 'Decomposers (Fungi, Bacteria) recycle dead biomass into soil minerals for plants.',
    };
    speechManager.speak(descriptions[nodeKey] || '');
  }, []);

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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding achievement! You have mastered Environmental Systems.');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant deduction.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us study the complete scientific explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isSlotCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isSlotCorrect) {
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
      let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700/50">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-emerald-400 font-semibold tracking-wide">ICSE Class 6 EVS • Core Biosphere Simulator</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
          <span className="text-xs font-medium bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">
            Node: {nodeId}
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/60">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-1 uppercase tracking-wider">
              <span>🌟</span> Field Expedition Briefing
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-400/90 mt-3 font-medium bg-emerald-900/30 p-2.5 rounded-xl border border-emerald-700/30">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
            <h3 className="text-base font-bold text-amber-300 mb-3 flex items-center gap-2">
              <span>🔍 Curiosity Discovery Question:</span>
            </h3>
            <p className="text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/40 text-slate-500 border border-slate-700'
                      : 'bg-slate-900/90 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-emerald-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Decomposers break down dead biomass to return nutrients to soil.' : '💡 ' + DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2 text-sm"
                >
                  Enter Interactive Laboratory →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Step Indicator */}
          <div className="flex items-center justify-between px-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-800/40 flex items-center gap-2">
            <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-inner"
            >
              {/* SLIDE 0: Biotic & Abiotic Solar Laboratory */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>☀️ Abiotic Sunlight Energy:</span>
                        <span className="text-amber-400">{sunlightLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={sunlightLevel}
                        onChange={e => handleSunlightChange(Number(e.target.value))}
                        aria-label="Set sunlight level"
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>💧 Abiotic Water Supply:</span>
                        <span className="text-cyan-400">{waterLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={waterLevel}
                        onChange={e => handleWaterChange(Number(e.target.value))}
                        aria-label="Set water supply level"
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* SVG Living Plant & Photosynthesis Engine */}
                  <div className="bg-gradient-to-b from-sky-950/60 to-slate-900 p-4 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-lg">
                      {/* Sun Representation */}
                      <motion.circle
                        cx="70"
                        cy="50"
                        r={20 + sunlightLevel * 0.15}
                        fill="#f59e0b"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <text x="70" y="55" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle">SUN</text>

                      {/* Solar Rays */}
                      <line x1="95" y1="65" x2="220" y2="120" stroke="#fcd34d" strokeWidth={1 + sunlightLevel * 0.03} strokeDasharray="4" />

                      {/* Soil Surface */}
                      <rect x="50" y="180" width="400" height="50" rx="6" fill="#451a03" />
                      <text x="250" y="210" fill="#a16207" fontSize="12" textAnchor="middle" fontWeight="bold">Fertile Topsoil Horizon (Abiotic Minerals + Humus)</text>

                      {/* Plant Stem & Foliage */}
                      <line x1="250" y1="180" x2="250" y2="100" stroke="#16a34a" strokeWidth="6" />
                      <motion.circle
                        cx="250"
                        cy="90"
                        r={15 + (sunlightLevel + waterLevel) * 0.18}
                        fill="#22c55e"
                        stroke="#15803d"
                        strokeWidth="2"
                      />
                      <text x="250" y="93" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Producer (Neem)</text>

                      {/* Photosynthesis Gas Arrows */}
                      <text x="170" y="110" fill="#38bdf8" fontSize="10">CO₂ (0.04%) In</text>
                      <text x="310" y="110" fill="#4ade80" fontSize="10">O₂ (21%) Out</text>
                      <line x1="170" y1="115" x2="220" y2="105" stroke="#38bdf8" strokeWidth="1.5" />
                      <line x1="280" y1="105" x2="330" y2="115" stroke="#4ade80" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">O₂ Production</p>
                      <p className="text-base font-bold text-emerald-400">{Math.round((sunlightLevel + waterLevel) * 0.65)} mL/hr</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Nutrient Uptake</p>
                      <p className="text-base font-bold text-cyan-400">{waterLevel > 30 ? 'High' : 'Stunted'}</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Biotic Status</p>
                      <p className="text-base font-bold text-lime-400">{sunlightLevel > 20 && waterLevel > 20 ? 'Thriving' : 'Wilting'}</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Equilibrium</p>
                      <p className="text-base font-bold text-amber-400">{ecosystemHealth}%</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Trophic Food Web & Energy Flow */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">Click any level in this trophic chain to inspect its ecological function and energy transfer:</p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'producer', label: '1. Producer', name: 'Grass & Algae', color: 'emerald' },
                      { id: 'herbivore', label: '2. Herbivore', name: 'Deer / Grasshopper', color: 'lime' },
                      { id: 'carnivore', label: '3. Carnivore', name: 'Frog / Snake', color: 'amber' },
                      { id: 'top', label: '4. Apex Predator', name: 'Royal Bengal Tiger', color: 'rose' },
                      { id: 'decomposer', label: '5. Decomposer', name: 'Soil Bacteria/Fungi', color: 'cyan' },
                    ].map(node => (
                      <motion.button
                        key={node.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTrophicClick(node.id)}
                        aria-label={`Inspect ${node.label}`}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          activeTrophicNode === node.id
                            ? 'bg-slate-800 border-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-400">{node.label}</p>
                        <p className="text-sm font-bold text-white truncate">{node.name}</p>
                        <p className="text-[10px] text-emerald-400 mt-1">Energy: {node.id === 'producer' ? '10,000 kJ' : node.id === 'herbivore' ? '1,000 kJ' : node.id === 'carnivore' ? '100 kJ' : node.id === 'top' ? '10 kJ' : 'Recycles'}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <h4 className="text-sm font-bold text-emerald-300 mb-1">Trophic Interaction Breakdown:</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeTrophicNode === 'producer' && 'Producers fix solar radiation into biochemical chemical bonds via chlorophyll. They form the foundational energy base of every ecosystem.'}
                      {activeTrophicNode === 'herbivore' && 'Herbivores consume producers. They transfer plant biomass to primary animal biomass, keeping plant overgrowth in balance.'}
                      {activeTrophicNode === 'carnivore' && 'Secondary consumers prey upon herbivores, regulating herbivore populations so grasslands are not overgrazed into deserts.'}
                      {activeTrophicNode === 'top' && 'Apex predators like Tigers in Corbett maintain holistic ecological balance by curbing disease and overpopulation across all lower trophic levels.'}
                      {activeTrophicNode === 'decomposer' && 'Decomposers (bacteria and saprophytic fungi) secrete digestive enzymes to dissolve dead organic tissues externally, returning nitrates, phosphates, and minerals back to the abiotic soil.'}
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Soil Percolation Lab */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(['sandy', 'clayey', 'loamy'] as const).map(type => (
                      <motion.button
                        key={type}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSoilSelect(type)}
                        aria-label={`Select ${type} soil`}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
                          soilType === type
                            ? 'bg-amber-600 text-white shadow-lg shadow-amber-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {type} Soil {type === 'loamy' ? '(Punjab Plains)' : type === 'sandy' ? '(Thar Desert)' : '(Delta Clay)'}
                      </motion.button>
                    ))}
                  </div>

                  {/* Soil Cross Section SVG */}
                  <div className="flex justify-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 180" className="w-full max-w-md">
                      {/* Funnel */}
                      <polygon points="120,20 280,20 230,100 170,100" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                      <rect x="185" y="100" width="30" height="25" fill="#334155" />

                      {/* Soil inside Funnel */}
                      <polygon
                        points="135,30 265,30 220,95 180,95"
                        fill={soilType === 'sandy' ? '#d97706' : soilType === 'clayey' ? '#7c2d12' : '#3f2e18'}
                      />
                      <text x="200" y="65" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                        {soilType.toUpperCase()}
                      </text>

                      {/* Beaker Below */}
                      <rect x="150" y="130" width="100" height="45" rx="4" fill="none" stroke="#64748b" strokeWidth="2" />
                      <rect
                        x="152"
                        y={soilType === 'sandy' ? 140 : soilType === 'clayey' ? 168 : 152}
                        width="96"
                        height={soilType === 'sandy' ? 33 : soilType === 'clayey' ? 5 : 21}
                        fill="#38bdf8"
                        opacity="0.8"
                      />
                      <text x="200" y="155" fill="#ffffff" fontSize="9" textAnchor="middle">
                        Drained: {soilType === 'sandy' ? '90 mL (2s)' : soilType === 'clayey' ? '15 mL (30m)' : '50 mL (10m)'}
                      </text>
                    </svg>
                  </div>

                  {/* Observation hook */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-amber-300 mb-2">Observation Question: {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Option: ${opt}`}
                            className="w-full text-left p-2.5 rounded-lg bg-slate-800 text-slate-200 text-xs hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 3: Forest Biomes & Rainfall */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* Predict-Then-Check */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800 mb-2">
                      <p className="text-xs font-bold text-indigo-300 mb-1">Scientific Prediction Challenge:</p>
                      <p className="text-sm font-semibold text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction: ${opt}`}
                            className="p-2.5 text-left bg-slate-800 text-xs rounded-lg text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <p className="text-xs text-amber-300 bg-amber-950/40 p-2 rounded-lg border border-amber-800/40">
                      {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </p>
                  )}

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>🌧️ Annual Monsoon Rainfall (cm):</span>
                      <span className="text-cyan-400 font-extrabold">{rainfallAnnual} cm/year</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={300}
                      value={rainfallAnnual}
                      onChange={e => handleRainfallChange(Number(e.target.value))}
                      aria-label="Set annual monsoon rainfall"
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Current Biome Classification:</p>
                    <h3 className="text-base font-black text-white mt-1">{activeForestName}</h3>
                    <p className="text-xs text-slate-400 mt-2">
                      {rainfallAnnual > 200
                        ? 'Features multi-layered canopy blocking direct floor sunlight. Yields valuable Rosewood, Mahogany, Rubber, and Sundari mangroves.'
                        : rainfallAnnual >= 70
                        ? 'Monsoon deciduous forest! Trees shed foliage during dry winter/spring to halt transpiration. Home to Teak, Sal, and Sandalwood.'
                        : 'Xerophytic vegetation with thick bark, deep taproots, and leaves reduced to thorns to cut transpiration. Acacia, Babool, and Khair.'}
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Cropping Seasons & Food Security */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setCropSeason('kharif'); audioManager.play('tap'); }}
                      aria-label="Switch to Kharif cropping season"
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        cropSeason === 'kharif' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      🌾 Kharif Season (Monsoon: June - Oct)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setCropSeason('rabi'); audioManager.play('tap'); }}
                      aria-label="Switch to Rabi cropping season"
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        cropSeason === 'rabi' ? 'bg-amber-600 text-white shadow-lg shadow-amber-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      ❄️ Rabi Season (Winter: Oct - April)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-xs font-bold text-emerald-400">Cropping Sowing & Harvest Schedule:</p>
                      <p className="text-sm font-semibold text-white mt-1">
                        {cropSeason === 'kharif' ? 'Sown in June-July with Monsoon rains • Harvested Sept-Oct' : 'Sown in Oct-Nov with onset of winter • Harvested March-April'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <p className="text-xs font-bold text-cyan-400">Key Indian Staple Crops:</p>
                      <p className="text-sm font-semibold text-white mt-1">
                        {cropSeason === 'kharif' ? 'Paddy (Rice), Cotton, Maize, Jowar, Groundnut' : 'Wheat, Barley, Mustard, Gram, Peas'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('tap'); }}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('tap'); }}
                aria-label="Next slide"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter Free Sandbox Mode"
                className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-black rounded-xl shadow-lg shadow-teal-950"
              >
                Open Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (Free Exploration) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <h2 className="text-xl font-black text-emerald-300">Free Biosphere Exploration Sandbox</h2>
            <p className="text-xs text-slate-400 mt-1">
              Adjust multiple environmental variables simultaneously without any evaluation. Watch real-time multi-representation updates!
            </p>
          </div>

          <canvas ref={canvasRef} width={600} height={40} className="w-full rounded-xl border border-slate-800 shadow" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>☀️ Sunlight:</span>
                <span className="text-amber-400">{sunlightLevel}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={sunlightLevel}
                onChange={e => handleSunlightChange(Number(e.target.value))}
                aria-label="Sandbox sunlight slider"
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>💧 Rainfall/Water:</span>
                <span className="text-cyan-400">{waterLevel}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={waterLevel}
                onChange={e => handleWaterChange(Number(e.target.value))}
                aria-label="Sandbox water slider"
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                <span>🏭 Air Pollution Index:</span>
                <span className="text-rose-400">{airPollutionIndex}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={airPollutionIndex}
                onChange={e => { setAirPollutionIndex(Number(e.target.value)); audioManager.play('count'); }}
                aria-label="Sandbox air pollution slider"
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Computed Overall Biosphere Health:</p>
              <p className="text-lg font-black text-emerald-400">{ecosystemHealth}% - {ecosystemHealth > 75 ? 'Optimal Equilibrium' : ecosystemHealth > 45 ? 'Moderate Strain' : 'Severe Degradation'}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for challenges"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-950"
            >
              Start Graded Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span className="text-emerald-400 capitalize">Competency: {challenge.competencyLevel}</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-950 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-md font-mono text-cyan-300 border border-slate-700">
                {challenge.nodeId}
              </span>
              <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-md font-semibold text-emerald-300 border border-slate-700">
                {challenge.type.toUpperCase()}
              </span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug">
              {challenge.question}
            </h3>

            {/* MCQ Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/80 border-2 border-emerald-400 text-emerald-100 shadow-lg'
                        : 'bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 self-center mr-2">Draggable Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      aria-label={`Draggable item: ${item.label}`}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(slotId => (
                    <div
                      key={slotId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-4 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <span className="text-[11px] font-bold text-slate-400 uppercase">{slotId.replace('_', ' ')}</span>
                      <span className="text-sm font-black text-emerald-300 mt-1">
                        {droppedLabels[slotId] || 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  aria-label="Validate mapped labels"
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify All Slots →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag/reorder elements into the accurate ecological order:</p>
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
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      aria-label={`Sort item: ${item}`}
                      className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs font-semibold cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit sorted sequence"
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Numeric answer input"
                    className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric calculation"
                    className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check Answer →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-medium">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (!constructParts.includes(part)) {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('pop');
                        }
                      }}
                      aria-label={`Add component ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-900/80 border border-emerald-600 text-emerald-200 text-xs rounded-lg flex items-center gap-2">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                        aria-label={`Remove ${part}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click building blocks above to assemble your answer</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Submit assembled components"
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Assembly →
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-700/60 rounded-xl space-y-3"
              >
                <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <span>💡</span> Step-by-Step Scientific Explanation:
                </h4>

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
                      <span className="font-bold text-emerald-400 mr-1.5">{i + 1}.</span>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next explanation step"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to next challenge"
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Expedition →' : 'Continue to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950 to-slate-900 rounded-2xl border border-emerald-700 text-center space-y-3">
            <h2 className="text-3xl font-black text-white">🎉 Simulation Complete!</h2>
            <p className="text-emerald-300 font-bold text-lg">Final Score: {Math.max(0, 100 - errors * 5)}%</p>
            <p className="text-slate-400 text-xs">Mastery Rating: <span className="text-white font-bold uppercase">{masteryLevel}</span></p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700">
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered all 10 ICSE Environmental science concepts with flawless understanding.'
                : errors <= 3
                ? '✨ Excellent performance! You demonstrate strong competency in ecosystem dynamics and Indian resource conservation.'
                : errors <= 6
                ? '👍 Good progress! Every mistake strengthens your analytical understanding. Review your misconception profile below.'
                : '🌱 Knowledge grows with practice. Revisit the interactive labs, test variables in the sandbox, and try again!'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-slate-800/90 rounded-xl border border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>💭</span> Reflection & Metacognition
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-700/60">
                <p className="text-xs font-bold text-amber-300 mb-1.5">1. What was the most surprising thing you learned?</p>
                <textarea
                  value={reflection1}
                  onChange={e => setReflection1(e.target.value)}
                  placeholder="Type your thoughts here..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  rows={2}
                />
              </div>
              <div className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-700/60">
                <p className="text-xs font-bold text-cyan-300 mb-1.5">2. How would you explain this to a friend?</p>
                <textarea
                  value={reflection2}
                  onChange={e => setReflection2(e.target.value)}
                  placeholder="How would you explain biotic/abiotic interdependence simply?"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  rows={2}
                />
              </div>
              <div className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-700/60">
                <p className="text-xs font-bold text-emerald-300 mb-1.5">3. Where in real life might you use this?</p>
                <textarea
                  value={reflection3}
                  onChange={e => setReflection3(e.target.value)}
                  placeholder="Connect this knowledge to your garden, home water use, or community..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Misconceptions to Clarify:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 border border-rose-900/40 rounded-lg text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">❌ {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/40">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">📅 Spaced Repetition Schedule</h4>
            <p className="text-xs text-slate-300">
              Based on your score, review this module in{' '}
              <span className="text-amber-300 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span> to consolidate long-term memory.
            </p>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-5 bg-indigo-950/50 rounded-xl border border-indigo-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_EVSEnvironmentBioticAbioticSim;
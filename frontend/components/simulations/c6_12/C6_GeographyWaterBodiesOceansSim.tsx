'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
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

// ─── NODE IDS ───
const NODE_C6_GEO_011 = 'c6_geo_011'; // Water bodies — oceans
const NODE_C6_GEO_012 = 'c6_geo_012'; // Water bodies — rivers
const NODE_C6_GEO_013 = 'c6_geo_013'; // Agriculture — introduction
const NODE_C6_GEO_014 = 'c6_geo_014'; // Minerals — introduction
const NODE_C6_GEO_015 = 'c6_geo_015'; // North America — location & boundaries
const NODE_C6_GEO_016 = 'c6_geo_016'; // North America — physical features
const NODE_C6_GEO_017 = 'c6_geo_017'; // South America — location & boundaries
const NODE_C6_GEO_018 = 'c6_geo_018'; // South America — physical features

const ALL_NODE_IDS = [
  NODE_C6_GEO_011,
  NODE_C6_GEO_012,
  NODE_C6_GEO_013,
  NODE_C6_GEO_014,
  NODE_C6_GEO_015,
  NODE_C6_GEO_016,
  NODE_C6_GEO_017,
  NODE_C6_GEO_018,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Continental & Oceanic Survey',
  intro: 'You are the Chief Geographer on an international scientific expedition. From the deepest abyss of the Mariana Trench to the heights of the Andes, your mission is to survey Earth’s water bodies, agricultural belts, mineral storehouses, and the physical architecture of the Americas.',
  context: '8 major geographic realms await your investigation. Master physical relief, hydrological flows, crop seasons, and mineral geology to complete your global expedition report.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'If Mount Everest (8,848 m) were dropped into the Mariana Trench (~11,000 m deep), what would happen?',
  options: [
    'Its peak would poke out 2,000 m above sea level',
    'Its summit would still be submerged under over 2,000 m of water',
    'It would fill the trench completely to the surface',
    'The ocean water would boil from mantle heat instantly',
  ],
  correctIndex: 1,
  hintAfter: 'The ocean floor conceals canyons far deeper than the highest mountains on land! Let us explore why.',
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

// ─── 24 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE COMPLIANT) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1 to 8) ---
  {
    id: 'ch_geo_01',
    nodeId: NODE_C6_GEO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which ocean is the largest and deepest on Earth, containing the Mariana Trench?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    correctIndex: 2,
    explanation: 'The Pacific Ocean is the largest and deepest ocean, covering roughly one-third of the Earth and housing the Mariana Trench (~11,000 m).',
    hints: [
      'It covers roughly one-third of Earth’s surface.',
      'It washes the western coast of the Americas and eastern coast of Asia.',
      'Its name starts with "P" and means peaceful.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_geo_02',
    nodeId: NODE_C6_GEO_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are Himalayan rivers like the Ganga classified as perennial while Peninsular rivers like the Godavari are seasonal?',
    options: [
      'Himalayan rivers are fed by melting glaciers year-round; Peninsular rivers depend on monsoon rains',
      'Peninsular rivers flow through desert sands that swallow the water',
      'Himalayan rivers are artificial canals built by engineers',
      'Peninsular rivers only flow at night',
    ],
    correctIndex: 0,
    explanation: 'Perennial rivers (Ganga, Indus, Brahmaputra) receive continuous meltwater from Himalayan glaciers. Peninsular rivers (Godavari, Krishna, Narmada) rely solely on seasonal monsoon rainfall.',
    hints: [
      'Think about where the water comes from in summer when there is no rain.',
      'Glaciers melt continuously in the high Himalayas.',
      'Snow-fed equals perennial (year-round); rain-fed equals seasonal.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_geo_03',
    nodeId: NODE_C6_GEO_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is a classic Kharif crop sown with the arrival of the southwest monsoon (June–July)?',
    options: ['Wheat', 'Rice', 'Barley', 'Gram'],
    correctIndex: 1,
    explanation: 'Rice requires high temperatures (>25°C) and heavy rainfall (>100 cm), making it the quintessential Kharif crop sown in June–July.',
    hints: [
      'This crop needs flooded fields and tropical warmth.',
      'Wheat and barley are sown in winter (Rabi).',
      'It is India’s primary monsoon cereal crop.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_geo_04',
    nodeId: NODE_C6_GEO_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is Bauxite classified as a metallic mineral, whereas Mica is non-metallic?',
    options: [
      'Bauxite yields the metal aluminium on processing; Mica yields no metal and is an electrical insulator',
      'Mica is heavier than Bauxite',
      'Bauxite is mined only from riverbeds',
      'Mica is made in factories while Bauxite is natural',
    ],
    correctIndex: 0,
    explanation: 'Minerals are classified by their product: Bauxite is the ore that yields metallic aluminium. Mica contains no extractable metal and is used for heat and electrical insulation.',
    hints: [
      'Consider what valuable substance is extracted from bauxite ore.',
      'Aluminium is a metal extracted from bauxite.',
      'Mica’s shine is lustre, not metal content.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_geo_05',
    nodeId: NODE_C6_GEO_015,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the 4 primary boundary features of North America to their correct positions.',
    dragItems: [
      { label: 'Arctic Ocean', targetId: 'bound_north' },
      { label: 'Pacific Ocean', targetId: 'bound_west' },
      { label: 'Atlantic Ocean', targetId: 'bound_east' },
      { label: 'Isthmus of Panama', targetId: 'bound_south' },
    ],
    correctMapping: {
      bound_north: 'Arctic Ocean',
      bound_west: 'Pacific Ocean',
      bound_east: 'Atlantic Ocean',
      bound_south: 'Isthmus of Panama',
    },
    explanation: 'North America is bounded by the Arctic Ocean to the North, Pacific to the West, Atlantic to the East, and the narrow Isthmus of Panama to the South connecting to South America.',
    hints: [
      'The freezing polar ocean is at the top (North).',
      'The largest ocean is to the West (left).',
      'The southern boundary is a land link, not a sea.',
    ],
  },
  {
    id: 'ch_geo_06',
    nodeId: NODE_C6_GEO_016,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the Great Lakes of North America from West to East (using the mnemonic: Super Man Helps Every One).',
    sortItems: ['Lake Superior', 'Lake Michigan', 'Lake Huron', 'Lake Erie', 'Lake Ontario'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The Great Lakes run from West to East: Superior -> Michigan -> Huron -> Erie -> Ontario, draining out to the Atlantic via the St. Lawrence River.',
    hints: [
      'Start with the largest lake (Superior).',
      'The mnemonic is: Superior, Michigan, Huron, Erie, Ontario.',
      'Lake Ontario is furthest east, feeding the St. Lawrence River.',
    ],
  },
  {
    id: 'ch_geo_07',
    nodeId: NODE_C6_GEO_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the geographic shape of South America and where does the Equator cross it?',
    options: [
      'Inverted triangle; Equator passes through its northern portion (Ecuador, Colombia, Brazil)',
      'Perfect square; Equator passes through Cape Horn in the south',
      'Circular disk; Equator stays completely north outside the continent',
      'Crescent; Equator cuts through Argentina only',
    ],
    correctIndex: 0,
    explanation: 'South America is shaped like an inverted triangle (wide at top along Caribbean, tapering south to Cape Horn). The Equator passes through northern countries: Ecuador, Colombia, Brazil.',
    hints: [
      'It is broad in the north and tapers to a pointed tip in the south.',
      'Does South America sit only in the Southern Hemisphere, or straddle both?',
      'The northern portion is tropical and crossed by 0° latitude.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_geo_08',
    nodeId: NODE_C6_GEO_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which mountain range is the longest in the world, running ~7,000 km down the western coast of South America?',
    options: ['Rocky Mountains', 'Andes Mountains', 'Appalachian Mountains', 'Himalayas'],
    correctIndex: 1,
    explanation: 'The Andes Mountains form the longest continental mountain chain on Earth (~7,000 km), running along the entire Pacific margin of South America.',
    hints: [
      'These are young fold mountains along the Pacific coast of South America.',
      'They house Mount Aconcagua and Lake Titicaca.',
      'Starts with the letter "A".',
    ],
  },

  // --- STANDARD TIER (9 to 16) ---
  {
    id: 'ch_geo_09',
    nodeId: NODE_C6_GEO_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If ocean water covers 71% of Earth’s total surface (510 million km²), calculate the total water surface area in million km² (to the nearest whole number).',
    correctAnswer: 362,
    tolerance: 4,
    unit: 'million km²',
    explanation: '510 million km² × 0.71 = 362.1 million km² of ocean expanse, confirming Earth’s identity as the "Blue Planet".',
    hints: [
      'Multiply 510 by 0.71.',
      '510 × 70% is 357; add 1% (5.1).',
      '357 + 5.1 ≈ 362 million km².',
    ],
  },
  {
    id: 'ch_geo_10',
    nodeId: NODE_C6_GEO_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the Ganga form the world’s largest delta (Sundarbans) at the Bay of Bengal, while the Narmada forms an estuary in the Arabian Sea?',
    options: [
      'Ganga flows over flat plains carrying massive silt into calm seas; Narmada flows swiftly through rocky rift valleys into high-tidal seas',
      'Narmada has more water than the Ganga',
      'Ganga water is chemically frozen near the ocean',
      'Arabian Sea has no tides to wash silt away',
    ],
    correctIndex: 0,
    explanation: 'Deltas require low river gradient, heavy silt deposition, and calm coastal waters (Ganga). Estuaries occur where steep, rapid rivers drop straight into narrow, high-tidal bays that wash silt away (Narmada/Tapi).',
    hints: [
      'Consider the difference in slope and the amount of sediment carried.',
      'The Ganga meanders across thousands of kilometres of soft alluvial plains.',
      'The Narmada flows fast through a hard rock rift valley with strong tides at the mouth.',
    ],
  },
  {
    id: 'ch_geo_11',
    nodeId: NODE_C6_GEO_013,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A farmer in Punjab wishes to rotate crops across all three Indian agricultural seasons. Which sequence is scientifically correct?',
    options: [
      'Kharif: Rice (Monsoon) → Rabi: Wheat (Winter) → Zaid: Watermelon (Summer)',
      'Kharif: Wheat → Rabi: Rice → Zaid: Cotton',
      'Kharif: Barley → Rabi: Maize → Zaid: Mustard',
      'Kharif: Watermelon → Rabi: Jute → Zaid: Tea',
    ],
    correctIndex: 0,
    explanation: 'Kharif (June–Oct) matches water-intensive Rice; Rabi (Oct–April) matches cool-weather Wheat; Zaid (April–June) uses irrigation for quick summer crops like Watermelon/Cucumber.',
    hints: [
      'Rice requires monsoon warmth and flooding.',
      'Wheat grows during cool winter months and ripens in spring.',
      'Watermelon is a classic summer fruit grown before the rains.',
    ],
  },
  {
    id: 'ch_geo_12',
    nodeId: NODE_C6_GEO_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why are Jharkhand and Odisha known as the "Mineral Heartland" of India?',
    options: [
      'They lie on the ancient, crystalline Chota Nagpur Plateau rich in iron ore, coal, bauxite, and mica',
      'They have the highest rainfall in India which washes gold into streams',
      'They have active volcanoes that continually create fresh metal crystals',
      'All minerals in these states were imported from abroad',
    ],
    correctIndex: 0,
    explanation: 'The ancient crystalline shield rocks of the Chota Nagpur Plateau underwent extensive geological folding and mineral concentration over hundreds of millions of years, yielding coal (Jharia/Raniganj), iron ore, and bauxite.',
    hints: [
      'Look at the underlying landform: the Chota Nagpur Plateau.',
      'Ancient granite and metamorphic rocks hold deep mineral veins.',
      'Jharia has coal; Odisha has iron ore and bauxite.',
    ],
  },
  {
    id: 'ch_geo_13',
    nodeId: NODE_C6_GEO_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the westernmost longitudinal boundary of North America written as 172°E instead of a West longitude?',
    options: [
      'The Aleutian Islands of Alaska stretch so far west that they cross the 180° Antimeridian into the Eastern Hemisphere',
      'It was an ancient cartographic error that mapmakers never corrected',
      'North America rotates backwards during winter months',
      'Greenland pulls the continent coordinates across Greenwich',
    ],
    correctIndex: 0,
    explanation: 'Longitudes span 0° to 180°W and 180°E. The Aleutian chain (Alaska, USA) extends across the 180° meridian, placing its westernmost islands in the Eastern Hemisphere (172°E).',
    hints: [
      'Think about what line sits exactly opposite the Prime Meridian (0°).',
      'The 180° meridian divides East from West longitudes.',
      'The Aleutian Islands cross over this 180° line.',
    ],
  },
  {
    id: 'ch_geo_14',
    nodeId: NODE_C6_GEO_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Contrast the Rocky Mountains (west) with the Appalachian Mountains (east):',
    options: [
      'Rockies: Young, sharp, tall fold mountains; Appalachians: Ancient, low, eroded fold mountains',
      'Rockies: Volcanic islands; Appalachians: Glacial icebergs',
      'Rockies: Formed last year; Appalachians: Smooth coral reefs',
      'Both ranges are identical in height, age, and rock smoothness',
    ],
    correctIndex: 0,
    explanation: 'The Rockies are young fold mountains (high, rugged peaks, active tectonics). The Appalachians are ancient fold mountains worn down over hundreds of millions of years by weathering and erosion into gentle, rounded ridges.',
    hints: [
      'Both are fold mountains, but one is much older.',
      'Millions of years of rain and ice grind mountain summits down.',
      'Younger mountains retain sharp, snow-capped peaks.',
    ],
  },
  {
    id: 'ch_geo_15',
    nodeId: NODE_C6_GEO_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following correctly pairs the island group with its governing nation and location?',
    options: [
      'Galapagos Islands: Ecuador (Pacific Ocean); Falkland Islands: UK territory (South Atlantic Ocean)',
      'Galapagos Islands: Brazil (Atlantic Ocean); Falkland Islands: Chile (Pacific Ocean)',
      'Galapagos Islands: Colombia (Caribbean Sea); Falkland Islands: Argentina (Arctic Ocean)',
      'Galapagos Islands: Peru (Indian Ocean); Falkland Islands: USA (Antarctic)',
    ],
    correctIndex: 0,
    explanation: 'The Galapagos Islands belong to Ecuador in the Pacific (famed for Darwin’s finches/tortoises); the Falkland Islands lie in the South Atlantic (governed by UK, claimed by Argentina).',
    hints: [
      'Galapagos lies on the Equator in the Pacific Ocean.',
      'Charles Darwin studied wildlife in the Galapagos belonging to Ecuador.',
      'Falkland lies in the cold South Atlantic.',
    ],
  },
  {
    id: 'ch_geo_16',
    nodeId: NODE_C6_GEO_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the Atacama Desert on the western coast of South America the driest desert on Earth?',
    options: [
      'The towering Andes Mountains block moist Amazonian air (rain-shadow), reinforced by the cold Peru Current offshore',
      'The sun shines 24 hours a day with zero night time',
      'All rainwater is absorbed by volcanic lava before reaching the ground',
      'The Pacific Ocean has evaporated completely near Chile',
    ],
    correctIndex: 0,
    explanation: 'Moisture from the Atlantic is forced upwards by the Andes, dropping rain on the eastern Amazon slopes. Dry descending air creates a severe rain shadow on the west coast, compounded by the desiccating cold offshore Peru current.',
    hints: [
      'Think about the rain-shadow effect created by the 7,000 km Andean wall.',
      'Moist winds from the east dump all moisture on the Amazon rainforest side.',
      'Descending dry air on the western lee side brings no rain.',
    ],
  },

  // --- ADVANCED & COMPETENCY TIER (17 to 24) ---
  {
    id: 'ch_geo_17',
    nodeId: NODE_C6_GEO_011,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct the correct ocean floor cross-section sequence moving from the continent out to the deepest trench.',
    availableParts: ['Continental Shelf', 'Continental Slope', 'Abyssal Plain', 'Mid-Ocean Ridge', 'Ocean Trench'],
    targetState: 'Continental Shelf Continental Slope Abyssal Plain Mid-Ocean Ridge Ocean Trench',
    validationHint: 'Coastline → shallow sunlit shelf (<200m) → steep slope → flat deep floor → volcanic ridge → narrow deep chasm.',
    explanation: 'From the coast outward: Continental Shelf (<200m deep) → Continental Slope (steep descent) → Abyssal Plain (vast flat floor) → Mid-Ocean Ridge (volcanic chain) → Oceanic Trench (deep subduction zone).',
    hints: [
      'Start right at the beach where water is shallow.',
      'The steep drop follows the shelf.',
      'The flat plain lies before the central underwater mountain ridge.',
    ],
  },
  {
    id: 'ch_geo_18',
    nodeId: NODE_C6_GEO_012,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the 4 stages of river work from upper mountain course to final ocean mouth.',
    sortItems: [
      'Steep V-shaped valley erosion and waterfalls',
      'River widening, lateral erosion, and meandering',
      'Sluggish flow and heavy silt deposition on floodplains',
      'Distributary branching and delta formation at sea level',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Upper course: high energy, vertical erosion, V-shaped valleys; Middle course: meanders, lateral erosion; Lower course: deposition; Mouth: delta/estuary branching into the sea.',
    hints: [
      'Mountain rapids and waterfalls happen at the highest altitude.',
      'Meanders form on gentle middle slopes.',
      'Deposition dominates before the river splits into delta distributaries.',
    ],
  },
  {
    id: 'ch_geo_19',
    nodeId: NODE_C6_GEO_013,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the ecological and agricultural balance of the 1960s Green Revolution in India:',
    options: [
      'Achieved food self-sufficiency in wheat/rice, but caused groundwater depletion and soil salinity from chemical overuse',
      'It had zero positive impacts and reduced grain yields everywhere',
      'It doubled natural forest cover without requiring any tube-well irrigation',
      'It completely replaced all farming with industrial synthetic food capsules',
    ],
    correctIndex: 0,
    explanation: 'The Green Revolution introduced HYV seeds, chemical inputs, and canal/tube-well irrigation, making India food self-sufficient. However, over-irrigation in Punjab/Haryana caused water table collapse and chemical soil degradation.',
    hints: [
      'Consider both the huge positive grain harvest and the environmental costs.',
      'India stopped importing wheat, but tube-wells over-extracted groundwater.',
      'A balanced evaluation weighs grain abundance against soil/water stress.',
    ],
  },
  {
    id: 'ch_geo_20',
    nodeId: NODE_C6_GEO_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is mineral conservation critical for national economic security, and which 3-point strategy is most effective?',
    options: [
      'Minerals are finite and non-renewable: Recycling scrap metals + Substituting with composites + Reducing mining wastage',
      'Minerals regenerate every 5 years: Dig as fast as possible without limits',
      'Ban all steel production and dismantle all electric railways',
      'Dump all mineral scrap into deep ocean trenches to create artificial ores',
    ],
    correctIndex: 0,
    explanation: 'Minerals take millions of years of geological processes to form. Sustainable conservation requires the triad: Recycling (scrap iron/copper), Material Substitution (fly-ash bricks/plastics), and Waste Minimisation.',
    hints: [
      'Minerals cannot be grown like crops; once burnt or dispersed, they are lost.',
      'Look for the three R-principles of mineral management.',
      'Recycle, Substitute, and Minimise mining waste.',
    ],
  },
  {
    id: 'ch_geo_21',
    nodeId: NODE_C6_GEO_015,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Calculate the total latitudinal span of North America from Panama (7°N) to northern Greenland (84°N) in degrees.',
    correctAnswer: 77,
    tolerance: 0,
    unit: 'degrees',
    explanation: '84°N - 7°N = 77° of latitudinal spread. This massive 77° span explains why North America contains Tropical, Temperate, and Polar Frigid climate zones.',
    hints: [
      'Subtract the southern latitude (7°N) from the northern latitude (84°N).',
      '84 minus 7.',
      'The result is 77 degrees.',
    ],
  },
  {
    id: 'ch_geo_22',
    nodeId: NODE_C6_GEO_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing an east-west transcontinental rail corridor across North America. Which sequence of physical divisions will your railway traverse?',
    options: [
      'Pacific Coast → Western Cordilleras (Rockies) → Central Plains (Mississippi Basin) → Eastern Highlands (Appalachians) → Atlantic Coast',
      'Atlantic Coast → Atacama Desert → Amazon Basin → Laurentian Shield',
      'Pacific Coast → Brazilian Highlands → Grand Canyon → Hudson Bay',
      'Arctic Ocean → Pampas → Great Plains → Caribbean Sea',
    ],
    correctIndex: 0,
    explanation: 'North America’s "sandwich relief": Young high Western Cordilleras on the west, vast flat Central Plains in the interior, and ancient low Eastern Highlands (Appalachians/Canadian Shield) on the east.',
    hints: [
      'Remember the sandwich analogy: high west, flat middle, old highlands east.',
      'Start at the Pacific margin and move east to the Atlantic.',
      'Rockies -> Central Plains -> Appalachians.',
    ],
  },
  {
    id: 'ch_geo_23',
    nodeId: NODE_C6_GEO_017,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare the geographic extents of Africa vs South America regarding polar exposure:',
    options: [
      'South America extends far south to 56°S (Cape Horn, sub-Antarctic); Africa terminates at ~35°S (warm temperate)',
      'Africa reaches Antarctica while South America stops at the Equator',
      'Both continents have identical southern endpoints at 90°S',
      'South America lies entirely in the Northern Hemisphere',
    ],
    correctIndex: 0,
    explanation: 'South America stretches to 56°S at Cape Horn, exposing its southern tip (Tierra del Fuego) to sub-Antarctic cold oceanic winds. Africa ends at Cape Agulhas (~34°50′S), far north of sub-polar waters.',
    hints: [
      'Check Cape Horn’s latitude (56°S) vs South Africa’s tip (35°S).',
      'South America reaches 21 degrees further towards the South Pole.',
      'Cape Horn sits directly on the stormy Drake Passage near Antarctica.',
    ],
  },
  {
    id: 'ch_geo_24',
    nodeId: NODE_C6_GEO_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Contrast the two great grassland biomes of South America: Llanos vs Pampas.',
    options: [
      'Llanos: Tropical grasslands of northern Orinoco Basin (Venezuela/Colombia); Pampas: Fertile temperate grain & cattle grasslands of Argentina',
      'Llanos: Frozen Arctic tundra; Pampas: Barren sand dunes of Chile',
      'Llanos: Mangrove swamps of Brazil; Pampas: High alpine glaciers of Peru',
      'They are identical fields located in the exact same country',
    ],
    correctIndex: 0,
    explanation: 'Llanos are northern tropical savanna grasslands drained by the Orinoco (hot, wet-dry climate). Pampas are southern temperate fertile flatlands in Argentina, renowned for wheat and cattle ranching.',
    hints: [
      'Llanos = North, Orinoco river, tropical.',
      'Pampas = South, Argentina, temperate wheat belt.',
      'One is tropical savanna, the other is temperate grassland.',
    ],
  },
];

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Hidden Ocean Floor',
    instruction: 'Drag the bathymetric depth probe across the ocean basin to reveal how underwater topography mirrors continental relief.',
    interactionType: 'depth-probe',
    nodeId: NODE_C6_GEO_011,
  },
  {
    title: '2. Anatomy of a River Basin',
    instruction: 'Adjust the river slope slider to see how elevation controls water velocity, erosion, meandering, and delta silt deposition.',
    interactionType: 'river-simulator',
    nodeId: NODE_C6_GEO_012,
  },
  {
    title: '3. The Indian Agricultural Seasonal Cycle',
    instruction: 'Rotate the seasonal wheel to discover why temperature and monsoon rains dictate Kharif, Rabi, and Zaid crops.',
    interactionType: 'season-wheel',
    nodeId: NODE_C6_GEO_013,
  },
  {
    title: '4. Geological Storehouses of India',
    instruction: 'Click on mineral belts across the Chota Nagpur Plateau to inspect iron, coal, bauxite, and mica extraction zones.',
    interactionType: 'mineral-map',
    nodeId: NODE_C6_GEO_014,
  },
  {
    title: '5. The Physical Architecture of the Americas',
    instruction: 'Toggle between North and South America to compare the western fold mountain spines, interior river plains, and eastern plateaus.',
    interactionType: 'americas-cross-section',
    nodeId: NODE_C6_GEO_016,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If global sea levels dropped by 200 metres, what part of the ocean floor would immediately become dry land?',
    options: [
      'The Abyssal Plain',
      'The Continental Shelf',
      'The Mid-Ocean Ridge',
      'The Mariana Trench',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the ocean depth probe to 200 m on the continental margin to observe the shallow shelf.',
    nodeId: NODE_C6_GEO_011,
  },
  {
    question: 'Predict: Why does the Amazon River carry more water than any other river on Earth?',
    options: [
      'It flows through the vast equatorial rainforest basin receiving daily convectional rains across thousands of tributaries',
      'It has melting glaciers along its entire 6,000 km course',
      'It is connected directly to underground Antarctic ice tubes',
      'It is narrower than a garden hose so water builds up',
    ],
    correctIndex: 0,
    verifyInstruction: 'Check the river basin simulation to see how basin catchment area multiplies river volume.',
    nodeId: NODE_C6_GEO_018,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about water velocity as the river gradient flattens in the lower course?',
    observableOptions: [
      'Speed decreases drastically and the river begins dropping its carried silt and sand',
      'Speed accelerates to supersonic speeds',
      'The river flows backwards up the mountain',
      'The water completely disappears into space',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_GEO_012,
  },
  {
    question: 'What happens to the underwater terrain as the bathymetric probe moves past 200 metres depth from the coast?',
    observableOptions: [
      'The gentle continental shelf plunges into a steep continental slope heading down to the abyssal plain',
      'The ocean floor suddenly turns into dry desert dunes',
      'The water level rises 1,000 metres above the clouds',
      'The depth remains exactly 0 metres all the way across',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_GEO_011,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Field Geographer’s Master Portfolio',
  description: 'Apply your geographical knowledge to India and global trade. Map the journey of an iron-ore freight train from Jharia/Odisha to the port of Paradip, loaded onto a cargo ship navigating across the Indian Ocean to the Panama Canal.',
  steps: [
    '1. Trace the geological source of iron ore and coal in the Chota Nagpur Plateau (Jharkhand/Odisha).',
    '2. Follow the Mahanadi/Damodar river valleys towards the eastern coastline.',
    '3. Chart the maritime route across the Indian Ocean, through the Strait of Malacca, and across the Pacific Ocean.',
    '4. Navigate through the Isthmus of Panama canal separating North and South America.',
  ],
};

// ─��─ PROPS INTERFACE ───
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
  nodeId: NODE_C6_GEO_011,
  title: 'Water Bodies, Resources & The Americas',
  definition: 'Comprehensive geographical study of the hydrosphere (oceans and river systems), primary resources (agriculture seasons and mineral belts of India), and the physical geography, boundaries, and relief divisions of North and South America.',
  eli5: 'Earth is our water planet! Oceans have giant underwater mountains and deep trenches. Rivers flow from snowy peaks to ocean deltas. India has farming seasons like Kharif and Rabi, and mineral treasure boxes in Jharkhand. North and South America have giant mountain backbones on the west, big flat plains in the middle, and ancient highlands on the east.',
  misconceptions: [
    {
      misconception: 'The ocean floor is a flat, featureless sandy bottom.',
      correction: 'The ocean floor has dramatic relief including shallow continental shelves, steep slopes, vast abyssal plains, underwater volcanic mid-ocean ridges, and trenches deeper than Mt. Everest.',
    },
    {
      misconception: 'All rivers in India flow with equal strength throughout the year.',
      correction: 'Himalayan rivers are snow-fed and perennial (flow year-round); Peninsular rivers are rain-fed and seasonal (depend heavily on monsoon rains).',
    },
    {
      misconception: 'Bauxite is non-metallic because aluminium is light, and mica is metallic because it shines.',
      correction: 'Bauxite is a metallic mineral because it yields aluminium metal; Mica has non-metallic lustre, yields no metal, and acts as an electrical insulator.',
    },
    {
      misconception: 'The Green Revolution was an environmental tree-planting initiative.',
      correction: 'The Green Revolution was an agricultural breakthrough in the 1960s using HYV seeds, fertilisers, and irrigation to vastly boost food-grain (wheat/rice) yields.',
    },
    {
      misconception: 'South America lies entirely in the Southern Hemisphere.',
      correction: 'The Equator passes through northern South America (Ecuador, Colombia, Brazil), so part of the continent lies in the Northern Hemisphere (12°N to 56°S).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What percentage of Earth is covered by water?', options: ['50%', '71%', '29%', '90%'], correctIndex: 1 },
    { question: 'Where is the Mariana Trench located?', options: ['Atlantic Ocean', 'Indian Ocean', 'Western Pacific Ocean', 'Arctic Ocean'], correctIndex: 2 },
    { question: 'Which river forms the Sundarbans Delta?', options: ['Ganga-Brahmaputra', 'Narmada', 'Indus', 'Godavari'], correctIndex: 0 },
    { question: 'Which is a Rabi crop sown in winter?', options: ['Rice', 'Cotton', 'Wheat', 'Jute'], correctIndex: 2 },
    { question: 'Which state is famous for Jharia coalfields?', options: ['Jharkhand', 'Kerala', 'Punjab', 'Rajasthan'], correctIndex: 0 },
    { question: 'What narrow land strip connects North & South America?', options: ['Isthmus of Suez', 'Isthmus of Panama', 'Strait of Gibraltar', 'Bering Strait'], correctIndex: 1 },
    { question: 'Which are young fold mountains in North America?', options: ['Appalachian Mountains', 'Rocky Mountains', 'Canadian Shield', 'Laurentian Plateau'], correctIndex: 1 },
    { question: 'What is the driest desert in the world?', options: ['Sahara Desert', 'Thar Desert', 'Atacama Desert', 'Gobi Desert'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery across 8 ICSE nodes: ocean floor bathymetry, river systems, Indian agriculture seasons, mineral classification & Chota Nagpur distribution, and the complete physical geography of North and South America.',
};

// ─── CLIMATE & RIVER DISCHARGE DATA (RECHARTS) ───
const RIVER_DISCHARGE_DATA = [
  { name: 'Amazon', discharge: 209000, length: 6400, color: '#0284c7' },
  { name: 'Congo', discharge: 41200, length: 4700, color: '#0ea5e9' },
  { name: 'Ganga-Brahmaputra', discharge: 38000, length: 2900, color: '#38bdf8' },
  { name: 'Mississippi-Missouri', discharge: 16800, length: 6275, color: '#818cf8' },
  { name: 'Nile', discharge: 2830, length: 6650, color: '#a855f7' },
];

const MONSOON_RAINFALL_DATA = [
  { month: 'Jan', rain: 15, temp: 18 },
  { month: 'Mar', rain: 20, temp: 26 },
  { month: 'May', rain: 45, temp: 34 },
  { month: 'Jul (Kharif)', rain: 280, temp: 29 },
  { month: 'Sep', rain: 190, temp: 28 },
  { month: 'Nov (Rabi)', rain: 25, temp: 21 },
];

// ─── COMPONENT IMPLEMENTATION ───
function C6_GeographyWaterBodiesOceansSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_GEO_011,
  title = DEFAULT_PROPS.title || 'Water Bodies, Resources & The Americas',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌍', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery / prediction states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);

  // Adaptive difficulty & mastery state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback widgets
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive Exploration Simulation States with Direct Sliders
  const [probeDepth, setProbeDepth] = useState(150); // 0 to 11000 metres
  const [riverSlope, setRiverSlope] = useState(35); // 5 to 80 degrees
  const [selectedSeason, setSelectedSeason] = useState<'Kharif' | 'Rabi' | 'Zaid'>('Kharif');
  const [selectedMineral, setSelectedMineral] = useState<'iron' | 'coal' | 'bauxite' | 'mica'>('iron');
  const [activeContinentTab, setActiveContinentTab] = useState<'NA' | 'SA'>('NA');

  // Challenge Drag & Drop / Interactive state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Persistent BKT & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY ADAPTIVE TIER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
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

  // ─── 2D CANVAS WATER FLOW & SONAR ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#0369a1');
      gradient.addColorStop(0.5, '#0284c7');
      gradient.addColorStop(1, '#0ea5e9');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, height);

      const waveSpeed = 0.04 + (riverSlope / 100) * 0.08;
      const waveAmplitude = 4 + (riverSlope / 100) * 8;

      for (let x = 0; x <= width; x += 10) {
        const y = height / 2 + Math.sin(x * 0.02 + frame * waveSpeed) * waveAmplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Sonar pulse indicator
      const probeX = (probeDepth / 11000) * width;
      ctx.beginPath();
      ctx.arc(probeX, height / 3, 4 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [riverSlope, probeDepth]);

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
      setShowExplanation(true);
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

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! The Mariana Trench is over 11,000 metres deep.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // ─── PHASE ADVANCEMENT HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore Earth’s oceans, rivers, resources, and continents.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with variables in real-time!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Expedition assessment initiated. Show your geographic mastery!');
  }, []);

  // ─── PREDICTION HANDLER ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test it using the simulator.');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Expedition complete! Final mastery score: ${finalScore} percent.`);
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

  // ─── GENERAL ANSWER SUBMIT HANDLER ───
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
        speechManager.speak('Correct! Outstanding geographical reasoning.');
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
          speechManager.speak('Hints exhausted. Let us review the geographic principle together.');
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

  // ─── DRAG & DROP HANDLERS ───
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
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── SIMULATOR VARIABLE HANDLERS ───
  const handleSeasonSelect = useCallback((season: 'Kharif' | 'Rabi' | 'Zaid') => {
    setSelectedSeason(season);
    audioManager.play('tap');
    const details: Record<string, string> = {
      Kharif: 'Kharif Season: Sown in June–July with monsoon. High rainfall (>100 cm). Rice, Maize, Cotton.',
      Rabi: 'Rabi Season: Sown in Oct–Dec in cool winter. Harvested in spring. Wheat, Barley, Mustard.',
      Zaid: 'Zaid Season: April–June summer months. Requires irrigation. Watermelon, Cucumber, Vegetables.',
    };
    speechManager.speak(details[season] || '');
  }, []);

  const handleMineralSelect = useCallback((mineral: 'iron' | 'coal' | 'bauxite' | 'mica') => {
    setSelectedMineral(mineral);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      iron: 'Iron Ore: Mined in Jharkhand & Odisha. Backbone of steel manufacture.',
      coal: 'Coal: Mined at Jharia & Raniganj (Damodar Valley). Powers thermal plants.',
      bauxite: 'Bauxite: Abundant in Odisha. The ore of metallic aluminium.',
      mica: 'Mica: Chiefly from Jharkhand. Heat-resistant non-metallic electrical insulator.',
    };
    speechManager.speak(descriptions[mineral] || '');
  }, []);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Derived bathymetry info for probe
  const bathymetryZone = useMemo(() => {
    if (probeDepth <= 200) return { zone: 'Continental Shelf', desc: 'Shallow (<200m), rich sunlight, oil & major fishing grounds', color: '#38bdf8' };
    if (probeDepth <= 3000) return { zone: 'Continental Slope', desc: 'Steep drop connecting shelf to deep abyssal floor', color: '#0284c7' };
    if (probeDepth <= 6000) return { zone: 'Abyssal Plain', desc: 'Vast, flat, dark deep ocean floor (largest basin area)', color: '#0369a1' };
    if (probeDepth <= 8000) return { zone: 'Mid-Ocean Ridge', desc: 'Underwater volcanic mountain chains (Earth’s longest range)', color: '#6366f1' };
    return { zone: 'Ocean Trench (Mariana)', desc: 'Narrow deep depression reaching ~11,000 m (deepest known point)', color: '#4338ca' };
  }, [probeDepth]);

  // Motivational message based on errors
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-600 flex items-center justify-center text-2xl shadow-lg"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              ICSE Class 6 • {subjectConfig.name}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase / Difficulty badges */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-300 border-rose-600'
                : 'bg-indigo-950/60 text-indigo-300 border-indigo-600'
            }`}
          >
            {difficulty}
          </motion.span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
            Phase: {phase.toUpperCase()}
          </span>
        </div>
      </div>

      {/* ─��─ CANVAS STREAMING MONITOR ─── */}
      <div className="mt-4 bg-slate-900/60 rounded-2xl p-2 border border-slate-800/80 overflow-hidden relative">
        <div className="flex items-center justify-between px-3 py-1 text-xs text-slate-400 font-mono">
          <span>🌊 Hydrological & Topographical Sonar Visualiser</span>
          <span>Depth: {probeDepth}m | Velocity: {(riverSlope * 0.12).toFixed(1)} m/s</span>
        </div>
        <canvas ref={canvasRef} width={600} height={40} className="w-full h-10 rounded-xl" />
      </div>

      {/* ─── 1. DISCOVERY PHASE (HOOK) ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-6 space-y-6"
        >
          {/* Narrative Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-xl">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
              Expedition Scenario Brief
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-indigo-900/30 rounded-xl border border-indigo-700/40 text-xs text-indigo-200">
              📌 {SCENARIO.context}
            </div>
          </div>

          {/* Curiosity Question */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
              Initial Curiosity Challenge (Not Graded)
            </span>
            <p className="text-base sm:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100 font-bold'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span className="font-mono text-xs mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '🎉 Incredible insight! The ocean floor is deeper than the highest mountain.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/40 flex items-center gap-2 whitespace-nowrap"
                >
                  Begin Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (INTERACTIVE LABS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Exploration Navigation Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/30'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs font-mono text-slate-500">Lab {currentSlide + 1} / 5</span>
              </div>

              {/* ── LAB 1: BATHYMETRIC OCEAN PROBE ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Bathymetry SVG Visualiser */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full h-52">
                      <defs>
                        <linearGradient id="oceanWater" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                          <stop offset="40%" stopColor="#0369a1" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.98" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="30" width="600" height="210" fill="url(#oceanWater)" />

                      {/* Sea Level */}
                      <line x1="0" y1="30" x2="600" y2="30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" />
                      <text x="10" y="24" fill="#38bdf8" fontSize="10" fontWeight="bold">Sea Level (0 m)</text>

                      {/* Ocean Floor Profile */}
                      <path
                        d="M 0,30 L 30,50 L 120,60 L 200,160 L 360,170 L 400,120 L 440,170 L 490,230 L 530,170 L 600,170 L 600,240 L 0,240 Z"
                        fill="#334155"
                        stroke="#64748b"
                        strokeWidth="2"
                      />

                      {/* Labels on SVG */}
                      <text x="50" y="80" fill="#cbd5e1" fontSize="9" fontWeight="bold">Cont. Shelf</text>
                      <text x="140" y="120" fill="#cbd5e1" fontSize="9">Slope</text>
                      <text x="260" y="195" fill="#cbd5e1" fontSize="9">Abyssal Plain</text>
                      <text x="390" y="105" fill="#a5b4fc" fontSize="9" fontWeight="bold">Mid-Ocean Ridge</text>
                      <text x="470" y="215" fill="#f87171" fontSize="9" fontWeight="bold">Mariana Trench</text>

                      {/* Interactive Depth Indicator Marker */}
                      {(() => {
                        const markerX = 30 + (probeDepth / 11000) * 520;
                        const markerY = 30 + (probeDepth / 11000) * 190;
                        return (
                          <g>
                            <line x1={markerX} y1="30" x2={markerX} y2={markerY} stroke="#fbbf24" strokeWidth="2" strokeDasharray="3" />
                            <circle cx={markerX} cy={markerY} r="7" fill="#fbbf24" stroke="#78350f" strokeWidth="2" />
                            <text x={Math.min(500, markerX + 10)} y={markerY + 4} fill="#fbbf24" fontSize="10" fontWeight="bold">
                              {probeDepth} m
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Real-time Slider Control & Info Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Sonar Depth Controller</span>
                        <span className="text-amber-400 font-mono">{probeDepth} metres</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={11000}
                        step={100}
                        value={probeDepth}
                        onChange={(e) => setProbeDepth(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Ocean bathymetry depth slider"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>0m (Coast)</span>
                        <span>200m (Shelf)</span>
                        <span>4000m (Abyssal)</span>
                        <span>11000m (Trench)</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Identified Zone</span>
                      <h4 className="text-base font-black text-white" style={{ color: bathymetryZone.color }}>
                        {bathymetryZone.zone}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">{bathymetryZone.desc}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: RIVER BASIN SIMULATOR ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Upper Course */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border transition-all ${
                        riverSlope > 60
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-md'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <span className="text-xs font-bold text-emerald-400">1. Upper Course (Mountain)</span>
                      <h5 className="font-bold text-white text-sm mt-1">Vertical Erosion</h5>
                      <p className="text-xs text-slate-300 mt-1">
                        Fast rushing waters cut deep V-shaped valleys, canyons, and waterfalls.
                      </p>
                      <div className="mt-3 text-[11px] text-slate-400 font-mono">
                        Example: Ganga at Gangotri Glacier
                      </div>
                    </motion.div>

                    {/* Middle Course */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border transition-all ${
                        riverSlope >= 25 && riverSlope <= 60
                          ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <span className="text-xs font-bold text-indigo-400">2. Middle Course (Plains)</span>
                      <h5 className="font-bold text-white text-sm mt-1">Lateral Meandering</h5>
                      <p className="text-xs text-slate-300 mt-1">
                        Gradient flattens. River widens and forms sinuous bends called meanders.
                      </p>
                      <div className="mt-3 text-[11px] text-slate-400 font-mono">
                        Example: Ganga through Haridwar/Varanasi
                      </div>
                    </motion.div>

                    {/* Lower Course */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border transition-all ${
                        riverSlope < 25
                          ? 'bg-amber-950/40 border-amber-500 shadow-md'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <span className="text-xs font-bold text-amber-400">3. Lower Course (Mouth)</span>
                      <h5 className="font-bold text-white text-sm mt-1">Silt Deposition & Delta</h5>
                      <p className="text-xs text-slate-300 mt-1">
                        Sluggish water drops all silt, splitting into distributaries or estuaries.
                      </p>
                      <div className="mt-3 text-[11px] text-slate-400 font-mono">
                        Example: Sundarbans Delta (Ganga)
                      </div>
                    </motion.div>
                  </div>

                  {/* Real-time Slope Slider */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Terrain Gradient (Slope Angle)</span>
                      <span className="text-emerald-400 font-mono">{riverSlope}° gradient</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={80}
                      value={riverSlope}
                      onChange={(e) => setRiverSlope(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      aria-label="River terrain gradient slider"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>5° (Delta / Coastal Mouth)</span>
                      <span>40° (Plains Meander)</span>
                      <span>80° (Mountain Rapids)</span>
                    </div>
                  </div>

                  {/* Discharge Chart (Recharts) */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Global River Discharge Comparison (m³/s)
                    </span>
                    <div className="h-44 mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={RIVER_DISCHARGE_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                          />
                          <Bar dataKey="discharge" radius={[6, 6, 0, 0]}>
                            {RIVER_DISCHARGE_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: AGRICULTURE SEASONS WHEEL ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-3">
                    {(['Kharif', 'Rabi', 'Zaid'] as const).map(season => (
                      <motion.button
                        key={season}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSeasonSelect(season)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all border ${
                          selectedSeason === season
                            ? season === 'Kharif'
                              ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                              : season === 'Rabi'
                              ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                              : 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        {season} Season
                      </motion.button>
                    ))}
                  </div>

                  {/* Season Information Display */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-slate-400 font-semibold">Sowing & Harvest Time</span>
                      <p className="text-sm font-bold text-white">
                        {selectedSeason === 'Kharif'
                          ? 'Sown: June–July (Monsoon) • Harvest: Sept–Oct'
                          : selectedSeason === 'Rabi'
                          ? 'Sown: Oct–Dec (Winter) • Harvest: March–April'
                          : 'Sown: April–June (Summer) • Short duration'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs text-slate-400 font-semibold">Climate Requirement</span>
                      <p className="text-sm font-bold text-amber-300">
                        {selectedSeason === 'Kharif'
                          ? 'High Temp (>25°C) & Heavy Rain (>100 cm)'
                          : selectedSeason === 'Rabi'
                          ? 'Cool growing season (10–15°C) & warm ripening'
                          : 'Warm dry summer with assured canal irrigation'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs text-slate-400 font-semibold">Primary Crops</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {(selectedSeason === 'Kharif'
                          ? ['Rice', 'Maize', 'Cotton', 'Jute']
                          : selectedSeason === 'Rabi'
                          ? ['Wheat', 'Barley', 'Gram', 'Mustard']
                          : ['Watermelon', 'Cucumber', 'Vegetables']
                        ).map((crop, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-xs text-emerald-300 font-medium"
                          >
                            🌱 {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rainfall graph during seasons */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Monthly Rainfall (mm) & Temp (°C) Pattern across Seasons
                    </span>
                    <div className="h-40 mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={MONSOON_RAINFALL_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                          />
                          <Line type="monotone" dataKey="rain" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: CHOTA NAGPUR MINERAL MAP ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['iron', 'coal', 'bauxite', 'mica'] as const).map(min => (
                      <motion.button
                        key={min}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleMineralSelect(min)}
                        className={`p-3 rounded-xl text-center border font-bold capitalize text-xs sm:text-sm transition-all ${
                          selectedMineral === min
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        {min === 'iron' && '⛏️ Iron Ore'}
                        {min === 'coal' && '⬛ Coal'}
                        {min === 'bauxite' && '🪨 Bauxite'}
                        {min === 'mica' && '✨ Mica'}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Mineral Belt Map */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 500 200" className="w-full h-44">
                      <rect x="50" y="20" width="400" height="160" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                      <text x="70" y="45" fill="#94a3b8" fontSize="12" fontWeight="bold">Chota Nagpur Plateau (Mineral Heartland)</text>

                      <path d="M 60,60 L 250,60 L 250,170 L 60,170 Z" fill="#0f172a" stroke="#475569" />
                      <text x="80" y="80" fill="#64748b" fontSize="10">Jharkhand Belt</text>

                      <path d="M 250,60 L 440,60 L 440,170 L 250,170 Z" fill="#0f172a" stroke="#475569" />
                      <text x="270" y="80" fill="#64748b" fontSize="10">Odisha Belt</text>

                      {selectedMineral === 'coal' && (
                        <g>
                          <circle cx="150" cy="110" r="10" fill="#f59e0b" />
                          <text x="150" y="135" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Jharia / Raniganj</text>
                        </g>
                      )}

                      {selectedMineral === 'iron' && (
                        <g>
                          <circle cx="340" cy="110" r="10" fill="#ef4444" />
                          <text x="340" y="135" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Keonjhar / Barbil</text>
                        </g>
                      )}

                      {selectedMineral === 'bauxite' && (
                        <g>
                          <circle cx="360" cy="140" r="10" fill="#10b981" />
                          <text x="360" y="165" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Odisha Bauxite Belt</text>
                        </g>
                      )}

                      {selectedMineral === 'mica' && (
                        <g>
                          <circle cx="130" cy="80" r="10" fill="#a855f7" />
                          <text x="130" y="100" textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="bold">Kodarma Mica Belt</text>
                        </g>
                      )}
                    </svg>

                    <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <strong>Geological Note:</strong> Ancient crystalline metamorphic rocks (granite, gneiss, schist) formed over 500 million years ago, making Chota Nagpur the chief supplier of raw material for steel, aluminium, and power plants.
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: AMERICAS PHYSICAL CROSS-SECTION ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveContinentTab('NA')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                          activeContinentTab === 'NA' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        North America
                      </button>
                      <button
                        onClick={() => setActiveContinentTab('SA')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                          activeContinentTab === 'SA' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        South America
                      </button>
                    </div>
                    <span className="text-xs text-slate-400">West-to-East Topographical Profile</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 200" className="w-full h-44">
                      {activeContinentTab === 'NA' ? (
                        <g>
                          <text x="20" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold">Pacific Ocean</text>
                          <path d="M 20,160 L 80,160 L 140,50 L 180,90 L 220,60 L 260,140 L 440,145 L 480,100 L 520,130 L 580,160" fill="none" stroke="#22c55e" strokeWidth="3" />
                          <text x="150" y="40" fill="#22c55e" fontSize="10" fontWeight="bold">Western Cordilleras (Rockies)</text>
                          <text x="310" y="165" fill="#e2e8f0" fontSize="10">Central Plains (Mississippi)</text>
                          <text x="470" y="90" fill="#eab308" fontSize="10" fontWeight="bold">Appalachians</text>
                          <text x="530" y="180" fill="#38bdf8" fontSize="11" fontWeight="bold">Atlantic</text>
                        </g>
                      ) : (
                        <g>
                          <text x="20" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold">Pacific Ocean</text>
                          <path d="M 20,160 L 60,160 L 75,150 L 120,30 L 170,140 L 400,150 L 480,90 L 540,130 L 580,160" fill="none" stroke="#ef4444" strokeWidth="3" />
                          <text x="50" y="175" fill="#f97316" fontSize="9">Atacama</text>
                          <text x="110" y="22" fill="#ef4444" fontSize="10" fontWeight="bold">Andes Mountains (~7000 km)</text>
                          <text x="240" y="165" fill="#3b82f6" fontSize="10">Amazon Basin (Rainforest)</text>
                          <text x="450" y="80" fill="#a855f7" fontSize="10" fontWeight="bold">Brazilian Highlands</text>
                          <text x="530" y="180" fill="#38bdf8" fontSize="11" fontWeight="bold">Atlantic</text>
                        </g>
                      )}
                    </svg>

                    <div className="mt-2 text-xs text-slate-400 p-2 bg-slate-900 rounded-lg">
                      {activeContinentTab === 'NA'
                        ? '🥪 "The Sandwich Relief": High young fold mountains in the West, fertile lowlands in the Middle, and worn-down ancient highlands in the East.'
                        : '🍽️ "The Tilted Plate": Towering young fold Andes on the Pacific edge creating a rain shadow (Atacama Desert), low Amazon interior, and ancient eastern shields.'}
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
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-mono text-slate-400">{currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
              >
                Enter Sandbox Simulator →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (FREE PLAY) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Ungraded Exploration Sandbox
                </span>
                <h3 className="text-xl font-black text-white">Geographical Parameter Studio</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-900/40"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            {/* Predict-then-Check Module */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase">Interactive Observation Check</span>
              <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handlePrediction(i)}
                    className={`p-3 rounded-xl text-left text-xs font-medium border ${
                      predictionIndex === i
                        ? i === PREDICTION_QUESTIONS[0].correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
              {predictionMade && (
                <p className="text-xs text-amber-300 mt-2 font-mono">
                  🔍 {PREDICTION_QUESTIONS[0].verifyInstruction}
                </p>
              )}
            </div>

            {/* Interactive Variables Workbench with Real-time Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-indigo-400">Bathymetry Scanner</span>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Current Depth:</span>
                  <span className="text-white font-mono">{probeDepth} m</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={11000}
                  value={probeDepth}
                  onChange={(e) => setProbeDepth(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  aria-label="Bathymetry scanner depth slider"
                />
                <p className="text-xs text-slate-300">
                  Feature: <strong className="text-emerald-400">{bathymetryZone.zone}</strong>
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-teal-400">River Dynamic Controller</span>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Slope Gradient:</span>
                  <span className="text-white font-mono">{riverSlope}°</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={80}
                  value={riverSlope}
                  onChange={(e) => setRiverSlope(Number(e.target.value))}
                  className="w-full accent-teal-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  aria-label="River slope dynamic controller slider"
                />
                <p className="text-xs text-slate-300">
                  River Stage:{' '}
                  <strong className="text-amber-400">
                    {riverSlope > 60 ? 'Upper (Erosional V-Valley)' : riverSlope > 25 ? 'Middle (Meanders)' : 'Lower (Delta/Deposition)'}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress & Metadata */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 uppercase tracking-wider font-mono">
                NEP Competency: {challenge.competencyLevel}
              </span>
            </div>

            {/* Dynamic Animated Progress Bar */}
            <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Challenge Container */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5 shadow-xl">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Target Node: {challenge.nodeId} • {challenge.difficulty.toUpperCase()}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">{challenge.question}</h3>
            </div>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                        wrongFlash
                          ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 font-bold'
                          : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    >
                      <span className="font-mono text-xs mr-3 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* TYPE 2: DRAG-LABEL (Interactive SVG) */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag Labels to Correct Boundaries:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg cursor-grab text-white text-xs font-bold shadow-md"
                      role="button"
                      aria-label={`Draggable label ${item.label}`}
                    >
                      🏷️ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <svg viewBox="0 0 500 300" className="w-full h-64">
                    <path
                      d="M 150,60 L 350,60 L 380,120 L 340,200 L 250,260 L 160,200 L 120,120 Z"
                      fill="#1e293b"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    <text x="250" y="160" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
                      NORTH AMERICA
                    </text>

                    {/* North Target */}
                    <rect
                      x="175"
                      y="15"
                      width="150"
                      height="35"
                      rx="8"
                      fill={droppedLabels.bound_north ? '#065f46' : '#0f172a'}
                      stroke={droppedLabels.bound_north ? '#34d399' : '#475569'}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('bound_north')}
                      className="transition-colors cursor-pointer"
                    />
                    <text x="250" y="37" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                      {droppedLabels.bound_north || 'Drop North Boundary'}
                    </text>

                    {/* West Target */}
                    <rect
                      x="20"
                      y="130"
                      width="130"
                      height="35"
                      rx="8"
                      fill={droppedLabels.bound_west ? '#065f46' : '#0f172a'}
                      stroke={droppedLabels.bound_west ? '#34d399' : '#475569'}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('bound_west')}
                      className="transition-colors cursor-pointer"
                    />
                    <text x="85" y="152" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                      {droppedLabels.bound_west || 'Drop West Ocean'}
                    </text>

                    {/* East Target */}
                    <rect
                      x="350"
                      y="130"
                      width="130"
                      height="35"
                      rx="8"
                      fill={droppedLabels.bound_east ? '#065f46' : '#0f172a'}
                      stroke={droppedLabels.bound_east ? '#34d399' : '#475569'}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('bound_east')}
                      className="transition-colors cursor-pointer"
                    />
                    <text x="415" y="152" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                      {droppedLabels.bound_east || 'Drop East Ocean'}
                    </text>

                    {/* South Target */}
                    <rect
                      x="160"
                      y="255"
                      width="180"
                      height="35"
                      rx="8"
                      fill={droppedLabels.bound_south ? '#065f46' : '#0f172a'}
                      stroke={droppedLabels.bound_south ? '#34d399' : '#475569'}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('bound_south')}
                      className="transition-colors cursor-pointer"
                    />
                    <text x="250" y="277" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                      {droppedLabels.bound_south || 'Drop South Land Boundary'}
                    </text>
                  </svg>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="mt-3 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Validate Boundary Map
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400">Drag or Click to Reorder into the exact geographical sequence:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-emerald-400 font-mono mr-2">{displayIndex + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-600">☰</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Confirm Geographic Sequence
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                    aria-label="Numeric calculation answer input"
                  />
                  <span className="text-xs font-bold text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <span className="text-xs text-amber-300">👉 {challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[70px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2"
                    >
                      <span>{i + 1}. {part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above in sequential order</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0 || showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                >
                  Verify Constructed Cross-Section
                </motion.button>
              </div>
            )}

            {/* ── PROGRESSIVE STEP-BY-STEP EXPLANATION ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-gradient-to-br from-amber-950/40 to-slate-950 rounded-2xl border border-amber-700/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wide">
                    Geographic Breakdown & Proof
                  </span>
                  <span className="text-[11px] text-amber-300 font-mono">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ').filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <strong className="text-amber-400 font-mono mr-1.5">{i + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Complete Survey Expedition →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          {/* Header Banner */}
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 rounded-3xl border border-emerald-600 shadow-2xl text-center space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
              Expedition Completed Successfully
            </span>
            <h2 className="text-3xl font-black text-white">Geographic Mastery Certified</h2>
            <div className="flex justify-center gap-6 pt-2">
              <div className="text-center">
                <span className="text-xs text-slate-400">Final Score</span>
                <p className="text-3xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="w-px h-12 bg-slate-800" />
              <div className="text-center">
                <span className="text-xs text-slate-400">Mastery Rating</span>
                <p className="text-3xl font-black text-indigo-400 uppercase tracking-wider">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK SECTION */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Performance Feedback</span>
            <h3 className="text-xl font-black text-emerald-400 mt-1">{motivationalMessage}</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {errors === 0
                ? '🏆 Outstanding Distinction! You have demonstrated comprehensive mastery of world oceans, river dynamics, Indian agriculture & mineral geography, and continental relief.'
                : errors <= 3
                ? '🌟 Excellent performance! You possess a firm grasp of core ICSE concepts. Review specific coordinate boundaries to achieve perfection.'
                : errors <= 7
                ? '📚 Good learning progress! Every challenge refined your geographical reasoning. Review the misconception notes below to strengthen exam preparation.'
                : 'Keep practicing! Review the exploration labs and re-test to master the concepts.'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>💭</span> Post-Expedition Reflections
            </h4>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <p className="text-xs font-semibold text-emerald-400">1. What was the most surprising thing you learned?</p>
                <p className="text-xs text-slate-300">
                  How oceanic trenches like the Mariana Trench reach depths greater than the height of Mt. Everest, and how river gradients directly govern delta vs estuary formations.
                </p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <p className="text-xs font-semibold text-emerald-400">2. How would you explain this to a friend?</p>
                <p className="text-xs text-slate-300">
                  By using the &apos;sandwich model&apos; for North America (mountains-plains-highlands) and comparing perennial glacier-fed rivers with seasonal monsoon-fed rivers in India.
                </p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <p className="text-xs font-semibold text-emerald-400">3. Where in real life might you use this?</p>
                <p className="text-xs text-slate-300">
                  In understanding weather forecasts, maritime shipping trade routes through the Panama Canal, regional agricultural supply chains, and mineral resource management.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h4 className="text-sm font-black text-rose-300 uppercase tracking-wider">
                Targeted Misconception Correction Profile:
              </h4>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ ICSE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SRS) Status Card */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Spaced Repetition Memory Schedule (SM-2)
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Optimal retention review scheduled in{' '}
                <strong className="text-amber-300 font-mono">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>
                . Re-testing on this date solidifies long-term memory.
              </p>
            </div>
            <span className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700 whitespace-nowrap">
              SRS Interval: {errors === 0 ? 'Tier 3 (Weekly)' : 'Tier 1 (Daily)'}
            </span>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/50 to-slate-900 rounded-2xl border border-indigo-800/60 space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Real-World Capstone Assignment
            </span>
            <h4 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 font-medium">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SOUND & VISUAL FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_GeographyWaterBodiesOceansSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C7_GEO_011 = 'c7_geo_011'; // Soil formation
const NODE_C7_GEO_012 = 'c7_geo_012'; // Industries — agro-based
const NODE_C7_GEO_013 = 'c7_geo_013'; // Industries — iron and steel
const NODE_C7_GEO_014 = 'c7_geo_014'; // Energy resources — conventional
const NODE_C7_GEO_015 = 'c7_geo_015'; // Energy resources — non-conventional
const NODE_C7_GEO_016 = 'c7_geo_016'; // Europe — location and physical features
const NODE_C7_GEO_017 = 'c7_geo_017'; // Africa — location and physical features
const NODE_C7_GEO_018 = 'c7_geo_018'; // Australia — location and physical features
const NODE_C7_GEO_019 = 'c7_geo_019'; // Antarctica

const ALL_NODE_IDS = [
  NODE_C7_GEO_011,
  NODE_C7_GEO_012,
  NODE_C7_GEO_013,
  NODE_C7_GEO_014,
  NODE_C7_GEO_015,
  NODE_C7_GEO_016,
  NODE_C7_GEO_017,
  NODE_C7_GEO_018,
  NODE_C7_GEO_019
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Living Crust & Global Resources Expedition',
  intro: 'You are the chief physical geographer for the National Geographic Council. From the micro-layers of soil forming across millennia to the vast energy reserves and continents shaping our planet, you must analyze soil horizons, heavy and agro industries, and continental landforms.',
  context: 'Investigate how parent rocks weather into nutrient-rich humus horizons, track resource allocation in India, and survey geographical features across Europe, Africa, Australia, and Antarctica.'
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If a massive granite boulder in the Western Ghats is left exposed to rainfall and tree roots, how long will it take nature to form just 1 single centimeter of fertile topsoil (A Horizon)?',
  options: [
    '2 to 5 weeks — soil forms rapidly after heavy monsoons',
    '1 to 2 years — as soon as mosses colonise',
    '200 to 500+ years — weathering and humus accumulation are extremely slow',
    'Instantaneous — topsoil is simply powdered parent bedrock'
  ],
  correctIndex: 2,
  hintAfter: 'Soil is a non-renewable geological asset on human timescales! Let us explore the 5 horizons and factors of soil formation.'
};

// ─── OBSERVATION QUESTIONS (Brilliant.org "What do you notice?" pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_soil_01',
    question: 'What do you notice happens to the Topsoil Depth (cm) as you increase the Slope Gradient to 40° while maintaining high rainfall?',
    observableOptions: [
      'Topsoil depth decreases rapidly because torrential runoff accelerates erosion faster than soil can accumulate',
      'Topsoil depth doubles because gravity compresses soil particles into rock',
      'Weathering stops completely and the soil turns directly into solid bedrock',
      'Slope gradient has no measurable impact on soil depth'
    ],
    correctIndex: 0,
    explanation: 'On steep slopes, surface runoff carries away loose topsoil particles faster than weathering can replace them (accelerated sheet and gully erosion).'
  },
  {
    id: 'obs_relief_02',
    question: 'When observing the Continental Relief Profile for Australia, what do you notice about its central elevation compared to its eastern and western rims?',
    observableOptions: [
      'The center is elevated into the highest mountain peak on Earth',
      'The center dips into a sunken lowland basin with Lake Eyre sitting ~15 meters below sea level like a saucer',
      'The entire Australian landmass slopes in a single direction from north to south',
      'The continent is completely uniform with zero variation in topography'
    ],
    correctIndex: 1,
    explanation: 'Australia resembles a giant saucer: the Great Dividing Range rises in the east and the Western Plateau rises in the west, while the Central Lowlands sink below sea level at Lake Eyre.'
  }
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

// ─── CHALLENGES ARRAY (22 CHALLENGES) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_geo_001',
    nodeId: NODE_C7_GEO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a mature vertical soil profile, which horizon represents the fertile topsoil where organic humus is blended with mineral matter?',
    options: ['O Horizon (Leaf litter)', 'A Horizon (Topsoil)', 'B Horizon (Subsoil)', 'C Horizon (Weathered parent material)'],
    correctIndex: 1,
    explanation: 'The A Horizon (topsoil) is the darkest, most fertile layer where decomposed organic humus blends with mineral grains and most plant roots reside.',
    hints: [
      'Remember the mnemonic "Old Animals Bring Crumbs to Rocks" (O, A, B, C, R).',
      'The surface layer is O (fresh litter), while the true nutrient-rich mineral topsoil lies right beneath it.',
      'Horizon A is the primary seed germination and root zone.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_geo_002',
    nodeId: NODE_C7_GEO_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct soil horizon designations onto their corresponding layer depths.',
    dragItems: [
      { label: 'O Horizon (Humus & Litter)', targetId: 'layer_o' },
      { label: 'A Horizon (Fertile Topsoil)', targetId: 'layer_a' },
      { label: 'B Horizon (Leached Subsoil)', targetId: 'layer_b' },
      { label: 'C Horizon (Weathered Rock)', targetId: 'layer_c' }
    ],
    correctMapping: {
      layer_o: 'O Horizon (Humus & Litter)',
      layer_a: 'A Horizon (Fertile Topsoil)',
      layer_b: 'B Horizon (Leached Subsoil)',
      layer_c: 'C Horizon (Weathered Rock)'
    },
    explanation: 'The soil profile stacks vertically: O on surface, A topsoil below it, B subsoil collecting leached minerals, C broken parent fragments, and R solid bedrock.',
    hints: [
      'Layer O is topmost dry leaves and humus.',
      'Layer A contains earthworms and active roots.',
      'Layer B receives downward-leached iron and clays; Layer C contains cracked rock chunks.'
    ]
  },
  {
    id: 'ch_geo_003',
    nodeId: NODE_C7_GEO_011,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Black Soil (Regur) on the Deccan Plateau ideally suited for cotton farming compared to Laterite soil of the Western Ghats?',
    options: [
      'Black soil has high silica leachates that harden under sunlight into bricks',
      'Black soil weathers from basalt lava, possesses rich clay texture, and retains deep moisture during dry spells',
      'Laterite soil has higher organic nitrogen because of heavy torrential downpours',
      'Black soil is purely coarse sand deposited annually by Himalayan river floods'
    ],
    correctIndex: 1,
    explanation: 'Black soil forms from weathered basalt lava on the Deccan Trap. Its clay-rich texture expands when wet and tenaciously retains moisture, crucial for long-cycle cotton.',
    hints: [
      'Consider the parent rock: Deccan Plateau consists of ancient volcanic basalt.',
      'Laterite soil is heavily leached of silica by torrential rains and hardens like a brick.',
      'Black soil holds water deep into the dry winter season.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_geo_004',
    nodeId: NODE_C7_GEO_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under moderate temperate conditions, natural weathering forms roughly 1 cm of topsoil every 350 years. How many years are required to build a 12 cm layer of mature topsoil?',
    correctAnswer: 4200,
    tolerance: 50,
    unit: 'years',
    explanation: '12 cm × 350 years/cm = 4,200 years. This shows why topsoil erosion in a few monsoon seasons is an ecological catastrophe.',
    hints: [
      'Multiply the target depth in centimeters by the years required per centimeter.',
      '12 multiplied by 350.',
      '12 × 300 = 3600; 12 × 50 = 600; 3600 + 600 = 4200.'
    ]
  },
  {
    id: 'ch_geo_005',
    nodeId: NODE_C7_GEO_011,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the sequence of actions to rehabilitate a steep, gully-eroded hillside in the Shivalik hills.',
    sortItems: [
      'Construct stone check dams across deep gullies to trap silt and retard runoff',
      'Carve broad horizontal step terraces along contour elevations',
      'Plant deep-rooting native grass and afforestation saplings on terrace berms',
      'Adopt contour ploughing across slope curves for subsequent crop cycles'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First arrest torrential gully water with check dams; next reshape steep gradients into terraces; then anchor exposed topsoil with roots; finally cultivate along contours.',
    hints: [
      'Start by stopping water from cutting deeper into the active gullies.',
      'Reshape the macro slope before seeding vegetation.',
      'Anchor the ground before introducing active crop ploughing.'
    ]
  },
  {
    id: 'ch_geo_006',
    nodeId: NODE_C7_GEO_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Mumbai and Ahmedabad become premier hubs for India’s cotton textile mill sector in 1854 rather than dry interior towns?',
    options: [
      'Interior dry air prevents power loom motors from overheating',
      'Humid coastal atmosphere keeps cotton yarn pliable so it does not snap during spinning, plus proximity to Deccan black soil',
      'Sugarcane bagasse was needed to fuel the textile looms',
      'Alluvial river silt in Mumbai provided direct natural dye minerals'
    ],
    correctIndex: 1,
    explanation: 'Spinning cotton requires high humidity so the thread does not snap under tension. Mumbai combined humid sea breezes with proximity to Deccan cotton fields and an export harbour.',
    hints: [
      'Think about what happens to dry cotton thread under high-speed mechanical spinning.',
      'Dry thread snaps easily; moisture provides elasticity.',
      'Also consider Mumbai port for machinery import and black soil proximity.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_geo_007',
    nodeId: NODE_C7_GEO_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are sugar mills in Uttar Pradesh and Maharashtra situated in immediate proximity (within 25-50 km) of sugarcane fields?',
    options: [
      'Sugarcane is lightweight and loses no value over weeks of long transport',
      'Sugarcane is bulky and its sucrose content rapidly deteriorates within 24–48 hours after cutting',
      'Sugar crystals form naturally inside the cane stems during long railway transit',
      'Government regulations mandate that sugar can only be crushed during monsoon floods'
    ],
    correctIndex: 1,
    explanation: 'Sugarcane is a weight-losing, highly perishable raw material. The sucrose content begins inverting into glucose shortly after harvest, demanding rapid crushing.',
    hints: [
      'Consider what happens to cut sugarcane left sitting in the sun.',
      'Sucrose sweetness drops rapidly every hour after harvest.',
      'Sugarcane is also extremely heavy and expensive to haul over long distances.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_geo_008',
    nodeId: NODE_C7_GEO_013,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In a modern integrated steel plant blast furnace, what is the specific chemical function of Limestone (Flux)?',
    options: [
      'Acts as the main source of metallic iron',
      'Combines with silica and gangue impurities to form molten slag that floats on liquid iron',
      'Acts as the primary fuel and reducing gas source',
      'Prevents steel from rusting when exposed to ocean air'
    ],
    correctIndex: 1,
    explanation: 'Limestone acts as a flux: it melts and combines with silica/rock impurities in iron ore to form molten slag, which floats on top of the heavier molten pig iron.',
    hints: [
      'Iron ore is the source of metal; Coking coal is the reducing agent.',
      'Manganese provides hardness and rust-resistance.',
      'Limestone captures unwanted sand/rock impurities into a removable layer called slag.'
    ]
  },
  {
    id: 'ch_geo_009',
    nodeId: NODE_C7_GEO_013,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the ecological and resource advantages of Mini Steel Plants operating in urban centers over massive Integrated Steel complexes.',
    options: [
      'Mini steel plants consume immense quantities of scarce metallurgical coking coal in giant blast furnaces',
      'Mini steel plants recycle scrap steel using electric arc furnaces, conserving coking coal and reducing long-distance freight',
      'Mini steel plants do not require electrical power and rely entirely on firewood',
      'Mini steel plants can only produce unrefined brittle pig iron with 4% carbon content'
    ],
    correctIndex: 1,
    explanation: 'Mini steel plants use electric arc or induction furnaces to melt recycled scrap or sponge iron. They eliminate blast furnaces, thereby conserving metallurgical coal.',
    hints: [
      'Integrated plants process raw iron ore with coking coal from scratch.',
      'Mini plants operate on electricity and feed on recycled metallic scrap.',
      'This directly saves fossil coking coal and serves local construction demand.'
    ]
  },
  {
    id: 'ch_geo_010',
    nodeId: NODE_C7_GEO_013,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Build the correct industrial sequence for manufacturing rolled steel from raw mineral inputs.',
    availableParts: ['Iron Ore + Coke + Limestone', 'Smelting in Blast Furnace', 'Molten Pig Iron (High Carbon)', 'Basic Oxygen Furnace (Oxygen Blow)', 'Refined Steel Ingots'],
    targetState: 'Iron Ore + Coke + Limestone Smelting in Blast Furnace Molten Pig Iron (High Carbon) Basic Oxygen Furnace (Oxygen Blow) Refined Steel Ingots',
    validationHint: 'Combine input raw materials → Smelting → Pig Iron → BOF Decarbonisation → Finished Steel.',
    explanation: 'Raw inputs are smelted in a blast furnace to yield high-carbon brittle pig iron, which is purified via oxygen blast in a BOF to produce strong, ductile steel.',
    hints: [
      'Start with the three raw charge ingredients.',
      'Smelting produces intermediate brittle pig iron.',
      'An oxygen blow removes excess carbon before rolling into steel.'
    ]
  },
  {
    id: 'ch_geo_011',
    nodeId: NODE_C7_GEO_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which variety of coal possesses the highest carbon percentage (over 80%), highest calorific value, and burns with virtually no smoke?',
    options: ['Peat', 'Lignite (Brown coal)', 'Bituminous', 'Anthracite'],
    correctIndex: 3,
    explanation: 'Anthracite is the highest grade metamorphic coal, containing over 80-90% carbon. It is hard, lustrous, and releases maximum heat with minimal smoke.',
    hints: [
      'Peat is the first, wettest stage of decomposed swamp vegetation.',
      'Bituminous is the most abundant industrial coal in India (Jharia, Raniganj).',
      'Anthracite is the rarest, hardest, and top-tier coal.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_geo_012',
    nodeId: NODE_C7_GEO_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Geologically, how does the primordial origin of Petroleum (Crude Oil) differ from Coal formation?',
    options: [
      'Petroleum formed from ancient terrestrial swamp ferns, while coal formed from marine dinosaurs',
      'Coal formed from compressed terrestrial swamp forests, whereas petroleum formed from microscopic marine plankton buried on sea beds',
      'Petroleum formed from volcanic lava cooling underwater in the Arabian Sea',
      'Both formed identically from the same mangrove leaves in Assam'
    ],
    correctIndex: 1,
    explanation: 'Coal originates from terrestrial carboniferous swamp forests, whereas petroleum and natural gas derive from microscopic marine organisms (plankton/algae) buried under marine sediments.',
    hints: [
      'Think land trees versus ocean microscopic organisms.',
      'Coal = buried swamp vegetation under heat and pressure.',
      'Petroleum = marine plankton compressed under offshore sedimentary basins (e.g., Mumbai High).'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_geo_013',
    nodeId: NODE_C7_GEO_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An energy engineer seeks high tidal range estuaries in India to install bidirectional bulb turbines. Which two geographical sites should be chosen?',
    options: [
      'Gulf of Kutch and Gulf of Khambhat in Gujarat',
      'Dal Lake in Kashmir and Loktak Lake in Manipur',
      'Muppandal pass in Tamil Nadu and Jaisalmer desert',
      'Coromandel coast near Chennai and Puga Valley in Ladakh'
    ],
    correctIndex: 0,
    explanation: 'The funnel-shaped Gulf of Kutch and Gulf of Khambhat in Gujarat produce extraordinary tidal amplitudes (over 8-11 meters), making them prime tidal power sites in India.',
    hints: [
      'Tidal power requires enclosed oceanic gulfs with massive water height differences between high and low tides.',
      'Look for the two prominent gulf indentations along Gujarat’s coastline.',
      'Muppandal is famous for wind; Puga Valley is geothermal.'
    ]
  },
  {
    id: 'ch_geo_014',
    nodeId: NODE_C7_GEO_015,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following pairs correctly matches a prominent Indian Geothermal energy site with its geographical location?',
    options: [
      'Manikaran — Hot springs in Parbati Valley, Himachal Pradesh',
      'Tarapur — Hot geysers in Maharashtra',
      'Digboi — Thermal volcanic springs in Assam',
      'Kakrapar — Geothermal fault line in Gujarat'
    ],
    correctIndex: 0,
    explanation: 'Manikaran in Himachal Pradesh and Puga Valley in Ladakh are India’s premier geothermal exploration fields where magma-heated groundwater surfaces as steam/hot springs.',
    hints: [
      'Tarapur and Kakrapar are atomic nuclear power stations.',
      'Digboi is India’s oldest petroleum oil well.',
      'Manikaran is located in the Himalayan valleys of Himachal Pradesh.'
    ]
  },
  {
    id: 'ch_geo_015',
    nodeId: NODE_C7_GEO_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish between the geographic roles of the Alps and the Ural Mountains in Europe.',
    options: [
      'The Alps divide Europe from Asia, while the Urals separate France from Spain',
      'The Alps act as a climatic divide between temperate maritime Europe and Mediterranean Europe, while the Urals form the eastern continental boundary with Asia',
      'The Urals drain the Danube River into the Black Sea, while the Alps drain the Volga into the Caspian',
      'The Alps lie in Scandinavia, while the Urals border the Atlantic Ocean'
    ],
    correctIndex: 1,
    explanation: 'The Alps curve across southern-central Europe sheltering the Mediterranean basin from polar winds. The Ural Mountains run north-south through Russia marking the boundary with Asia.',
    hints: [
      'Where is the traditional land boundary separating Europe from Asia?',
      'The Urals and Ural River mark the eastern border.',
      'The Alps separate cooler northern Europe from sunny southern Mediterranean Europe.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_geo_016',
    nodeId: NODE_C7_GEO_016,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match each major European river to the exact water body into which it discharges.',
    dragItems: [
      { label: 'Volga River (Longest in Europe)', targetId: 'sea_caspian' },
      { label: 'Danube River (Flows through 10 nations)', targetId: 'sea_black' },
      { label: 'Rhine River (Artery of German industry)', targetId: 'sea_north' },
      { label: 'Seine River (Flows through Paris)', targetId: 'sea_channel' }
    ],
    correctMapping: {
      sea_caspian: 'Volga River (Longest in Europe)',
      sea_black: 'Danube River (Flows through 10 nations)',
      sea_north: 'Rhine River (Artery of German industry)',
      sea_channel: 'Seine River (Flows through Paris)'
    },
    explanation: 'Volga discharges into the landlocked Caspian Sea; Danube flows east into the Black Sea; Rhine empties into the North Sea; Seine enters the English Channel.',
    hints: [
      'The longest European river (Volga) does NOT reach an open ocean — it enters the world’s largest lake/inland sea.',
      'The Danube travels east across central Europe to the Black Sea.',
      'Rotterdam port is at the mouth of the Rhine on the North Sea.'
    ]
  },
  {
    id: 'ch_geo_017',
    nodeId: NODE_C7_GEO_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why do major African rivers like the Congo and Zambezi feature dramatic waterfalls and rapids near their coastal exits rather than gentle navigable plains?',
    options: [
      'Africa is an ancient elevated plateau bounded by steep peripheral escarpments over which rivers must plunge',
      'Tropical monsoons reverse the flow of African rivers back into the Sahara Desert',
      'Coral reefs have grown upwards into river estuaries blocking all outlet flow',
      'African rivers are artificially dammed at every 10 km by local wildlife'
    ],
    correctIndex: 0,
    explanation: 'Africa is fundamentally a massive uplifted plateau. As rivers flow off this interior high tableland to reach the sea, they tumble over steep marginal escarpments forming rapids and waterfalls (e.g. Victoria Falls, Livingstone Falls).',
    hints: [
      'Think of Africa’s relief structure: high tableland in the center, steep drops at edges.',
      'Escarpments like the Drakensberg create abrupt elevation drops.',
      'This made river navigation from the ocean into the interior difficult historically.'
    ]
  },
  {
    id: 'ch_geo_018',
    nodeId: NODE_C7_GEO_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which of the following statements accurately characterizes Lake Victoria in contrast to Lakes Tanganyika and Malawi?',
    options: [
      'Lake Victoria is a long, extremely deep trench inside the western fault rift floor',
      'Lake Victoria sits in a shallow plateau depression between the two arms of the Great Rift Valley, while Tanganyika and Malawi occupy deep rift fracture trenches',
      'Lake Victoria is a saltwater lake situated 50 meters below sea level in the Sahara',
      'Lake Victoria is completely frozen throughout the year'
    ],
    correctIndex: 1,
    explanation: 'Lakes Tanganyika and Malawi are classic narrow, fault-bounded, deep rift valley lakes. Lake Victoria occupies a broad, relatively shallow saucer basin between the eastern and western rift branches.',
    hints: [
      'Check the depth and shape: Tanganyika is the second deepest lake on Earth.',
      'Victoria is broad and shallow, serving as the chief reservoir source for the White Nile.',
      'It rests between the rift branches, not in the fracture trench itself.'
    ]
  },
  {
    id: 'ch_geo_019',
    nodeId: NODE_C7_GEO_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why is Australia structurally compared to a "giant saucer", and what is the hydrological significance of Lake Eyre?',
    options: [
      'Australia is raised in the center with oceans sloping down on all sides',
      'Australia has raised eastern highlands (Great Dividing Range) and western plateaus with a sunken central lowland containing Lake Eyre (~15m below sea level)',
      'Lake Eyre is an active volcanic crater filled with freshwater snowmelt',
      'The Great Artesian Basin floats on top of the Gibson desert sand dunes'
    ],
    correctIndex: 1,
    explanation: 'Australia has high rims (Great Dividing Range in the east, Western Plateau in the west) and a depressed center (Central Lowlands). Lake Eyre sits at the lowest point (~15m below sea level) as a vast endorheic salt basin.',
    hints: [
      'Think of a dinner plate: high rim on left and right, dip in the middle.',
      'The eastern rim catches Pacific rain; the central depression is dry and below sea level.',
      'Lake Eyre is a salt playa that fills only after episodic torrential desert rains.'
    ]
  },
  {
    id: 'ch_geo_020',
    nodeId: NODE_C7_GEO_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where is the Great Barrier Reef — the world’s largest coral reef system built by living polyps — located?',
    options: [
      'In the Indian Ocean off the southwestern coast of Perth',
      'In the Coral Sea (Pacific Ocean) along the northeastern coast of Queensland',
      'In the Southern Ocean surrounding the island of Tasmania',
      'In the Timor Sea directly north of Darwin'
    ],
    correctIndex: 1,
    explanation: 'The Great Barrier Reef stretches over 2,300 km in the warm, clear waters of the Coral Sea off Queensland on Australia’s northeastern coast.',
    hints: [
      'Coral polyps require warm tropical sea currents and clear sunlight.',
      'It faces the Pacific Ocean / Coral Sea.',
      'It runs parallel to the northeast coast of Queensland.'
    ]
  },
  {
    id: 'ch_geo_021',
    nodeId: NODE_C7_GEO_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is Antarctica classified by meteorologists as both the world’s "driest continent" and "windiest continent"?',
    options: [
      'Dense humidity causes continuous rainstorms that dry instantly into ice crystals',
      'The interior receives under 50mm annual precipitation (polar desert), while ultra-dense cold air rushes down high ice slopes under gravity as katabatic winds exceeding 200 km/h',
      'Volcanic eruptions under the ice sheet boil away atmospheric moisture',
      'The Transantarctic Mountains block all atmospheric gases from entering the South Pole'
    ],
    correctIndex: 1,
    explanation: 'Antarctica is a polar desert because extreme sub-zero temperatures hold almost zero water vapor (precipitation <50 mm/yr). Katabatic winds arise when dense, chilled air on the high interior ice plateau cascades downslope under gravity.',
    hints: [
      'Being covered in ancient ice does not mean it snows heavily today.',
      'Extreme cold freezes out all air moisture — technically making it a desert.',
      'Katabatic winds are gravity-driven cold air drainage gales.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_geo_022',
    nodeId: NODE_C7_GEO_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Under the 1959 Antarctic Treaty, what is the legal status of India’s scientific stations "Maitri" and "Bharati"?',
    options: [
      'Commercial iron and uranium mining facilities operating under sovereign territorial annexation',
      'Peaceful scientific research stations dedicated to global climate, ozone, and glaciological monitoring with strict bans on military and mining activity',
      'Military submarine naval bases guarding the Southern Ocean trade routes',
      'Permanent civilian agricultural colonies growing frost-resistant wheat'
    ],
    correctIndex: 1,
    explanation: 'The Antarctic Treaty (1959) designates the entire continent as a scientific preserve for peace, prohibiting all military activity, nuclear testing, and mineral mining. India operates Maitri and Bharati exclusively for scientific research.',
    hints: [
      'Antarctica has zero permanent civilian towns and no military bases.',
      'The Antarctic Treaty mandates international scientific cooperation.',
      'India’s stations study ice cores, atmospheric science, and ocean currents.'
    ]
  }
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
  nodeId: NODE_C7_GEO_011,
  title: 'Soil Formation & Global Physical Geography',
  definition: 'Soil formation is the pedogenic process whereby parent bedrock weathers under climatic, biological, and topographic influences across geological time to produce distinct horizontal layers (O, A, B, C, R horizons).',
  eli5: 'Soil is like a 5-layer cake that takes thousands of years to bake! Sun and rain crack the hard rocks at the bottom, while dead leaves and earthworms make rich black frosting at the very top.',
  misconceptions: [
    { misconception: 'Soil is just powdered rock that forms in a few weeks of heavy monsoon rains.', correction: 'Soil requires biological decay, humus integration, and mineral leaching taking 200 to 1,000+ years per centimeter.' },
    { misconception: 'Agents of soil erosion (water, wind) are the same as causes (deforestation, overgrazing).', correction: 'Agents are the physical forces that move soil (wind, water); causes are the human/environmental triggers that expose soil (deforestation, poor farming).' },
    { misconception: 'Agro industries locate near big cities for market access rather than near fresh crops.', correction: 'Agro raw materials like sugarcane and jute are bulky and lose value/perish within hours, forcing mills to locate right at the farm gate.' },
    { misconception: 'Coal and petroleum have identical terrestrial swamp origins.', correction: 'Coal formed from terrestrial swamp forests; petroleum originated from microscopic marine plankton buried on ocean floors.' },
    { misconception: 'Antarctica has heavy snowfall because it is completely covered in ice.', correction: 'Antarctica is a polar desert with under 50mm annual precipitation; its thick ice sheet accumulated over millions of years of sub-zero preservation.' }
  ],
  diagnosticQuestions: [
    { question: 'What is the organic-rich topmost layer of a mature soil profile called?', options: ['Bedrock', 'O/A Horizon', 'C Horizon', 'Subsoil'], correctIndex: 1 },
    { question: 'Which parent rock weathers to form moisture-retentive Black Regur soil?', options: ['Sandstone', 'Basalt Lava', 'Limestone', 'Granite'], correctIndex: 1 },
    { question: 'Why must sugar mills be located close to sugarcane fields?', options: ['High transport subsidies', 'Sucrose content drops rapidly after cutting', 'To cool boiling syrup in river water', 'Mills require ocean ports'], correctIndex: 1 },
    { question: 'What raw material acts as a flux in an iron smelting blast furnace?', options: ['Manganese', 'Limestone', 'Bauxite', 'Coking Coal'], correctIndex: 1 },
    { question: 'Which grade of coal possesses the highest carbon percentage?', options: ['Peat', 'Lignite', 'Bituminous', 'Anthracite'], correctIndex: 3 },
    { question: 'Which mountain range forms the traditional continental divide between Europe and Asia?', options: ['Alps', 'Pyrenees', 'Ural Mountains', 'Caucasus'], correctIndex: 2 },
    { question: 'What landform feature characterizes the center of Australia?', options: ['Snowy Alps', 'Central Lowlands & Lake Eyre', 'Dense Equatorial Jungle', 'Active Volcano Arc'], correctIndex: 1 },
    { question: 'What are the violent gravity-driven cold winds of Antarctica called?', options: ['Monsoons', 'Katabatic Winds', 'Westerlies', 'Trade Winds'], correctIndex: 1 }
  ],
  masteryCriteria: 'Student can describe pedogenesis horizons (O, A, B, C, R), explain industrial location factors for agro and steel plants, classify conventional and renewable energy, and identify continental physical features across Europe, Africa, Australia, and Antarctica.',
  onComplete: () => {}
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Vertical Soil Profile Simulator',
    instruction: 'Click each soil horizon layer to inspect its composition, texture, and ecological role.',
    interactionType: 'click-profile',
    nodeId: NODE_C7_GEO_011
  },
  {
    title: '2. Pedogenesis Rate & Weathering Factors',
    instruction: 'Adjust the Rainfall and Temperature sliders to observe how climate speeds up mineral weathering and humus decay.',
    interactionType: 'slider-weathering',
    nodeId: NODE_C7_GEO_011
  },
  {
    title: '3. Agro vs Heavy Industry Locator',
    instruction: 'Toggle between Cotton/Sugar (Agro) and Iron & Steel (Heavy) to inspect the Blast Furnace smelting reaction and transport economics.',
    interactionType: 'toggle-industry',
    nodeId: NODE_C7_GEO_012
  },
  {
    title: '4. Conventional vs Renewable Energy Grid',
    instruction: 'Test energy outputs and pollution meters by shifting power generation between Coal and Solar/Wind/Hydel.',
    interactionType: 'slider-energy',
    nodeId: NODE_C7_GEO_014
  },
  {
    title: '5. Continental Physical Features Explorer',
    instruction: 'Select Europe, Africa, Australia, or Antarctica to examine relief profiles and geological structures.',
    interactionType: 'click-continent',
    nodeId: NODE_C7_GEO_016
  }
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If annual rainfall is increased from 200 mm (Arid Desert) to 2,500 mm (Humid Tropics), what will happen to soluble silica in the soil?',
    options: [
      'Silica will crystalize into solid rock and make topsoil thicker',
      'Intense rainwater percolation will leach silica downward, leaving iron-aluminium Laterite soil',
      'Silica will turn into dark black organic humus',
      'No change in chemical composition will occur'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide Rainfall to 2,500 mm in the simulator and observe the leaching rate meter!'
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Field Geographer: Local Soil & Resource Survey',
  description: 'Take a trowel into your school garden or local park. Dig a shallow 15 cm cross-section to observe the transition from dark O/A humus to lighter subsoil. Identify whether your town relies on agro-industry produce or mineral supply lines.',
  steps: [
    'Measure the depth of the dark topsoil layer in centimeters.',
    'Test moisture retention by squeezing a damp soil clump (clay vs sand).',
    'Identify whether your local electricity comes from thermal coal plants, hydel dams, or solar arrays.',
    'Locate on a world globe the continent lying directly antipodal to your latitude.'
  ]
};

// ─── MAIN SIMULATION COMPONENT ───
export function C7_GeographySoilFormationSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C7_GEO_011,
    title = DEFAULT_PROPS.title || 'Soil Formation & Global Physical Geography',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete
  } = props;

  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌍', color: 'emerald' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── PREDICT & OBSERVE STATE ─��─
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // ─── OBSERVATION QUESTIONS STATE (Brilliant.org "What do you notice?" Pattern) ───
  const [selectedObsAnswers, setSelectedObsAnswers] = useState<Record<string, number>>({});
  const [obsAnswered, setObsAnswered] = useState<Record<string, boolean>>({});

  // ─── SIMULATION INTERACTIVE STATE ───
  const [selectedHorizon, setSelectedHorizon] = useState<'O' | 'A' | 'B' | 'C' | 'R'>('A');
  const [rainfallMm, setRainfallMm] = useState<number>(1200);
  const [temperatureC, setTemperatureC] = useState<number>(25);
  const [vegetationDensity, setVegetationDensity] = useState<number>(75);
  const [slopeGradient, setSlopeGradient] = useState<number>(15);
  const [timeElapsedYears, setTimeElapsedYears] = useState<number>(2000);

  // Industry & Energy state
  const [industryType, setIndustryType] = useState<'cotton' | 'sugar' | 'steel'>('steel');
  const [transportDistanceKm, setTransportDistanceKm] = useState<number>(30);
  const [energyMixCoal, setEnergyMixCoal] = useState<number>(65);
  const [energyMixRenewable, setEnergyMixRenewable] = useState<number>(35);

  // Continent state
  const [activeContinent, setActiveContinent] = useState<'europe' | 'africa' | 'australia' | 'antarctica'>('africa');

  // ─── ADAPTIVE & SRS STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── HINTS & REVEAL ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── INTERACTION INPUTS ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── FEEDBACK EFFECTS ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── COMPUTED WEATHERING & LEACHING DATA ───
  const weatheringRate = useMemo(() => {
    const base = (rainfallMm / 1000) * (temperatureC / 10);
    const vegetationBonus = vegetationDensity / 50;
    const slopePenalty = slopeGradient > 30 ? 0.6 : 1.0;
    return Math.min(100, Math.max(10, Math.round(base * vegetationBonus * slopePenalty * 15)));
  }, [rainfallMm, temperatureC, vegetationDensity, slopeGradient]);

  const topsoilDepthCm = useMemo(() => {
    const rate = weatheringRate / 20;
    const yearsFactor = timeElapsedYears / 500;
    const erosionLoss = (slopeGradient / 45) * (rainfallMm / 1500) * (1 - vegetationDensity / 120);
    const depth = rate * yearsFactor - erosionLoss * 8;
    return Math.max(1, Math.min(45, Math.round(depth * 10) / 10));
  }, [weatheringRate, timeElapsedYears, slopeGradient, rainfallMm, vegetationDensity]);

  const soilClimateData = useMemo(() => [
    { month: 'Jan', rain: Math.round(rainfallMm * 0.02), temp: temperatureC - 8, weathering: Math.round(weatheringRate * 0.6) },
    { month: 'Mar', rain: Math.round(rainfallMm * 0.05), temp: temperatureC - 3, weathering: Math.round(weatheringRate * 0.8) },
    { month: 'May', rain: Math.round(rainfallMm * 0.12), temp: temperatureC + 6, weathering: Math.round(weatheringRate * 1.1) },
    { month: 'Jul', rain: Math.round(rainfallMm * 0.40), temp: temperatureC + 4, weathering: Math.round(weatheringRate * 1.4) },
    { month: 'Sep', rain: Math.round(rainfallMm * 0.28), temp: temperatureC + 2, weathering: Math.round(weatheringRate * 1.2) },
    { month: 'Nov', rain: Math.round(rainfallMm * 0.08), temp: temperatureC - 5, weathering: Math.round(weatheringRate * 0.7) },
  ], [rainfallMm, temperatureC, weatheringRate]);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
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

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS PARTICLE ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; speed: number; size: number; color: string }[] = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        size: 1.5 + Math.random() * 2.5,
        color: Math.random() > 0.5 ? '#38bdf8' : '#ca8a04'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y += p.speed * (rainfallMm / 1000);
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rainfallMm]);

  // ─── TIMERS & CLEANUP ───
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

  // ─── HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && challenge.hints[nextLvl - 1]) {
      const hintMsg = challenge.hints[nextLvl - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Excellent scientific intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleObservationAnswer = useCallback((qId: string, optIdx: number, correctIdx: number, explanation: string) => {
    setSelectedObsAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setObsAnswered(prev => ({ ...prev, [qId]: true }));
    const isCorr = optIdx === correctIdx;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Observation verified! ' + explanation : explanation);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Physical Geography Laboratory. Let us explore pedogenesis and Earth resources.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Prepare for competency-based geographical challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now test your prediction by manipulating the active variables in real time!');
  }, []);

  const handleHorizonSelect = useCallback((h: 'O' | 'A' | 'B' | 'C' | 'R') => {
    setSelectedHorizon(h);
    audioManager.play('tap');
    const labels: Record<string, string> = {
      O: 'O Horizon: Leaf litter and undecomposed dark organic humus.',
      A: 'A Horizon: Mineral topsoil blended with organic matter. Root zone.',
      B: 'B Horizon: Subsoil with leached iron oxides and clay accumulations.',
      C: 'C Horizon: Weathered parent rock fragments.',
      R: 'R Horizon: Unweathered impermeable solid bedrock.'
    };
    speechManager.speak(labels[h]);
  }, []);

  const handleRainfallChange = useCallback((val: number) => {
    setRainfallMm(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && val > 2000) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleTempChange = useCallback((val: number) => {
    setTemperatureC(val);
    audioManager.play('count');
  }, []);

  const handleDragStart = useCallback((lbl: string) => {
    setDraggedItem(lbl);
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

  const handleSortMove = useCallback((from: number, to: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Expedition complete! You scored ${finalScore} percent with mastery ${masteryLevel}.`);
  }, [errors, masteryLevel, onComplete]);

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
      speechManager.speak('Geographically accurate! Well done.');
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
        speechManager.speak('Let us study the complete geographical breakdown together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950/40"
            aria-label="Geography Simulation"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
              <span>ICSE Class 7 Geography</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Pedogenesis & Global Resources</span>
            </p>
          </div>
        </div>

        {/* TOP STATUS BAR */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center gap-2">
            <span className="text-slate-400">Mastery:</span>
            <span className="font-bold text-emerald-400 capitalize">{masteryLevel}</span>
          </div>
          <motion.div
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' :
              difficulty === 'standard' ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300' :
              'bg-amber-950/60 border-amber-500 text-amber-300'
            }`}
          >
            {difficulty}
          </motion.div>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-800/50 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🗺️ Geographical Expedition Hook</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Discovery Question (Non-Graded)</span>
              <span className="text-xs text-slate-400">Test Your Intuition</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-white mb-4">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700/80 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-700/50 flex items-center justify-center text-xs font-bold text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {discoveryAnswered && (
                      <span className="font-bold text-sm">
                        {i === DISCOVERY_QUESTION.correctIndex ? '✓ Correct' : '✗'}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p className={discoveryCorrect ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold'}>
                    {discoveryCorrect ? '✓ Spot-On!' : '💡 Interesting hypothesis!'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter visual laboratory"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-900/50 whitespace-nowrap"
                >
                  Enter Visual Laboratory →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE ���── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* STEP INDICATOR BAR */}
          <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  aria-label={`Slide ${idx + 1}: ${step.title}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    currentSlide === idx
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {idx + 1}. {step.title.split('.')[1]}
                </motion.button>
              ))}
            </div>
            <span className="text-xs font-black text-slate-400 ml-3 whitespace-nowrap">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
          </div>

          {/* MAIN INTERACTIVE VISUALIZER CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              <div>
                <h3 className="text-lg font-black text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs text-amber-300 font-semibold mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── SLIDE 0: SVG DIAGRAM #1 - SOIL PROFILE CROSS SECTION ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center relative">
                    <canvas ref={canvasRef} width={380} height={320} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />
                    <svg viewBox="0 0 400 320" className="w-full h-auto max-h-[320px]" aria-label="Soil Horizon Profile Cross Section Diagram">
                      <g onClick={() => handleHorizonSelect('O')} role="button" tabIndex={0} aria-label="Select O Horizon" className="cursor-pointer group">
                        <rect x="30" y="20" width="340" height="35" rx="6" fill="#3f2e1a" stroke={selectedHorizon === 'O' ? '#22c55e' : '#78350f'} strokeWidth={selectedHorizon === 'O' ? 3 : 1} />
                        <text x="50" y="42" fill="#fef08a" fontSize="12" fontWeight="bold">O Horizon — Humus & Fresh Leaf Litter</text>
                        <text x="340" y="42" fill="#cbd5e1" fontSize="10">0–5 cm</text>
                      </g>

                      <g onClick={() => handleHorizonSelect('A')} role="button" tabIndex={0} aria-label="Select A Horizon" className="cursor-pointer group">
                        <rect x="30" y="60" width="340" height="65" rx="6" fill="#1c1917" stroke={selectedHorizon === 'A' ? '#22c55e' : '#44403c'} strokeWidth={selectedHorizon === 'A' ? 3 : 1} />
                        <text x="50" y="88" fill="#a3e635" fontSize="13" fontWeight="bold">A Horizon — Topsoil (Humus + Minerals)</text>
                        <text x="50" y="106" fill="#94a3b8" fontSize="10">Seed Germination & Biological Root Activity</text>
                        <text x="340" y="95" fill="#cbd5e1" fontSize="10">5–25 cm</text>
                        <path d="M 120 70 Q 140 85 160 75 T 200 80" stroke="#ca8a04" strokeWidth="2" fill="none" />
                        <path d="M 280 65 Q 290 85 275 105" stroke="#15803d" strokeWidth="1.5" fill="none" />
                      </g>

                      <g onClick={() => handleHorizonSelect('B')} role="button" tabIndex={0} aria-label="Select B Horizon" className="cursor-pointer group">
                        <rect x="30" y="130" width="340" height="65" rx="6" fill="#7c2d12" stroke={selectedHorizon === 'B' ? '#22c55e' : '#9a3412'} strokeWidth={selectedHorizon === 'B' ? 3 : 1} />
                        <text x="50" y="158" fill="#fdba74" fontSize="13" fontWeight="bold">B Horizon — Subsoil (Leached Minerals & Clays)</text>
                        <text x="50" y="176" fill="#cbd5e1" fontSize="10">Iron Oxides & Silicates accumulation zone</text>
                        <text x="330" y="165" fill="#cbd5e1" fontSize="10">25–75 cm</text>
                      </g>

                      <g onClick={() => handleHorizonSelect('C')} role="button" tabIndex={0} aria-label="Select C Horizon" className="cursor-pointer group">
                        <rect x="30" y="200" width="340" height="55" rx="6" fill="#475569" stroke={selectedHorizon === 'C' ? '#22c55e' : '#64748b'} strokeWidth={selectedHorizon === 'C' ? 3 : 1} />
                        <text x="50" y="228" fill="#e2e8f0" fontSize="12" fontWeight="bold">C Horizon — Weathered Parent Fragments</text>
                        <text x="50" y="244" fill="#94a3b8" fontSize="10">Partially cracked rock chunks from bedrock below</text>
                        <text x="330" y="235" fill="#cbd5e1" fontSize="10">75–120 cm</text>
                      </g>

                      <g onClick={() => handleHorizonSelect('R')} role="button" tabIndex={0} aria-label="Select R Horizon" className="cursor-pointer group">
                        <rect x="30" y="260" width="340" height="45" rx="6" fill="#1e293b" stroke={selectedHorizon === 'R' ? '#22c55e' : '#334155'} strokeWidth={selectedHorizon === 'R' ? 3 : 1} />
                        <text x="50" y="288" fill="#94a3b8" fontSize="12" fontWeight="bold">R Horizon — Unweathered Solid Bedrock</text>
                        <text x="330" y="288" fill="#64748b" fontSize="10">120+ cm</text>
                      </g>
                    </svg>
                  </div>

                  {/* Horizon Inspector Details */}
                  <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase">Selected Horizon Inspector</span>
                        <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-black text-sm border border-emerald-700">
                          Horizon {selectedHorizon}
                        </span>
                      </div>

                      {selectedHorizon === 'O' && (
                        <div className="space-y-2 text-xs text-slate-300">
                          <p className="font-bold text-amber-300">Organic Leaf Litter Layer</p>
                          <p>Consists of freshly fallen leaves, twigs, decomposing forest debris, and surface mosses.</p>
                          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            <strong>Key Characteristic:</strong> High biological activity; turns directly into dark rich humus through microbial action.
                          </div>
                        </div>
                      )}

                      {selectedHorizon === 'A' && (
                        <div className="space-y-2 text-xs text-slate-300">
                          <p className="font-bold text-lime-400">Topsoil (The Breadbasket of Nature)</p>
                          <p>Finely mixed organic humus and decomposed parent mineral grains. Dark brown/black in color.</p>
                          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            <strong>Critical Exam Note:</strong> This is the zone where crop roots absorb nitrogen and phosphorus. Easily lost through sheet erosion if unprotected!
                          </div>
                        </div>
                      )}

                      {selectedHorizon === 'B' && (
                        <div className="space-y-2 text-xs text-slate-300">
                          <p className="font-bold text-orange-400">Subsoil (Zone of Illuviation)</p>
                          <p>Contains leached iron, aluminium, and clay minerals percolated down by rainwater from Horizons O and A.</p>
                          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            <strong>Color Indicator:</strong> Often yellowish-red due to iron oxide accumulation. Less organic matter than A.
                          </div>
                        </div>
                      )}

                      {selectedHorizon === 'C' && (
                        <div className="space-y-2 text-xs text-slate-300">
                          <p className="font-bold text-slate-200">Parent Material (Regolith)</p>
                          <p>Cracked, angular rock fragments partially altered by physical and chemical weathering.</p>
                          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            <strong>Formation Role:</strong> Directly reflects the chemical mineralogy of the underlying mother rock.
                          </div>
                        </div>
                      )}

                      {selectedHorizon === 'R' && (
                        <div className="space-y-2 text-xs text-slate-300">
                          <p className="font-bold text-cyan-400">Bedrock (Mother Stone)</p>
                          <p>Continuous solid unweathered geological stratum (Basalt, Granite, Sandstone, or Limestone).</p>
                          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            <strong>Foundation:</strong> Impermeable base that supports the entire pedosphere above.
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>Mnemonic Aid:</span>
                      <span className="text-amber-300 font-mono font-bold">"Old Animals Bring Crumbs to Rocks"</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: WEATHERING & PEDOGENESIS SLIDERS + RECHARTS + OBSERVATION ─── */}
              {currentSlide === 1 && (
                <div className="space-y-5">
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800/80">
                      <p className="text-xs font-bold text-indigo-300 uppercase mb-2">⚡ Predict-Then-Check Experiment</p>
                      <p className="text-sm font-bold text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(idx)}
                            aria-label={`Predict option ${idx + 1}: ${opt}`}
                            className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-left text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
                      <span className="text-xs text-amber-300 font-semibold">
                        {predictionVerified ? '✓ Prediction Verified! High rainfall leaches silica, concentrating Laterite oxides.' : PREDICTION_QUESTIONS[0].verifyInstruction}
                      </span>
                      <span className="text-xs font-bold px-2 py-1 rounded bg-slate-700 text-slate-200">
                        Prediction #{predictionIndex + 1}
                      </span>
                    </div>
                  )}

                  {/* Sliders Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Annual Rainfall:</span>
                        <span className="font-bold text-cyan-400">{rainfallMm} mm</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={3000}
                        step={50}
                        value={rainfallMm}
                        onChange={(e) => handleRainfallChange(Number(e.target.value))}
                        aria-label="Annual Rainfall Slider"
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Avg Temperature:</span>
                        <span className="font-bold text-amber-400">{temperatureC}°C</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={45}
                        step={1}
                        value={temperatureC}
                        onChange={(e) => handleTempChange(Number(e.target.value))}
                        aria-label="Average Temperature Slider"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Vegetation Density:</span>
                        <span className="font-bold text-emerald-400">{vegetationDensity}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={vegetationDensity}
                        onChange={(e) => {
                          setVegetationDensity(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Vegetation Density Slider"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Slope Gradient:</span>
                        <span className="font-bold text-rose-400">{slopeGradient}°</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={45}
                        step={1}
                        value={slopeGradient}
                        onChange={(e) => {
                          setSlopeGradient(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Slope Gradient Slider"
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Dynamic Weathering Rates Chart & Gauge */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-slate-400 mb-2">Seasonal Weathering & Rainfall Intensity Curve</p>
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={soilClimateData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                            <YAxis stroke="#64748b" fontSize={10} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                            <Area type="monotone" dataKey="weathering" stroke="#10b981" fill="#10b981" fillOpacity={0.25} name="Weathering Index" />
                            <Area type="monotone" dataKey="rain" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} name="Rain (mm)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="lg:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-400">Computed Topsoil Depth</span>
                        <div className="text-3xl font-black text-emerald-400 mt-1">{topsoilDepthCm} cm</div>
                        <p className="text-xs text-slate-400 mt-1">
                          {slopeGradient > 25 ? '⚠️ High erosion on steep slope!' : 'Stable accumulation on gentle slope.'}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Weathering Index:</span>
                          <span className="font-bold text-teal-300">{weatheringRate} / 100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Soil Type Tendency:</span>
                          <span className="font-bold text-amber-300">
                            {rainfallMm > 2000 ? 'Laterite (Leached)' : rainfallMm < 400 ? 'Arid Sandy' : 'Alluvial / Black'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── OBSERVATION CARD 1 (Brilliant.org "What do you notice?") ── */}
                  <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🔬 Observation Check #1: What do you notice?</span>
                      <span className="text-[11px] text-slate-400">Interactive Simulation Insight</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-200">
                      {OBSERVATION_QUESTIONS[0].question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => {
                        const isSelected = selectedObsAnswers[OBSERVATION_QUESTIONS[0].id] === oIdx;
                        const isAnswered = obsAnswered[OBSERVATION_QUESTIONS[0].id];
                        const isCorrect = oIdx === OBSERVATION_QUESTIONS[0].correctIndex;
                        return (
                          <motion.button
                            key={oIdx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservationAnswer(OBSERVATION_QUESTIONS[0].id, oIdx, OBSERVATION_QUESTIONS[0].correctIndex, OBSERVATION_QUESTIONS[0].explanation)}
                            disabled={isAnswered}
                            aria-label={`Observation option ${oIdx + 1}: ${opt}`}
                            className={`p-2.5 rounded-lg text-left text-xs font-medium transition-all border ${
                              isAnswered
                                ? isCorrect
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                                  : isSelected
                                    ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                                    : 'bg-slate-900/40 border-slate-800 text-slate-500'
                                : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-300'
                            }`}
                          >
                            <span className="mr-2 font-bold text-slate-400">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </motion.button>
                        );
                      })}
                    </div>
                    {obsAnswered[OBSERVATION_QUESTIONS[0].id] && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
                        <strong className="text-emerald-400">Geographical Reason:</strong> {OBSERVATION_QUESTIONS[0].explanation}
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: SVG DIAGRAM #2 - BLAST FURNACE & INDUSTRY LOCATOR ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {(['cotton', 'sugar', 'steel'] as const).map((ind) => (
                      <motion.button
                        key={ind}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIndustryType(ind);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select industry: ${ind}`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                          industryType === ind
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-950'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {ind === 'cotton' ? '🌾 Cotton Textile (Agro)' : ind === 'sugar' ? '🍬 Sugar Mill (Agro)' : '🏭 Iron & Steel (Heavy)'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* SVG Diagram 2: Blast Furnace Smelting Reactions */}
                    <div className="md:col-span-5 flex flex-col items-center">
                      <svg viewBox="0 0 280 260" className="w-full max-w-[260px] h-auto" aria-label="Blast Furnace Smelting Schematic Diagram">
                        {/* Furnace Shell */}
                        <path d="M 90 20 L 190 20 L 210 160 L 180 230 L 100 230 L 70 160 Z" fill="#334155" stroke="#64748b" strokeWidth="2" />
                        {/* Charge Top */}
                        <rect x="105" y="10" width="70" height="15" rx="3" fill="#64748b" />
                        <text x="140" y="21" fill="#f8fafc" fontSize="8" fontWeight="bold" textAnchor="middle">Ore + Coke + Flux</text>
                        {/* Heat Zones */}
                        <path d="M 85 90 L 195 90 L 205 150 L 75 150 Z" fill="#ea580c" opacity="0.8" />
                        <text x="140" y="125" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">Smelting Zone ~1500°C</text>
                        {/* Molten Layers */}
                        <rect x="95" y="195" width="90" height="15" fill="#ca8a04" />
                        <text x="140" y="206" fill="#fef08a" fontSize="9" fontWeight="bold" textAnchor="middle">Slag Layer (Limestone Flux)</text>
                        <rect x="100" y="210" width="80" height="18" fill="#dc2626" />
                        <text x="140" y="223" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Molten Pig Iron</text>
                        {/* Tuyere Blasts */}
                        <path d="M 50 175 L 75 175" stroke="#38bdf8" strokeWidth="4" />
                        <text x="45" y="168" fill="#38bdf8" fontSize="8">Hot Air Blast</text>
                        <path d="M 230 175 L 205 175" stroke="#38bdf8" strokeWidth="4" />
                      </svg>
                      <span className="text-[11px] text-slate-400 mt-2 text-center">Blast Furnace Fluxing & Smelting Process</span>
                    </div>

                    <div className="md:col-span-7 space-y-3 text-xs">
                      <span className="text-xs font-bold text-emerald-400 uppercase">Locational Factor Matrix</span>

                      {industryType === 'cotton' && (
                        <div className="space-y-2">
                          <p className="text-sm font-bold text-white">Cotton Textile Locational Drivers:</p>
                          <ul className="space-y-1.5 text-slate-300">
                            <li>• <strong>Humid Atmosphere:</strong> Crucial to prevent cotton yarn from snapping on power spinning frames.</li>
                            <li>• <strong>Raw Material Proximity:</strong> Deccan Trap black soil belt (Maharashtra, Gujarat).</li>
                            <li>• <strong>Transport Port:</strong> Natural harbour at Mumbai for machinery imports and finished cloth exports.</li>
                            <li>• <strong>Major Centers:</strong> Mumbai (1854), Ahmedabad, Surat, Coimbatore.</li>
                          </ul>
                        </div>
                      )}

                      {industryType === 'sugar' && (
                        <div className="space-y-2">
                          <p className="text-sm font-bold text-white">Sugar Industry Locational Drivers:</p>
                          <ul className="space-y-1.5 text-slate-300">
                            <li>• <strong>Seasonal Crushing:</strong> Operates only Nov–March during harvest.</li>
                            <li>• <strong>Perishability:</strong> Sucrose content drops rapidly within 24–48 hours of cutting.</li>
                            <li>• <strong>Weight-Losing Raw Material:</strong> Sugar yield is only ~10-12% of cane weight; factory must sit directly beside cane fields.</li>
                            <li>• <strong>Major Producer:</strong> Uttar Pradesh (largest), followed by Maharashtra.</li>
                          </ul>
                        </div>
                      )}

                      {industryType === 'steel' && (
                        <div className="space-y-2">
                          <p className="text-sm font-bold text-white">Iron & Steel Locational Drivers:</p>
                          <ul className="space-y-1.5 text-slate-300">
                            <li>• <strong>4 Heavy Raw Materials:</strong> Iron Ore (source), Coking Coal (heat + reducing agent), Limestone (flux/slag), Manganese (hardening).</li>
                            <li>• <strong>Freight Bulk:</strong> Materials are heavy; plants cluster near Jharia coal & Noamundi iron mines.</li>
                            <li>• <strong>Pioneering Plant:</strong> TISCO at Jamshedpur (1907) by Subarnarekha river.</li>
                            <li>• <strong>Collaborations:</strong> Bhilai (Russia), Rourkela (Germany), Durgapur (UK).</li>
                          </ul>
                        </div>
                      )}

                      {/* Distance & Freight Loss */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Transport Distance from Raw Source:</span>
                          <span className="font-bold text-cyan-400">{transportDistanceKm} km</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={250}
                          step={5}
                          value={transportDistanceKm}
                          onChange={(e) => {
                            setTransportDistanceKm(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Transport distance from source"
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                        <div className="flex justify-between mt-2 pt-2 border-t border-slate-800 text-xs">
                          <span className="text-slate-400">Raw Input Viability:</span>
                          <span className={`font-bold ${transportDistanceKm > 80 && industryType === 'sugar' ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {industryType === 'sugar' && transportDistanceKm > 80 ? '✗ Severe Sucrose Loss' : '✓ Highly Viable'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: ENERGY GRID (CONVENTIONAL VS NON-CONVENTIONAL) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 space-y-3">
                      <span className="text-xs font-bold text-cyan-400 uppercase">National Energy Transition Simulator</span>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300">Coal Thermal Generation:</span>
                          <span className="font-bold text-rose-400">{energyMixCoal}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={energyMixCoal}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setEnergyMixCoal(val);
                            setEnergyMixRenewable(100 - val);
                            audioManager.play('count');
                          }}
                          aria-label="Coal Energy Percentage Slider"
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Carbon & Fly Ash Emissions:</span>
                          <span className="font-bold text-rose-400">{Math.round(energyMixCoal * 12.5)} Tons/hr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Clean Energy (Solar/Wind/Tidal):</span>
                          <span className="font-bold text-emerald-400">{energyMixRenewable}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">300 Sunny Days Solar Index:</span>
                          <span className="font-bold text-amber-300">Active (Tropical Zone)</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-2 text-xs text-slate-300">
                      <span className="text-xs font-bold text-amber-400 uppercase">Key Indian Energy Geography</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                          <strong className="text-emerald-400 block">Wind Capital:</strong>
                          Muppandal (Tamil Nadu), Kutch (Gujarat).
                        </div>
                        <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                          <strong className="text-cyan-400 block">Offshore Petroleum:</strong>
                          Mumbai High (Arabian Sea), Digboi (Assam 1889).
                        </div>
                        <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                          <strong className="text-orange-400 block">Geothermal Springs:</strong>
                          Manikaran (HP), Puga Valley (Ladakh).
                        </div>
                        <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                          <strong className="text-purple-400 block">Nuclear Atomic:</strong>
                          Tarapur (MH), Kakrapar (GJ), Kalpakkam (TN).
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: SVG DIAGRAM #3 - CONTINENTAL RELIEF + OBSERVATION #2 ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {(['europe', 'africa', 'australia', 'antarctica'] as const).map((cont) => (
                      <motion.button
                        key={cont}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setActiveContinent(cont);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select continent: ${cont}`}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all border ${
                          activeContinent === cont
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-950'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {cont}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 space-y-3 text-xs">
                      {activeContinent === 'europe' && (
                        <div className="space-y-2">
                          <span className="text-sm font-bold text-indigo-300">Europe — "Peninsula of Peninsulas" (10.18M sq km)</span>
                          <p className="text-slate-300">• <strong>Lat/Long:</strong> 35°N to 71°N; 10°W to 60°E.</p>
                          <p className="text-slate-300">• <strong>Boundaries:</strong> Arctic (N), Mediterranean (S), Atlantic (W), Ural Mountains (E to Asia).</p>
                          <p className="text-slate-300">• <strong>Key Rivers:</strong> Volga (longest, 3,530km to Caspian Sea), Danube (to Black Sea), Rhine (North Sea).</p>
                          <p className="text-slate-300">• <strong>Climate Moderation:</strong> North Atlantic Drift keeps western maritime ports ice-free.</p>
                        </div>
                      )}

                      {activeContinent === 'africa' && (
                        <div className="space-y-2">
                          <span className="text-sm font-bold text-indigo-300">Africa — The Plateau Continent (30.37M sq km)</span>
                          <p className="text-slate-300">• <strong>Lat/Long:</strong> 37°N to 35°S (crosses Equator, Cancer, Capricorn).</p>
                          <p className="text-slate-300">• <strong>Great Rift Valley:</strong> Giant fault trench from Red Sea to Mozambique with deep lakes (Tanganyika, Malawi).</p>
                          <p className="text-slate-300">• <strong>Longest River:</strong> Nile (6,650 km flowing North to Mediterranean).</p>
                          <p className="text-slate-300">• <strong>Plateau Escarpments:</strong> Drakensberg causes spectacular river waterfalls.</p>
                        </div>
                      )}

                      {activeContinent === 'australia' && (
                        <div className="space-y-2">
                          <span className="text-sm font-bold text-indigo-300">Australia — The Saucer Continent (7.68M sq km)</span>
                          <p className="text-slate-300">• <strong>Lat/Long:</strong> 10°S to 44°S; 113°E to 154°E (Southern & Eastern Hemispheres).</p>
                          <p className="text-slate-300">• <strong>Relief Belts:</strong> Eastern Highlands (Great Dividing Range) → Central Lowlands (Lake Eyre -15m) → Western Plateau (Sandy, Gibson, Victoria Deserts).</p>
                          <p className="text-slate-300">• <strong>World Wonder:</strong> Great Barrier Reef (2,300 km in Coral Sea).</p>
                          <p className="text-slate-300">• <strong>River System:</strong> Murray-Darling.</p>
                        </div>
                      )}

                      {activeContinent === 'antarctica' && (
                        <div className="space-y-2">
                          <span className="text-sm font-bold text-indigo-300">Antarctica — The Frozen White Continent (14M sq km)</span>
                          <p className="text-slate-300">• <strong>Location:</strong> Entirely south of 66.5°S (Antarctic Circle) to 90°S South Pole.</p>
                          <p className="text-slate-300">• <strong>Physical Records:</strong> Coldest (-89°C at Vostok), Driest (polar desert &lt;50mm rain), Windiest (Katabatic winds &gt;200 km/h).</p>
                          <p className="text-slate-300">• <strong>Ice Sheet:</strong> Covers 98% (up to 4.8 km thick); Transantarctic Mountains split East & West.</p>
                          <p className="text-slate-300">• <strong>Indian Research Stations:</strong> Maitri (1989), Bharati (2012) under 1959 Treaty.</p>
                        </div>
                      )}
                    </div>

                    {/* SVG Diagram 3: Continental Cross-Section Relief Profile */}
                    <div className="lg:col-span-5 bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
                      <svg viewBox="0 0 300 180" className="w-full h-auto" aria-label="Continental Physical Cross-Section Profile Diagram">
                        {activeContinent === 'australia' ? (
                          <g>
                            {/* Australia Saucer Profile */}
                            <path d="M 20 120 L 70 80 L 110 95 L 170 145 L 240 70 L 280 130" fill="none" stroke="#38bdf8" strokeWidth="3" />
                            <text x="50" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle">Western Plateau</text>
                            <text x="170" y="160" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">Lake Eyre (-15m)</text>
                            <text x="245" y="60" fill="#a3e635" fontSize="9" fontWeight="bold" textAnchor="middle">Great Dividing Range</text>
                            <circle cx="170" cy="145" r="4" fill="#f43f5e" />
                          </g>
                        ) : activeContinent === 'africa' ? (
                          <g>
                            {/* Africa Plateau & Rift Valley */}
                            <path d="M 20 140 L 50 70 L 120 70 L 140 130 L 160 70 L 250 70 L 280 140" fill="none" stroke="#fb923c" strokeWidth="3" />
                            <text x="80" y="60" fill="#cbd5e1" fontSize="9" textAnchor="middle">High Plateau</text>
                            <text x="140" y="150" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">Rift Trench / Lakes</text>
                            <text x="260" y="125" fill="#facc15" fontSize="8" textAnchor="middle">Escarpment Falls</text>
                          </g>
                        ) : activeContinent === 'europe' ? (
                          <g>
                            {/* Europe Alps & Plain */}
                            <path d="M 20 120 L 80 110 L 130 50 L 170 115 L 240 100 L 280 60" fill="none" stroke="#818cf8" strokeWidth="3" />
                            <text x="130" y="40" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">Alps Mountain Arc</text>
                            <text x="210" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">North European Plain</text>
                            <text x="275" y="50" fill="#cbd5e1" fontSize="8" textAnchor="middle">Urals (Asia)</text>
                          </g>
                        ) : (
                          <g>
                            {/* Antarctica Ice Dome & Katabatic Winds */}
                            <path d="M 30 140 Q 150 20 270 140" fill="none" stroke="#e0f2fe" strokeWidth="4" />
                            <text x="150" y="45" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle">Polar Ice Plateau (3000m+)</text>
                            <path d="M 180 55 L 250 115" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                            <text x="235" y="95" fill="#38bdf8" fontSize="8" fontWeight="bold">Katabatic Winds &gt;200 km/h</text>
                          </g>
                        )}
                        <line x1="20" y1="160" x2="280" y2="160" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="150" y="173" fill="#64748b" fontSize="8" textAnchor="middle">Sea Level Datum</text>
                      </svg>
                      <span className="text-[11px] text-slate-400 mt-1 uppercase font-bold tracking-wider">{activeContinent} Relief Profile</span>
                    </div>
                  </div>

                  {/* ── OBSERVATION CARD 2 (Brilliant.org "What do you notice?") ── */}
                  <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">🔬 Observation Check #2: What do you notice?</span>
                      <span className="text-[11px] text-slate-400">Continental Profile Analysis</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-200">
                      {OBSERVATION_QUESTIONS[1].question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, oIdx) => {
                        const isSelected = selectedObsAnswers[OBSERVATION_QUESTIONS[1].id] === oIdx;
                        const isAnswered = obsAnswered[OBSERVATION_QUESTIONS[1].id];
                        const isCorrect = oIdx === OBSERVATION_QUESTIONS[1].correctIndex;
                        return (
                          <motion.button
                            key={oIdx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservationAnswer(OBSERVATION_QUESTIONS[1].id, oIdx, OBSERVATION_QUESTIONS[1].correctIndex, OBSERVATION_QUESTIONS[1].explanation)}
                            disabled={isAnswered}
                            aria-label={`Observation option ${oIdx + 1}: ${opt}`}
                            className={`p-2.5 rounded-lg text-left text-xs font-medium transition-all border ${
                              isAnswered
                                ? isCorrect
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                                  : isSelected
                                    ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                                    : 'bg-slate-900/40 border-slate-800 text-slate-500'
                                : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-300'
                            }`}
                          >
                            <span className="mr-2 font-bold text-slate-400">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </motion.button>
                        );
                      })}
                    </div>
                    {obsAnswered[OBSERVATION_QUESTIONS[1].id] && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
                        <strong className="text-indigo-400">Geographical Reason:</strong> {OBSERVATION_QUESTIONS[1].explanation}
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  aria-label="Previous Module Slide"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Module
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    aria-label="Next Module Slide"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950"
                  >
                    Next Module →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Proceed to Free Sandbox"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-900"
                  >
                    Proceed to Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase">Interactive Sandbox Mode</span>
              <h3 className="text-lg font-black text-white">Free Exploration: Manipulate Earth System Controls</h3>
              <p className="text-xs text-slate-400 mt-0.5">Test any variable combinations without grading. When confident, jump into challenges.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Challenges"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-900 whitespace-nowrap"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase">Climate & Slope Sliders</span>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Rainfall: {rainfallMm} mm</label>
                <input
                  type="range"
                  min={100}
                  max={3000}
                  step={50}
                  value={rainfallMm}
                  onChange={(e) => handleRainfallChange(Number(e.target.value))}
                  aria-label="Sandbox Rainfall Slider"
                  className="w-full accent-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Temperature: {temperatureC}°C</label>
                <input
                  type="range"
                  min={0}
                  max={45}
                  value={temperatureC}
                  onChange={(e) => handleTempChange(Number(e.target.value))}
                  aria-label="Sandbox Temperature Slider"
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase">Live Output Indicators</span>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Weathering Speed:</span>
                  <span className="font-bold text-emerald-400">{weatheringRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Topsoil Accumulation:</span>
                  <span className="font-bold text-teal-300">{topsoilDepthCm} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Leaching Profile:</span>
                  <span className="font-bold text-amber-300">{rainfallMm > 1800 ? 'Deep Laterization' : 'Moderate'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 flex flex-col justify-center">
              <p className="text-xs text-slate-400">
                Tip: High temperatures + heavy rainfall rapidly weather basalt parent rock into moisture-retaining Black soil or leached Laterite.
              </p>
              <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-semibold">
                ✓ Ready to test your mastery across all 9 ICSE Geography syllabus units?
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* CHALLENGE TOP BAR */}
          <div className="flex items-center justify-between bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono font-bold">
                  {challenge.nodeId}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold capitalize">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              <motion.span
                key={challenge.difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-1 rounded-lg font-black uppercase tracking-wider border ${
                  challenge.difficulty === 'foundation' ? 'bg-emerald-950 border-emerald-500 text-emerald-300' :
                  challenge.difficulty === 'standard' ? 'bg-cyan-950 border-cyan-500 text-cyan-300' :
                  'bg-amber-950 border-amber-500 text-amber-300'
                }`}
              >
                {challenge.difficulty}
              </motion.span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* QUESTION CARD */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 sm:p-6 bg-slate-900/90 rounded-2xl border transition-all duration-300 ${
              wrongFlash ? 'border-rose-500 bg-rose-950/40' : 'border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white mb-5 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ TYPES */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700/80 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold text-slate-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && (
                        <span className="font-bold text-xs">
                          {i === challenge.correctIndex ? '✓ Correct' : '✗'}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels onto their matching targets below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetKey) => (
                    <div
                      key={targetKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      aria-label={`Dropzone target: ${targetKey.replace('_', ' ')}`}
                      className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs font-bold text-slate-400 capitalize">Target: {targetKey.replace('_', ' ')}</span>
                      <div className="mt-2 text-sm font-bold text-emerald-300">
                        {droppedLabels[targetKey] ? (
                          <span>✓ {droppedLabels[targetKey]}</span>
                        ) : (
                          <span className="text-slate-600 italic">Drop label here...</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  aria-label="Verify Dropped Labels"
                  className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950"
                >
                  Verify Dropped Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block mb-1">Drag items to rearrange into the correct sequence:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Check Sequence"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    aria-label="Enter numeric calculation"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500 w-64"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  aria-label="Submit Calculation"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950"
                >
                  Submit Calculation
                </motion.button>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-emerald-300 text-xs font-semibold flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        aria-label={`Remove part: ${part}`}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click building blocks above to assemble the industrial chain...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Validate Chain"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950"
                >
                  Validate Chain
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-2xl bg-amber-950/40 border border-amber-700/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Step-by-Step Geographical Explanation</span>
                  <span className="text-xs text-amber-400 font-mono">NEP 2020 Concept Analysis</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-amber-200 leading-relaxed"
                    >
                      <strong className="text-amber-400">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') ? '.' : ''}
                    </motion.p>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-amber-800/60">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(r => r + 1)}
                      aria-label="Show Next Concept Step"
                      className="px-4 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold"
                    >
                      Show Next Concept Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to Next Challenge"
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Expedition →' : 'Next Challenge →'}
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
          <div className="p-6 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 rounded-2xl border border-emerald-800 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Geographical Mastery Achieved!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have successfully surveyed the 5 soil horizons of pedogenesis, agro and heavy industrial locational drivers, conventional & renewable energy reserves, and continental relief profiles.
            </p>
            <div className="flex items-center justify-center gap-6 pt-3">
              <div className="text-center">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-center">
                <span className="text-xs text-slate-400 block">Final Mastery</span>
                <span className="text-2xl font-black text-teal-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-700/80 text-xs sm:text-sm text-emerald-200 font-medium">
            {errors === 0 ? (
              <p>🌟 <strong>PERFECT SCORE!</strong> Outstanding spatial and scientific reasoning! You have mastered all ICSE Class 7 Geography physical and resource concepts.</p>
            ) : errors <= 3 ? (
              <p>👏 <strong>EXCELLENT WORK!</strong> Solid understanding of horizons, resource grids, and continental physical features. Review your minor slips below to solidify retention.</p>
            ) : (
              <p>🌱 <strong>GROWTH MINDSET:</strong> You are building deep pedological intuition! Review the misconception profile below and revisit the interactive simulators.</p>
            )}
          </div>

          {/* MISCONCEPTION PROFILE TRACKER */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/80 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Your Personalized Misconception Diagnostic</span>
              <div className="space-y-2.5">
                {hitMisconceptions.map((mIdx) => {
                  const item = misconceptions[mIdx];
                  if (!item) return null;
                  return (
                    <div key={mIdx} className="p-3 bg-slate-900 rounded-xl border border-rose-900/50 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">✗ Misconception: {item.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Fact: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SPACED REPETITION SCHEDULE */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-amber-300 block">Spaced Repetition Schedule (SM-2):</span>
              <span className="text-slate-400">Next review scheduled in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to optimize long-term memory.</span>
            </div>
            <span className="text-xl">📅</span>
          </div>

          {/* REAL WORLD FIELD ACTIVITY */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800 space-y-2 text-xs">
            <span className="text-xs font-bold text-indigo-300 uppercase">{REAL_WORLD_ACTIVITY.title}</span>
            <p className="text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-400 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                <li key={idx}>• {st}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* FEEDBACK OVERLAYS */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_GeographySoilFormationSim;
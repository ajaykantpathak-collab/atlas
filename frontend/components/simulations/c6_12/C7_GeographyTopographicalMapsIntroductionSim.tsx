'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// ���── NODE IDS ───
const NODE_C7_GEO_001 = 'c7_geo_001';
const NODE_C7_GEO_002 = 'c7_geo_002';
const NODE_C7_GEO_003 = 'c7_geo_003';
const NODE_C7_GEO_004 = 'c7_geo_004';
const NODE_C7_GEO_005 = 'c7_geo_005';
const NODE_C7_GEO_006 = 'c7_geo_006';
const NODE_C7_GEO_007 = 'c7_geo_007';
const NODE_C7_GEO_008 = 'c7_geo_008';
const NODE_C7_GEO_009 = 'c7_geo_009';
const NODE_C7_GEO_010 = 'c7_geo_010';

const ALL_NODE_IDS = [
  NODE_C7_GEO_001,
  NODE_C7_GEO_002,
  NODE_C7_GEO_003,
  NODE_C7_GEO_004,
  NODE_C7_GEO_005,
  NODE_C7_GEO_006,
  NODE_C7_GEO_007,
  NODE_C7_GEO_008,
  NODE_C7_GEO_009,
  NODE_C7_GEO_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Himalayan Expedition & Survey Mission',
  intro: 'You are an apprentice field geographer for the Survey of India stationed near Dehradun and the Garhwal Himalayas. A major geological expedition requires mapping rugged terrain, monitoring extreme weather variations, checking stratospheric ozone conditions, and evaluating rock weathering.',
  context: 'Your toolkit includes SOI 1:50,000 toposheets, meteorological sensors, atmospheric sounding data, and field geomorphology instruments. Master the landscape from ground contour to stratospheric ozone!',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'On a standard Survey of India 1:50,000 toposheet, contour lines suddenly bunch tightly together right next to a river bank. What real-world landscape feature are you looking at?',
  options: [
    'A vast flat agricultural floodplain with easy river crossings',
    'A steep cliff or gorge where the land rises rapidly over a short distance',
    'A wide seasonal desert sand dune valley',
    'A sunken subterranean cave network underneath the river bed'
  ],
  correctIndex: 1,
  hintAfter: "Contour lines join equal elevations; when crowded tightly together, height changes steeply over a tiny horizontal stretch!"
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct' | 'evaluate';
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

// ─── CHALLENGES ARRAY (22 Comprehensive Challenges across all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // 1. Toposheet Grid Reference (Foundation) - recall
  {
    id: 'ch_geo_01',
    nodeId: NODE_C7_GEO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When reading a 6-figure grid reference on an SOI toposheet, which sequence must ALWAYS be followed?',
    options: [
      'Northings first, then Eastings ("Up the stairs, then along the corridor")',
      'Eastings first, then Northings ("Along the corridor, then up the stairs")',
      'Highest elevation number followed by lowest contour value',
      'Latitude in degrees followed by longitude in minutes'
    ],
    correctIndex: 1,
    explanation: 'A 6-figure grid reference always quotes Eastings (vertical grid lines increasing eastward) first, followed by Northings (horizontal lines increasing northward). Mnemonic: Along the corridor, then up the stairs.',
    hints: [
      'Think about horizontal movement along the floor before climbing vertical stairs.',
      'Eastings measure how far east you go; Northings measure how far north.',
      'First 3 digits represent easting + tenths; last 3 represent northing + tenths.'
    ],
    misconceptionIndex: 0
  },

  // 2. Map Colours Drag-Label (Foundation) - understanding
  {
    id: 'ch_geo_02',
    nodeId: NODE_C7_GEO_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each conventional colour to the exact landscape feature it represents on an SOI toposheet.',
    dragItems: [
      { label: 'Brown', targetId: 'slot_relief' },
      { label: 'Green', targetId: 'slot_vegetation' },
      { label: 'Blue', targetId: 'slot_water' },
      { label: 'Red', targetId: 'slot_roads' }
    ],
    correctMapping: {
      slot_relief: 'Brown',
      slot_vegetation: 'Green',
      slot_water: 'Blue',
      slot_roads: 'Red'
    },
    explanation: 'Brown is reserved for contour relief and sand dunes, Green for natural vegetation/forests, Blue for perennial/seasonal water bodies, and Red for metalled roads and permanent settlements.',
    hints: [
      'Brown represents the soil and contour shape of the hills.',
      'Green is for forests and scrubland; Blue is for rivers, streams, and lakes.',
      'Red marks permanent metalled tar roads and surveyed settlements.'
    ],
    misconceptionIndex: 1
  },

  // 3. Scale Conversion Numeric (Standard) - application
  {
    id: 'ch_geo_03',
    nodeId: NODE_C7_GEO_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On an SOI 1:50,000 toposheet, you measure 6 cm between two hill peaks with your divider. What is the real ground distance in kilometres?',
    correctAnswer: 3,
    tolerance: 0.1,
    unit: 'km',
    explanation: 'At RF 1:50,000, 1 cm on the map = 50,000 cm = 500 m = 0.5 km. Therefore, 6 cm on the map = 6 × 0.5 km = 3.0 km on the ground.',
    hints: [
      'Find how many metres 1 cm represents: 50,000 cm ÷ 100 = 500 m.',
      '500 m is equal to 0.5 km on the ground for every centimetre.',
      'Multiply 6 cm by 0.5 km/cm to find total ground distance in km.'
    ],
    misconceptionIndex: 2
  },

  // 4. Atmospheric Composition Pie Analysis (Foundation) - recall
  {
    id: 'ch_geo_04',
    nodeId: NODE_C7_GEO_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the exact volumetric proportion of Nitrogen and Oxygen in dry atmospheric air?',
    options: [
      'Oxygen 78%, Nitrogen 21%, Carbon Dioxide 1%',
      'Nitrogen 78%, Oxygen 21%, Argon 0.93%, Carbon Dioxide ~0.03%',
      'Nitrogen 50%, Oxygen 40%, Water Vapour 10%',
      'Oxygen 50%, Carbon Dioxide 25%, Nitrogen 25%'
    ],
    correctIndex: 1,
    explanation: 'Nitrogen dominates the atmosphere at approximately 78.08% by volume, followed by Oxygen at 20.95% (~21%), Argon at 0.93%, and Carbon Dioxide at ~0.03-0.04%.',
    hints: [
      'Nitrogen is the abundant neutral bulk gas, not oxygen.',
      'Oxygen is approximately one-fifth (21%) of total volume.',
      'Carbon dioxide is a crucial trace gas occupying less than 0.1%.'
    ],
    misconceptionIndex: 3
  },

  // 5. Atmospheric Layers Drag-Sort (Standard) - understanding
  {
    id: 'ch_geo_05',
    nodeId: NODE_C7_GEO_005,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the 5 layers of the Earth\'s atmosphere in correct order starting from Earth\'s surface (lowest) to outer space (highest).',
    sortItems: [
      'Troposphere (0 - 18 km: all weather occurs)',
      'Stratosphere (18 - 50 km: contains Ozone layer)',
      'Mesosphere (50 - 80 km: coldest layer, meteors burn)',
      'Thermosphere / Ionosphere (80 - 400 km: radio reflection, auroras)',
      'Exosphere (>400 km: fades into space, satellites orbit)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Ascending from the ground upward: Troposphere (weather), Stratosphere (ozone layer), Mesosphere (coldest/meteors burn), Thermosphere (ionisation/radio waves), and Exosphere (outer fringe).',
    hints: [
      'The ground floor where we live and experience rain is the Troposphere.',
      'Aircraft fly in the stable Stratosphere just above the weather.',
      'Mesosphere is the middle layer; Thermosphere and Exosphere are on top.'
    ]
  },

  // 6. Stratospheric Lapse Rate vs Troposphere (Standard) - analysis
  {
    id: 'ch_geo_06',
    nodeId: NODE_C7_GEO_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does temperature DECREASE with altitude in the troposphere (lapse rate 6.5°C/km) but INCREASE with altitude in the stratosphere?',
    options: [
      'Troposphere is heated from below by Earth\'s surface radiation, while Stratosphere is heated from within by Ozone absorbing UV rays',
      'The Sun is closer to the troposphere than to the stratosphere during summer',
      'Clouds in the troposphere absorb cold space radiation, while the stratosphere has no air',
      'Wind speed is zero in the troposphere and supersonic in the stratosphere'
    ],
    correctIndex: 0,
    explanation: 'The troposphere is heated from below by terrestrial longwave radiation (cooling as you move away from the surface). The stratosphere warms with height because the ozone layer directly absorbs incoming solar ultraviolet radiation.',
    hints: [
      'Where is the heat source located for each layer?',
      'Troposphere is warmed by the Earth\'s heated crust beneath it.',
      'Ozone molecules in the upper stratosphere directly convert UV rays into thermal energy.'
    ]
  },

  // 7. Ozone Depletion Mechanism (Standard) - application
  {
    id: 'ch_geo_07',
    nodeId: NODE_C7_GEO_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which chemical agent released from older refrigerants rises to the stratosphere and catalytically destroys thousands of ozone (O₃) molecules?',
    options: [
      'Carbon monoxide (CO) from vehicular exhaust',
      'Chlorofluorocarbons (CFCs) releasing active chlorine free radicals under UV light',
      'Water vapour droplets creating acid rain',
      'Nitrogen gas bubbling from agricultural fertilisers'
    ],
    correctIndex: 1,
    explanation: 'CFCs are exceptionally stable in the lower atmosphere, migrating to the stratosphere where UV radiation breaks them apart, releasing chlorine atoms that each destroy up to 100,000 ozone molecules.',
    hints: [
      'Look for the synthetic compound containing chlorine and fluorine.',
      'The 1987 Montreal Protocol was enacted specifically to phase these out.',
      'Free chlorine radicals act as a continuous destructive catalyst for O₃.'
    ],
    misconceptionIndex: 4
  },

  // 8. Weather Instruments Construct (Standard) - application
  {
    id: 'ch_geo_08',
    nodeId: NODE_C7_GEO_008,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the official ICSE weather station instrument string for measuring Atmospheric Pressure.',
    availableParts: ['Aneroid', 'Barometer', 'measures', 'Pressure', 'in', 'millibars (mb)', 'Thermometer', 'Rain Gauge'],
    targetState: 'Aneroid Barometer measures Pressure in millibars (mb)',
    validationHint: 'Select: [Aneroid] [Barometer] [measures] [Pressure] [in] [millibars (mb)]',
    explanation: 'An aneroid barometer measures atmospheric pressure in millibars (mb) without liquids using an evacuated corrugated metal chamber.',
    hints: [
      'Start with the specific type of pressure instrument: Aneroid...',
      'Pair Barometer with the parameter it measures (Pressure).',
      'The standard meteorological unit for pressure is millibars (mb).'
    ]
  },

  // 9. Weather vs Climate Case Study (Advanced) - evaluation
  {
    id: 'ch_geo_09',
    nodeId: NODE_C7_GEO_009,
    type: 'evaluate',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A news anchor says: "Kolkata recorded 38°C with thunderstorm showers today, so Bengal\'s climate has permanently transformed into a sub-zero tundra." Evaluate this statement.',
    options: [
      'The statement is correct because daily temperature dictates the climate category immediately',
      'The anchor confused Weather (short-term daily state) with Climate (30+ year statistical average)',
      'The statement is correct because thunderstorms signify polar air mass shifts',
      'The anchor should have measured atmospheric pressure over 24 hours to confirm tundra classification'
    ],
    correctIndex: 1,
    explanation: 'Weather refers to day-to-day atmospheric conditions at a specific time and place. Climate is the aggregate pattern and average of weather observations taken over at least 30 years (WMO standard).',
    hints: [
      'Can one day of unusual rain or heat change an entire region\'s climate?',
      'How many years of consistent data are required to define a climate regime?',
      'Recall WMO standard: 30 years or more.'
    ]
  },

  // 10. Physical vs Chemical Weathering in India (Advanced) - analysis
  {
    id: 'ch_geo_10',
    nodeId: NODE_C7_GEO_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare weathering in high-altitude Ladakh vs humid Cherrapunji (Meghalaya). Which pair of processes dominates each region respectively?',
    options: [
      'Ladakh: Chemical Carbonation; Meghalaya: Thermal Exfoliation',
      'Ladakh: Frost Shattering / Freeze-Thaw; Meghalaya: Carbonation & Solution in limestone',
      'Ladakh: Oxidation of Basalt; Meghalaya: Biological Tree-root wedging only',
      'Ladakh: Spheroidal weathering; Meghalaya: Glacial plucking'
    ],
    correctIndex: 1,
    explanation: 'In cold arid Ladakh, daily freeze-thaw cycles expand water by ~9% in rock crevices causing physical frost shattering. In warm, ultra-wet Meghalaya, carbonic acid in rainwater dissolves limestone (carbonation & karstification).',
    hints: [
      'Ladakh has sub-zero nights where water freezes and expands inside cracks.',
      'Meghalaya has world-record rainfall and vast limestone cave formations.',
      'Cold climates favor mechanical frost action; hot wet climates favor chemical dissolution.'
    ]
  },

  // 11. Toposheet 4-Figure vs 6-Figure (Standard) - application
  {
    id: 'ch_geo_11',
    nodeId: NODE_C7_GEO_001,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A surveyed temple lies in a grid square bounded by Eastings 45-46 and Northings 82-83, located 3 tenths east and 7 tenths north within the square. What are its 4-figure and 6-figure grid references?',
    options: [
      '4-figure: 8245; 6-figure: 827453',
      '4-figure: 4582; 6-figure: 453827',
      '4-figure: 4683; 6-figure: 463837',
      '4-figure: 4582; 6-figure: 827453'
    ],
    correctIndex: 1,
    explanation: '4-figure grid reference identifies the bottom-left corner (Easting 45, Northing 82 → 4582). The 6-figure reference adds tenths to Easting (45 + 3 = 453) and Northing (82 + 7 = 827) → 453827.',
    hints: [
      'Start with the bottom-left corner for 4-figure: Easting 45, Northing 82.',
      'Always place Easting tenths immediately after Easting number.',
      'Easting (45 + 3) + Northing (82 + 7) = 453827.'
    ]
  },

  // 12. Stevenson Screen Design Criteria (Advanced) - creativity/design
  {
    id: 'ch_geo_12',
    nodeId: NODE_C7_GEO_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why is a Stevenson Screen painted white with double louvred sides and mounted 1.2 m above natural grass ground?',
    options: [
      'White reflects direct solar radiation; louvres allow free air circulation while blocking rain; 1.2 m height avoids ground terrestrial heat radiation',
      'White blends with winter snow; louvres trap warm air; 1.2 m prevents cows from jumping inside',
      'It creates an airtight vacuum chamber required for mercury condensation',
      'It magnifies wind speed so cup anemometers spin twice as quickly'
    ],
    correctIndex: 0,
    explanation: 'Standard meteorological standards require white paint to reflect solar radiation, louvres (slanted slats) for ventilation without direct sunlight or precipitation entry, and 1.2 m elevation over grass to eliminate artificial ground conduction heat.',
    hints: [
      'Why do we wear white in summer? To reflect sunlight!',
      'Louvres act like window blinds letting breeze through while blocking sun rays.',
      'Bare concrete ground radiates artificial heat; natural grass at 1.2 m height ensures true air temperature.'
    ]
  },

  // 13. Linear Scale Photographic Enlargement Advantage (Advanced) - evaluation
  {
    id: 'ch_geo_13',
    nodeId: NODE_C7_GEO_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When an SOI topographical sheet is photocopied at 200% enlargement for classroom display, what happens to the printed RF (1:50,000) versus the Linear Graphical Scale bar?',
    options: [
      'Both the printed RF and linear scale remain completely valid',
      'The printed RF becomes invalid (now really 1:25,000) while the Linear Scale bar enlarges proportionally and remains 100% accurate',
      'The Linear Scale becomes invalid while the RF number self-adjusts',
      'Both scales become completely unusable forever'
    ],
    correctIndex: 1,
    explanation: 'The printed RF number is static ink; when paper doubles in size, 1 cm on paper represents 250 m instead of 500 m, making "1:50,000" false. But the graphical linear scale bar physically expands by 200% alongside the map, remaining true.',
    hints: [
      'The text "1:50,000" printed on paper cannot change its written digits.',
      'The drawn ruler (linear bar) on the paper gets stretched and enlarged alongside the hills and roads.',
      'The linear bar therefore scales in exact proportion with the enlarged features.'
    ]
  },

  // 14. Freeze-Thaw Ice Expansion Mechanism (Foundation) - recall
  {
    id: 'ch_geo_14',
    nodeId: NODE_C7_GEO_010,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'By what approximate percentage does liquid water expand in volume when it freezes into solid ice inside a rock fissure?',
    correctAnswer: 9,
    tolerance: 1,
    unit: '%',
    explanation: 'Water has the unique property of expanding by approximately 9% in volume upon freezing, exerting immense lateral bursting pressure against rock fissures.',
    hints: [
      'It is a single-digit percentage between 7% and 11%.',
      'This 9% volumetric expansion pushes fissure walls apart with thousands of kPa pressure.',
      'Enter the integer 9.'
    ]
  },

  // 15. Relative Humidity Calculation (Advanced) - application
  {
    id: 'ch_geo_15',
    nodeId: NODE_C7_GEO_007,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'At 30°C, 1 cubic metre of air can hold a maximum of 30 grams of water vapour. If weather sensors in Mumbai record an actual absolute humidity of 24 g/m³, what is the Relative Humidity percentage?',
    correctAnswer: 80,
    tolerance: 1,
    unit: '%',
    explanation: 'Relative Humidity = (Actual Absolute Moisture ÷ Maximum Capacity at that temp) × 100 = (24 ÷ 30) × 100 = 80%.',
    hints: [
      'Formula: (Actual Vapor / Maximum Possible Capacity) × 100',
      'Divide 24 by 30 = 0.80',
      '0.80 × 100 = 80%'
    ]
  },

  // 16. Exfoliation Onion Peeling in Thar Desert (Standard) - understanding
  {
    id: 'ch_geo_16',
    nodeId: NODE_C7_GEO_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In the hot Thar Desert of Rajasthan, granite rocks experience extreme daytime heating and sudden night cooling. What physical weathering landform/effect results?',
    options: [
      'Exfoliation — outer concentric layers peel off like onion skins due to differential thermal expansion',
      'Deep chemical carbonation sinkholes and subterranean stalactites',
      'Rapid biological root wedging caused by dense rainforest canopy',
      'Glacial striations and lateral moraines'
    ],
    correctIndex: 0,
    explanation: 'Rocks are poor conductors of heat. Intense diurnal range causes the exterior shell to expand and contract repeatedly while the interior remains cool, peeling outer curved sheets (exfoliation).',
    hints: [
      'Think of peeling layers of an onion.',
      'Rocks expand under scorching 48°C sun and contract in 12°C desert nights.',
      'The term is Exfoliation (thermal peeling).'
    ]
  },

  // 17. Ozone Hole Seasonality (Standard) - recall
  {
    id: 'ch_geo_17',
    nodeId: NODE_C7_GEO_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'During which Southern Hemisphere season is the Antarctic Ozone Hole most severe and widespread?',
    options: [
      'Antarctic Spring (September to November) when returning sunlight activates chlorine trapped in polar stratospheric clouds',
      'Antarctic Summer (January) due to maximum tourist flights',
      'Antarctic Winter (June) when total darkness prevents all chemical activity',
      'Equatorial Autumn (March) during equinox alignment'
    ],
    correctIndex: 0,
    explanation: 'During the polar winter, ice clouds trap reservoir chlorine in the polar vortex. When spring sunlight returns in September-November, UV light rapidly releases active chlorine, destroying ozone en masse.',
    hints: [
      'Spring in the southern hemisphere occurs from September to November.',
      'Returning sunlight provides the photon energy to release destructive chlorine.',
      'This creates the annual seasonal Antarctic ozone minimum.'
    ]
  },

  // 18. Atmospheric Variable Components (Foundation) - understanding
  {
    id: 'ch_geo_18',
    nodeId: NODE_C7_GEO_004,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are Water Vapour and Dust Particles classified as "Variable Components" of the atmosphere rather than fixed gases?',
    options: [
      'Their proportions fluctuate dramatically across geographic locations and seasons (e.g., dry Thar desert vs humid Mumbai coast)',
      'They turn into solid gold under high pressure',
      'They only exist inside laboratories and cannot be found in open nature',
      'Their chemical atomic mass changes every hour'
    ],
    correctIndex: 0,
    explanation: 'Fixed gases (N₂, O₂, Ar) maintain constant ratios worldwide (~78%, ~21%, ~0.93%), whereas water vapour (0.02% to 4%) and dust vary widely by altitude, marine proximity, and desert winds.',
    hints: [
      'Compare air over Mumbai’s ocean with air over Rajasthan’s sand dunes.',
      'Fixed gases stay in the same percentage everywhere; moisture and dust vary.',
      'Location and weather dictate how much vapour and dust are present.'
    ]
  },

  // 19. Weathering vs Erosion Distinction (Standard) - analysis
  {
    id: 'ch_geo_19',
    nodeId: NODE_C7_GEO_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the fundamental scientific difference between "Weathering" and "Erosion"?',
    options: [
      'Weathering is the in-situ (in-place) breakdown of rocks without transport; Erosion involves the active transport and removal of debris by wind, water, or ice',
      'Weathering only happens in summer while Erosion only occurs during monsoons',
      'Weathering builds tall mountains while Erosion creates ocean trenches',
      'There is zero difference; they are exact scientific synonyms'
    ],
    correctIndex: 0,
    explanation: 'Weathering is strictly in-situ disintegration (rock crumbles where it stands). Erosion requires a mobile agent (river, glacier, wind, gravity) to transport the crumbled particles elsewhere.',
    hints: [
      'Remember the statue analogy: crumbling in place vs wind blowing dust away.',
      '"In-situ" means in its original position without transport.',
      'Erosion requires transport agents like flowing rivers or winds.'
    ],
    misconceptionIndex: 0
  },

  // 20. SOI Toposheet Conventional Signs Match (Foundation) - recall
  {
    id: 'ch_geo_20',
    nodeId: NODE_C7_GEO_001,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Identify the Survey of India conventional symbol: A black line with perpendicular cross-ticks along its length.',
    options: [
      'Metalled all-weather highway',
      'Railway line',
      'Perennial canal with embankment',
      'International political border'
    ],
    correctIndex: 1,
    explanation: 'On SOI toposheets, a railway track is depicted as a solid black line with regular cross-ticks (sleepers).',
    hints: [
      'Think of wooden or concrete sleepers holding steel rails.',
      'Roads are shown in red lines; waterways in blue.',
      'Cross-ticked black lines denote railway tracks.'
    ]
  },

  // 21. Six\'s Maximum and Minimum Thermometer (Advanced) - analysis
  {
    id: 'ch_geo_21',
    nodeId: NODE_C7_GEO_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does Six\'s Thermometer record both the maximum and minimum temperatures of a 24-hour cycle in a single U-tube?',
    options: [
      'Expanding alcohol pushes mercury, which leaves two tiny spring-loaded steel dumbbell indices at the highest and lowest points reached',
      'It contains a digital microchip powered by solar panels that beeps at noon',
      'It uses red laser beams to vaporise water droplets in the air',
      'Two separate wooden sticks float on water and sink when cold'
    ],
    correctIndex: 0,
    explanation: 'Six\'s thermometer uses alcohol in bulbs connected by a U-shaped mercury column. As alcohol expands or contracts, mercury moves steel indices which remain pinned by small springs at the maximum and minimum limits until reset by a magnet.',
    hints: [
      'The U-shaped tube contains alcohol bulbs and a mercury thread.',
      'Little dumbbell-shaped steel indices stay in place when the liquid retreats.',
      'A small horseshoe magnet is used by the observer to reset the indices each morning.'
    ]
  },

  // 22. Climatic Controls on Indian Cities (Advanced) - evaluation
  {
    id: 'ch_geo_22',
    nodeId: NODE_C7_GEO_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Shimla (altitude ~2,200 m) and Delhi (altitude ~216 m) lie at nearly identical northern latitudes (~31°N & ~28.6°N). Why is Shimla cool in June (22°C) while Delhi scorches at 44°C?',
    options: [
      'Altitude effect: Temperature falls through the troposphere at ~6.5°C per 1,000 m ascent (Normal Lapse Rate)',
      'Delhi has 50 times more green forest cover than Himachal Pradesh',
      'The ozone hole is situated directly over New Delhi in summer',
      'The Arabian Sea current passes directly through Shimla\'s valleys'
    ],
    correctIndex: 0,
    explanation: 'Due to altitude and the tropospheric lapse rate (~6.5°C/km), Shimla being ~2,000 m higher experiences air that is roughly 13°C to 15°C colder than sea-level plain regions at the same latitude.',
    hints: [
      'Remember what happens to temperature as you climb higher in the troposphere.',
      'Normal Lapse Rate lowers temperature by approx 6.5°C per 1000 metres height.',
      'Shimla’s 2,200 m altitude cools it compared to low-lying Delhi.'
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: 'c7_geo_001',
  title: 'Topographical Maps, Atmosphere & Weather Systems',
  definition: 'A comprehensive ICSE Class 7 exploration of Survey of India 1:50,000 topographical sheets (contours, colors, grid references, scale types), atmospheric composition & 5-layer structure, ozone shield dynamics, weather instrumentation, weather vs climate parameters, and exogenous weathering processes.',
  eli5: 'Learn how to read earth maps like an X-ray using contours and colors, climb through the 5 sky layers to the ozone shield, decode weather station instruments, and watch mountain rocks crack under freezing ice and scorching sun!',
  misconceptions: [
    {
      misconception: 'Six-figure grid reference starts with Northing because North is at the top of the map.',
      correction: 'Grid references ALWAYS read Eastings (horizontal corridor) first, then Northings (vertical stairs) second: e.g., 453827.'
    },
    {
      misconception: 'Green color on an SOI toposheet denotes agricultural crop fields.',
      correction: 'Green is strictly reserved for natural vegetation, dense/open forest, and scrub. Cultivated fields are usually unshaded or yellow.'
    },
    {
      misconception: 'Large-scale map means it shows a massive continent like Asia or the World.',
      correction: 'Large scale (e.g. 1:4,000 or 1:25,000) represents a LARGE fraction, showing a SMALL ground area with immense detail (like a village plan).'
    },
    {
      misconception: 'Oxygen is the most abundant gas in Earth\'s atmosphere because we breathe it.',
      correction: 'Nitrogen forms 78% of the atmosphere, whereas Oxygen constitutes only 21%.'
    },
    {
      misconception: 'Weathering and erosion mean the exact same thing.',
      correction: 'Weathering is in-situ rock breakdown in place without motion; Erosion is the actual transportation of broken debris by water, wind, or ice.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What do closely spaced brown contour lines indicate?', options: ['Gentle slope', 'Steep slope/cliff', 'Wide valley', 'Perennial wetland'], correctIndex: 1 },
    { question: 'What is the RF equivalent for the statement 1 cm = 500 m?', options: ['1:500', '1:5,000', '1:50,000', '1:500,000'], correctIndex: 2 },
    { question: 'In which atmospheric layer does almost all human weather occur?', options: ['Stratosphere', 'Mesosphere', 'Troposphere', 'Thermosphere'], correctIndex: 2 },
    { question: 'What does an anemometer measure?', options: ['Wind direction', 'Wind speed', 'Atmospheric pressure', 'Relative humidity'], correctIndex: 1 },
    { question: 'What international treaty was enacted in 1987 to protect stratospheric ozone?', options: ['Kyoto Protocol', 'Paris Accord', 'Montreal Protocol', 'Geneva Convention'], correctIndex: 2 },
    { question: 'What type of weathering turns iron-bearing rocks reddish-brown and crumbly?', options: ['Carbonation', 'Frost action', 'Oxidation', 'Hydration'], correctIndex: 2 },
    { question: 'Which instrument houses thermometers 1.2 m above grass with white louvres?', options: ['Barograph', 'Stevenson Screen', 'Anemometer Mast', 'Campbell-Stokes Recorder'], correctIndex: 1 },
    { question: 'What standard duration is required to calculate a region\'s climatic normal?', options: ['1 year', '5 years', '10 years', '30 years or more'], correctIndex: 3 }
  ],
  masteryCriteria: 'Master toposheet grid reading, contour interpretation, RF/linear scale math, atmospheric vertical profile, ozone kinetics, meteorological sensors, and mechanical/chemical weathering mechanisms.'
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Toposheet Contour & Relief Laboratory',
    instruction: 'Adjust the Hill Elevation & Slope Steepness slider to watch how 3D mountain relief projects into 2D brown contour lines in real-time!',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_GEO_001
  },
  {
    title: 'Toposheet 5-Colour Landscape Decoder',
    instruction: 'Click on different landscape features in the interactive map tile to inspect their SOI standard colour conventions and real-world significance.',
    interactionType: 'click-parts',
    nodeId: NODE_C7_GEO_002
  },
  {
    title: 'Atmospheric 5-Storey Sky Elevator',
    instruction: 'Drag the Altitude Elevator from 0 km to 500 km. Observe temperature changes, the ozone shield, meteor burning, and satellite orbits.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_GEO_005
  },
  {
    title: 'Meteorological Weather Station Hub',
    instruction: 'Adjust temperature, pressure, and humidity sliders to simulate live weather changes from Delhi heatwaves to Mumbai monsoon bursts.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_GEO_008
  },
  {
    title: 'Rock Weathering & Freeze-Thaw Simulator',
    instruction: 'Toggle between sub-zero Himalayan freeze-thaw and desert thermal cycles to watch rocks crack, exfoliate, and chemically weather.',
    interactionType: 'click-parts',
    nodeId: NODE_C7_GEO_010
  }
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase the slope steepness of a hill from 15° to 65°, what will happen to the distance between successive contour lines on the map?',
    options: [
      'Contour lines will spread farther apart across the paper',
      'Contour lines will crowd tightly together into dense bands',
      'Contour lines will turn blue and disappear',
      'Contour lines will become concentric perfect squares'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Slope Steepness slider to 70° in the lab below and watch the contour spacing compress!',
    nodeId: NODE_C7_GEO_001
  },
  {
    question: 'Predict: If temperature rises from 20°C to 35°C while actual water vapour content stays constant at 15 g/m³, what will happen to the Relative Humidity percentage?',
    options: [
      'Relative Humidity will increase towards 100%',
      'Relative Humidity will decrease because warm air has a much higher moisture-holding capacity',
      'Relative Humidity will remain totally unchanged at 50%',
      'Relative Humidity will drop instantly to absolute 0%'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Temperature slider upward in the weather simulator and observe the RH gauge drop!',
    nodeId: NODE_C7_GEO_007
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: As you raise the altitude slider past the Tropopause (18 km) into the Stratosphere, what happens to the temperature trend?',
    observableOptions: [
      'Temperature keeps dropping all the way to absolute zero',
      'Temperature reverses direction and warms up due to the Ozone layer absorbing solar UV',
      'Temperature remains completely locked at exactly 0°C',
      'The atmosphere instantly turns into liquid water'
    ],
    correctIndex: 1,
    nodeId: NODE_C7_GEO_005
  },
  {
    question: 'Observation: When freezing water in the rock crevice expands by 9%, what physical effect appears on the rock face after repeated cycles?',
    observableOptions: [
      'The rock turns into magnetic iron oxide',
      'The fissure widens and fractures the boulder into jagged angular fragments (frost shattering)',
      'The rock dissolves completely into bubbling carbonated water',
      'The rock becomes smooth and rounded like river sand'
    ],
    correctIndex: 1,
    nodeId: NODE_C7_GEO_010
  }
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Field Geographer & Meteorological Officer Portfolio',
  description: 'Apply your combined knowledge of Survey of India toposheets, atmospheric dynamics, and geomorphology to complete an authentic expedition report for the Garhwal Himalayas.',
  steps: [
    'Locate a Himalayan valley settlement using 6-figure Eastings & Northings (e.g. 453827).',
    'Calculate ground hiking distance using RF 1:50,000 scale conversion (1 cm = 500 m).',
    'Record live weather parameters (Temp in °C, Pressure in mb, RH in %) from a Stevenson Screen.',
    'Identify physical frost-shattering scree slopes vs chemical weathering on valley floors.'
  ]
};

// ─── CLIMATE COMPARISON DATA (for D3/Recharts Visualization) ───
const CLIMATE_COMPARISON_DATA = [
  { month: 'Jan', mumbaiTemp: 24, delhiTemp: 14, mumbaiRain: 2, delhiRain: 18 },
  { month: 'Feb', mumbaiTemp: 26, delhiTemp: 18, mumbaiRain: 1, delhiRain: 20 },
  { month: 'Mar', mumbaiTemp: 28, delhiTemp: 24, mumbaiRain: 1, delhiRain: 15 },
  { month: 'Apr', mumbaiTemp: 30, delhiTemp: 31, mumbaiRain: 3, delhiRain: 10 },
  { month: 'May', mumbaiTemp: 32, delhiTemp: 36, mumbaiRain: 15, delhiRain: 25 },
  { month: 'Jun', mumbaiTemp: 31, delhiTemp: 34, mumbaiRain: 490, delhiRain: 70 },
  { month: 'Jul', mumbaiTemp: 29, delhiTemp: 31, mumbaiRain: 720, delhiRain: 210 },
  { month: 'Aug', mumbaiTemp: 29, delhiTemp: 30, mumbaiRain: 500, delhiRain: 230 },
  { month: 'Sep', mumbaiTemp: 29, delhiTemp: 29, mumbaiRain: 300, delhiRain: 120 },
  { month: 'Oct', mumbaiTemp: 30, delhiTemp: 26, mumbaiRain: 60, delhiRain: 15 },
  { month: 'Nov', mumbaiTemp: 29, delhiTemp: 20, mumbaiRain: 10, delhiRain: 5 },
  { month: 'Dec', mumbaiTemp: 26, delhiTemp: 15, mumbaiRain: 3, delhiRain: 8 },
];

function C7_GeographyTopographicalMapsIntroductionSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌍', color: 'emerald' };

  // ─── 30+ RICH STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Discovery & Predict-Check State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionVerified, setPredictionVerified] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);

  // Escalating hints & progressive disclosure
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Drag-and-drop & sorting state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [selectedMapFeature, setSelectedMapFeature] = useState<string | null>('forest');

  // Interactive Exploration Simulation Sliders
  const [hillSlope, setHillSlope] = useState<number>(45); // 10 to 80 degrees
  const [hillHeight, setHillHeight] = useState<number>(240); // 100 to 500 metres
  const [simAltitude, setSimAltitude] = useState<number>(12); // 0 to 500 km
  const [simTemperature, setSimTemperature] = useState<number>(28); // -20 to 50 °C
  const [simPressure, setSimPressure] = useState<number>(1010); // 950 to 1050 mb
  const [simMoisture, setSimMoisture] = useState<number>(18); // 2 to 35 g/m³
  const [weatheringCycleCount, setWeatheringCycleCount] = useState<number>(0);
  const [weatheringType, setWeatheringType] = useState<'physical' | 'chemical' | 'biological'>('physical');

  // Visual feedback animations
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT Reference
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED REAL-TIME VALUES ───
  const derivedRelativeHumidity = useMemo(() => {
    // Max capacity formula approximation: Capacity(T) = 5 * exp(0.06 * T)
    const maxCapacity = Math.max(5, 5 * Math.exp(0.06 * simTemperature));
    const rh = Math.min(100, Math.round((simMoisture / maxCapacity) * 100));
    return rh;
  }, [simTemperature, simMoisture]);

  const atmosphericLayerInfo = useMemo(() => {
    if (simAltitude <= 18) {
      const lapseTemp = Math.round(25 - (simAltitude * 6.5));
      return {
        name: 'Troposphere',
        range: '0 - 18 km',
        temp: `${lapseTemp}°C`,
        feature: 'Dense air, water vapour, clouds, convection, storms & all human weather',
        color: '#3b82f6'
      };
    } else if (simAltitude <= 50) {
      const stratTemp = Math.round(-55 + ((simAltitude - 18) * 1.7));
      return {
        name: 'Stratosphere',
        range: '18 - 50 km',
        temp: `${stratTemp}°C`,
        feature: 'Ozone Shield (O₃) absorbs lethal UV-B/UV-C rays; stable, smooth aircraft cruising',
        color: '#8b5cf6'
      };
    } else if (simAltitude <= 80) {
      const mesoTemp = Math.round(0 - ((simAltitude - 50) * 3));
      return {
        name: 'Mesosphere',
        range: '50 - 80 km',
        temp: `${mesoTemp}°C (Coldest Layer)`,
        feature: 'Meteors burn up via high-velocity air friction; noctilucent ice clouds',
        color: '#06b6d4'
      };
    } else if (simAltitude <= 400) {
      return {
        name: 'Thermosphere / Ionosphere',
        range: '80 - 400 km',
        temp: 'Up to 1500°C (Kinetic)',
        feature: 'Ionised gas reflects shortwave radio waves; Auroras (Northern/Southern lights)',
        color: '#f59e0b'
      };
    } else {
      return {
        name: 'Exosphere',
        range: '>400 km',
        temp: 'Fades to Space',
        feature: 'Extremely sparse hydrogen/helium; orbit altitude for geostationary satellites',
        color: '#ec4899'
      };
    }
  }, [simAltitude]);

  // Motivational message and spaced repetition derived from errors
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  const srsIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // ─── 5+ USEEFFECT HOOKS ───

  // 1. Initial Load from Mastery Store
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. BKT-Driven Adaptive Difficulty
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff: 'foundation' | 'standard' | 'advanced' =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' :
      mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // 3. Canvas 2D Particle Animation (Atmosphere & Weathering)
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

      // Draw subtle atmospheric particle waves
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      for (let i = 0; i < 6; i++) {
        const x = (frame * 1.5 + i * 80) % canvas.width;
        const y = 20 + Math.sin((frame + i * 20) * 0.05) * 8;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // 4. Inactivity Timer for Auto-Hint
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeObj.hints[nextLevel - 1]) {
      const hintText = currentChallengeObj.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentChallengeObj]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 5. Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS ───

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction! Closely spaced contours mean steep terrain.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Topographical & Atmospheric Laboratory. Let us explore the physical world!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test contour slopes, atmospheric layers, and weather gauges with no grading!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering ICSE Challenge Arena. Show your mastery of geography!');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    setPredictionVerified(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now manipulate the interactive control to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closely at the temperature gauge behavior.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentChallengeObj.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentChallengeObj]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === currentChallengeObj.sortItems?.length
        ? [...prev]
        : (currentChallengeObj.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [currentChallengeObj]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (currentChallengeObj.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Perfect sequence! All atmospheric layers aligned correctly.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
    resetInactivityTimer();
  }, [sortArrangement, currentChallengeObj, showNextHint, resetInactivityTimer]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (
      currentChallengeObj.type === 'classify' ||
      currentChallengeObj.type === 'distinguish' ||
      currentChallengeObj.type === 'match' ||
      currentChallengeObj.type === 'evaluate'
    ) {
      isCorrect = ans === currentChallengeObj.correctIndex;
    } else if (currentChallengeObj.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(currentChallengeObj.correctMapping);
    } else if (currentChallengeObj.type === 'numeric') {
      const numVal = typeof ans === 'string' ? parseFloat(ans) : ans as number;
      isCorrect = Math.abs(numVal - (currentChallengeObj.correctAnswer || 0)) <= (currentChallengeObj.tolerance || 0);
    } else if (currentChallengeObj.type === 'construct') {
      isCorrect = ans === currentChallengeObj.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Brilliant! Correctly answered.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${currentChallengeObj.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeObj.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeObj.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the complete ICSE geographical explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
    resetInactivityTimer();
  }, [currentChallengeObj, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Expedition Completed! You have mastered Topographical Maps and Atmospheric Systems.');
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

  const handleTriggerFreezeThaw = useCallback(() => {
    setWeatheringCycleCount(c => c + 1);
    audioManager.play('pop');
    speechManager.speak('Freezing water expands 9%, widening rock fissures!');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      
      {/* ─── SIMULATION HEADER ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              ICSE Class 7 Geography • Comprehensive Simulator
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.span 
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' :
              difficulty === 'standard' ? 'bg-indigo-950 text-indigo-300 border-indigo-700' :
              'bg-amber-950 text-amber-300 border-amber-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold text-slate-300 border border-slate-700">
            Mastery: <strong className="text-emerald-400 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/80 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-300 mb-2 flex items-center gap-2">
              🧭 {SCENARIO.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {SCENARIO.intro}
            </p>
            <p className="text-xs sm:text-sm text-indigo-200/80 mt-2 font-medium">
              📍 {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h4 className="text-sm uppercase font-bold text-amber-400 tracking-wider mb-2">
              Curiosity Hook Challenge
            </h4>
            <p className="text-base sm:text-lg text-white font-semibold mb-4">
              {DISCOVERY_QUESTION.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((option, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 hover:border-indigo-500 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4"
              >
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '🎯 Brilliant intuition! Contours pack tightly when land rises steeply.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Exploration Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                Step {idx + 1}: {step.title.split(' ')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-1">
                    👉 {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-lg text-slate-400 border border-slate-700">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* ── LAB STEP 1: CONTOUR & RELIEF SIMULATOR ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      3D Mountain Elevation & Slope Controls
                    </h4>
                    
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Slope Steepness Angle</span>
                        <strong className="text-emerald-400">{hillSlope}° ({hillSlope > 55 ? 'Very Steep Cliff' : hillSlope < 30 ? 'Gentle Plain' : 'Moderate Hill'})</strong>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={75}
                        value={hillSlope}
                        onChange={(e) => {
                          setHillSlope(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set slope steepness angle"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Peak Elevation (Height)</span>
                        <strong className="text-emerald-400">{hillHeight} metres (20 m Contour Interval)</strong>
                      </div>
                      <input
                        type="range"
                        min={120}
                        max={360}
                        step={20}
                        value={hillHeight}
                        onChange={(e) => {
                          setHillHeight(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set peak elevation height"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    {/* Predict-then-check mini hook */}
                    {!predictionMade && (
                      <div className="p-3 bg-slate-900 rounded-xl border border-indigo-900/60">
                        <p className="text-xs text-indigo-300 font-bold mb-2">
                          🔍 Predict-Then-Check: {PREDICTION_QUESTIONS[0].question}
                        </p>
                        <div className="space-y-1.5">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left p-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {predictionMade && (
                      <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-700 text-xs text-slate-300">
                        <p className="font-bold text-emerald-400">✓ Prediction Verified:</p>
                        <p className="mt-1">
                          Notice on the 2D map how contour spacing directly shrinks when you increase steepness to {hillSlope}°.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 2D Toposheet Contour SVG Projection */}
                  <div className="flex flex-col items-center justify-center bg-slate-900 rounded-xl p-3 border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 mb-2">
                      2D Plan Topographical Sheet View (Contours in Brown)
                    </span>
                    <svg viewBox="0 0 300 240" className="w-full max-h-[220px]">
                      <defs>
                        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="300" height="240" fill="#0f172a" />
                      <rect width="300" height="240" fill="url(#grid)" />

                      {Array.from({ length: Math.floor(hillHeight / 20) }).map((_, idx) => {
                        const level = (idx + 1) * 20;
                        const spacingFactor = (80 - hillSlope) / 50;
                        const rx = Math.max(10, 130 - idx * (14 * spacingFactor));
                        const ry = Math.max(8, 95 - idx * (10 * spacingFactor));
                        return (
                          <g key={idx}>
                            <ellipse
                              cx={150}
                              cy={120}
                              rx={rx}
                              ry={ry}
                              fill="none"
                              stroke="#92400e"
                              strokeWidth={idx % 5 === 0 ? "2.5" : "1.2"}
                            />
                            {idx % 2 === 0 && (
                              <text
                                x={150 + rx - 18}
                                y={120}
                                fill="#d97706"
                                fontSize="7"
                                fontWeight="bold"
                              >
                                {level}m
                              </text>
                            )}
                          </g>
                        );
                      })}
                      <polygon points="150,113 154,120 146,120" fill="#dc2626" />
                      <circle cx="150" cy="117" r="1.5" fill="#ffffff" />
                      <text x="157" y="119" fill="#f87171" fontSize="8" fontWeight="bold">
                        .{hillHeight}
                      </text>
                    </svg>
                    <span className="text-[11px] text-slate-400 mt-2 text-center">
                      Contour Interval = 20 m • Spacing = {hillSlope > 50 ? 'Crowded (Steep Slope)' : 'Wide (Gentle Slope)'}
                    </span>
                  </div>
                </div>
              )}

              {/* ── LAB STEP 2: TOPOSHEET 5-COLOUR MAP DECODER ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="md:col-span-2 bg-slate-900 rounded-xl p-4 border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 mb-2 block">
                      Interactive Survey of India Sheet Grid (Click any coloured zone)
                    </span>
                    <svg viewBox="0 0 360 220" className="w-full">
                      <rect width="360" height="220" fill="#0f172a" rx="8" />

                      {/* 1. Green Forest Zone */}
                      <path
                        d="M 10 10 L 140 10 L 120 100 L 10 80 Z"
                        fill="#065f46"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                          setSelectedMapFeature('forest');
                          audioManager.play('tap');
                        }}
                      />
                      <text x="35" y="50" fill="#a7f3d0" fontSize="10" fontWeight="bold">
                        Dense Reserved Forest (Green)
                      </text>

                      {/* 2. Blue Perennial River */}
                      <path
                        d="M 180 0 Q 200 70 160 140 T 260 220"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="8"
                        className="cursor-pointer hover:stroke-cyan-400 transition-colors"
                        onClick={() => {
                          setSelectedMapFeature('river');
                          audioManager.play('tap');
                        }}
                      />
                      <text x="210" y="110" fill="#7dd3fc" fontSize="9" fontWeight="bold">
                        Perennial River (Blue)
                      </text>

                      {/* 3. Red Metalled Highway */}
                      <line
                        x1="0" y1="180" x2="360" y2="150"
                        stroke="#dc2626"
                        strokeWidth="3.5"
                        className="cursor-pointer hover:stroke-rose-400"
                        onClick={() => {
                          setSelectedMapFeature('road');
                          audioManager.play('tap');
                        }}
                      />
                      <text x="60" y="165" fill="#fca5a5" fontSize="8" fontWeight="bold">
                        Metalled Highway (Red)
                      </text>

                      {/* 4. Black Settlement Squares */}
                      <g
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedMapFeature('settlement');
                          audioManager.play('tap');
                        }}
                      >
                        <rect x="270" y="40" width="12" height="12" fill="#000000" stroke="#94a3b8" />
                        <rect x="286" y="40" width="12" height="12" fill="#000000" stroke="#94a3b8" />
                        <rect x="278" y="56" width="12" height="12" fill="#000000" stroke="#94a3b8" />
                        <rect x="294" y="56" width="12" height="12" fill="#000000" stroke="#94a3b8" />
                        <text x="260" y="32" fill="#e2e8f0" fontSize="9" fontWeight="bold">
                          Village Rampur (Black)
                        </text>
                      </g>

                      {/* 5. Brown Sand Dunes / Contours */}
                      <path
                        d="M 20 110 Q 50 130 90 120 T 130 140"
                        fill="none"
                        stroke="#b45309"
                        strokeWidth="2"
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedMapFeature('contours');
                          audioManager.play('tap');
                        }}
                      />
                      <text x="30" y="135" fill="#fde68a" fontSize="8" fontWeight="bold">
                        Relief Contours (Brown)
                      </text>
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                      Feature Inspector
                    </h4>
                    {selectedMapFeature === 'forest' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="w-6 h-6 rounded-md bg-emerald-700 border border-emerald-400" />
                        <p className="text-xs font-bold text-emerald-300">GREEN = Vegetation & Forests</p>
                        <p className="text-xs text-slate-300">
                          Represents dense natural forest, open forest, and scrubland. NEVER means farmland or crop cultivation!
                        </p>
                      </motion.div>
                    )}
                    {selectedMapFeature === 'river' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="w-6 h-6 rounded-md bg-sky-600 border border-sky-400" />
                        <p className="text-xs font-bold text-sky-300">BLUE = Water Bodies</p>
                        <p className="text-xs text-slate-300">
                          Solid blue lines denote perennial flowing rivers; dashed lines denote seasonal streams; circles mark lined wells.
                        </p>
                      </motion.div>
                    )}
                    {selectedMapFeature === 'road' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="w-6 h-6 rounded-md bg-rose-600 border border-rose-400" />
                        <p className="text-xs font-bold text-rose-300">RED = Metalled Tar Roads</p>
                        <p className="text-xs text-slate-300">
                          Reserved for durable, all-weather paved highways and surveyed permanent settlements.
                        </p>
                      </motion.div>
                    )}
                    {selectedMapFeature === 'settlement' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="w-6 h-6 rounded-md bg-black border border-slate-400" />
                        <p className="text-xs font-bold text-slate-200">BLACK = Cultural Built Features</p>
                        <p className="text-xs text-slate-300">
                          Houses, buildings, railway tracks, telephone lines, and cart tracks built by human activity.
                        </p>
                      </motion.div>
                    )}
                    {selectedMapFeature === 'contours' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="w-6 h-6 rounded-md bg-amber-700 border border-amber-400" />
                        <p className="text-xs font-bold text-amber-300">BROWN = Relief & Land Shape</p>
                        <p className="text-xs text-slate-300">
                          Contour lines joining places of equal height above sea level, sand dunes, and steep escarpments.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB STEP 3: ATMOSPHERE 5-STOREY ELEVATOR ── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Atmospheric Sounding Altitude Slider
                    </h4>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Current Altitude</span>
                        <strong className="text-sky-400">{simAltitude} km above Sea Level</strong>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={480}
                        step={2}
                        value={simAltitude}
                        onChange={(e) => {
                          setSimAltitude(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set atmospheric sounding altitude"
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-xl border border-slate-700 bg-slate-900 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-white" style={{ color: atmosphericLayerInfo.color }}>
                          Layer: {atmosphericLayerInfo.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {atmosphericLayerInfo.range}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        <strong>Temp:</strong> {atmosphericLayerInfo.temp}
                      </p>
                      <p className="text-xs text-slate-400">
                        <strong>Key Phenomenon:</strong> {atmosphericLayerInfo.feature}
                      </p>
                    </div>

                    {/* Observation Question */}
                    {!observationAnswered && (
                      <div className="p-3 bg-slate-900 rounded-xl border border-indigo-900">
                        <p className="text-xs text-indigo-300 font-bold mb-2">
                          🧐 {OBSERVATION_QUESTIONS[0].question}
                        </p>
                        <div className="space-y-1">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vertical Cross Section SVG of 5 Layers */}
                  <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs font-bold text-slate-400 mb-2 text-center">
                      Vertical Atmospheric Column
                    </span>
                    <svg viewBox="0 0 240 280" className="w-full max-h-[260px]">
                      <rect x="20" y="10" width="200" height="40" fill="#4a044e" opacity={simAltitude > 400 ? "1" : "0.5"} />
                      <text x="120" y="32" fill="#f472b6" fontSize="8" fontWeight="bold" textAnchor="middle">Exosphere (&gt;400 km)</text>

                      <rect x="20" y="55" width="200" height="55" fill="#78350f" opacity={simAltitude > 80 && simAltitude <= 400 ? "1" : "0.5"} />
                      <text x="120" y="85" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">Thermosphere (80-400 km)</text>

                      <rect x="20" y="115" width="200" height="45" fill="#164e63" opacity={simAltitude > 50 && simAltitude <= 80 ? "1" : "0.5"} />
                      <text x="120" y="140" fill="#67e8f9" fontSize="8" fontWeight="bold" textAnchor="middle">Mesosphere (50-80 km)</text>

                      <rect x="20" y="165" width="200" height="50" fill="#3b0764" opacity={simAltitude > 18 && simAltitude <= 50 ? "1" : "0.5"} />
                      <rect x="20" y="180" width="200" height="20" fill="#9333ea" opacity="0.6" />
                      <text x="120" y="193" fill="#e9d5ff" fontSize="8" fontWeight="bold" textAnchor="middle">OZONE SHIELD (15-35 km)</text>

                      <rect x="20" y="220" width="200" height="45" fill="#1e3a8a" opacity={simAltitude <= 18 ? "1" : "0.5"} />
                      <text x="120" y="245" fill="#93c5fd" fontSize="8" fontWeight="bold" textAnchor="middle">Troposphere (0-18 km)</text>

                      <motion.g
                        animate={{
                          y: simAltitude > 400 ? 30 :
                             simAltitude > 80 ? 80 :
                             simAltitude > 50 ? 135 :
                             simAltitude > 18 ? 185 : 240
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <polygon points="5,0 16,-5 16,5" fill="#22c55e" />
                        <circle cx="16" cy="0" r="3" fill="#22c55e" />
                      </motion.g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ── LAB STEP 4: METEOROLOGICAL SENSORS & WEATHER SIMULATOR ── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Stevenson Screen Meteorological Sliders
                    </h4>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Air Temperature (Thermometer)</span>
                        <strong className="text-amber-400">{simTemperature}°C</strong>
                      </div>
                      <input
                        type="range"
                        min={-10}
                        max={45}
                        value={simTemperature}
                        onChange={(e) => {
                          setSimTemperature(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set air temperature"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Atmospheric Pressure (Barometer)</span>
                        <strong className="text-sky-400">{simPressure} mb (Normal: 1013 mb)</strong>
                      </div>
                      <input
                        type="range"
                        min={960}
                        max={1040}
                        value={simPressure}
                        onChange={(e) => {
                          setSimPressure(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set atmospheric pressure"
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Absolute Moisture Content</span>
                        <strong className="text-cyan-400">{simMoisture} g/m³</strong>
                      </div>
                      <input
                        type="range"
                        min={4}
                        max={30}
                        value={simMoisture}
                        onChange={(e) => {
                          setSimMoisture(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set absolute moisture content"
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-300">Relative Humidity (Hygrometer):</span>
                        <span className={`text-base font-black ${derivedRelativeHumidity > 75 ? 'text-cyan-400' : 'text-amber-400'}`}>
                          {derivedRelativeHumidity}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-500 to-cyan-500"
                          animate={{ width: `${derivedRelativeHumidity}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Climate Graph Visualization */}
                  <div className="bg-slate-900 rounded-xl p-3 border border-slate-800">
                    <span className="text-xs font-bold text-slate-300 mb-2 block text-center">
                      30-Year Climate Normals: Mumbai (Maritime) vs Delhi (Continental)
                    </span>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={CLIMATE_COMPARISON_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} />
                          <YAxis stroke="#94a3b8" fontSize={10} unit="°C" />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Legend wrapperStyle={{ fontSize: '10px' }} />
                          <Line type="monotone" dataKey="mumbaiTemp" stroke="#38bdf8" name="Mumbai Temp (°C)" strokeWidth={2} />
                          <Line type="monotone" dataKey="delhiTemp" stroke="#f43f5e" name="Delhi Temp (°C)" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center mt-1">
                      Mumbai’s ocean moderates temperature; inland Delhi exhibits extreme seasonal variation.
                    </p>
                  </div>
                </div>
              )}

              {/* ── LAB STEP 5: ROCK WEATHERING SIMULATOR ── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Exogenous Weathering Engine
                    </h4>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setWeatheringType('physical');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                          weatheringType === 'physical'
                            ? 'bg-amber-950 border-amber-600 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Physical (Freeze-Thaw)
                      </button>
                      <button
                        onClick={() => {
                          setWeatheringType('chemical');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                          weatheringType === 'chemical'
                            ? 'bg-rose-950 border-rose-600 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Chemical (Oxidation)
                      </button>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <p className="text-xs text-slate-300">
                        {weatheringType === 'physical'
                          ? 'Cold Ladakh Mountains: Water enters fissures, freezing overnight and expanding by 9%.'
                          : 'Deccan Plateau Basalt: Oxygen combines with iron minerals to produce crumbly red iron oxide (rust).'}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleTriggerFreezeThaw}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                      >
                        ⚡ Simulate Weathering Cycle (+1 Cycle)
                      </motion.button>
                      <p className="text-[11px] text-slate-400 text-center">
                        Total weathering stress cycles completed: <strong>{weatheringCycleCount}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Visual Rock Fracture Simulation SVG */}
                  <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-slate-400 mb-2">
                      In-Situ Rock Disintegration View
                    </span>
                    <svg viewBox="0 0 240 180" className="w-full max-h-[170px]">
                      <motion.path
                        d="M 40 140 L 90 40 L 115 140 Z"
                        fill={weatheringType === 'chemical' ? '#7f1d1d' : '#475569'}
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        animate={{ x: -Math.min(25, weatheringCycleCount * 3) }}
                      />
                      <motion.path
                        d="M 125 140 L 150 40 L 200 140 Z"
                        fill={weatheringType === 'chemical' ? '#991b1b' : '#334155'}
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        animate={{ x: Math.min(25, weatheringCycleCount * 3) }}
                      />
                      {weatheringCycleCount > 0 && (
                        <motion.line
                          x1="120" y1="50" x2="120" y2="140"
                          stroke={weatheringType === 'physical' ? '#38bdf8' : '#ef4444'}
                          strokeWidth={Math.min(16, weatheringCycleCount * 2.5)}
                          strokeLinecap="round"
                        />
                      )}
                    </svg>
                    <span className="text-[11px] text-slate-400 mt-2 text-center">
                      {weatheringCycleCount > 5
                        ? 'Rock completely shattered in-situ without transport (Pure Weathering)'
                        : 'Apply repeated cycles to observe rock fissure wedging'}
                    </span>
                  </div>
                </div>
              )}

              {/* Exploration Prev / Next Bar */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-400 font-semibold">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-900/40"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                🎮 Geography Explorer Sandbox (Ungraded Free Play)
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Freely experiment with the live instruments, contour steepness, and atmospheric elevator before taking formal challenges.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg"
            >
              Start Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400">1. Toposheet Scale Math</span>
              <p className="text-xs text-slate-300">
                At RF 1:50,000, 2 cm on paper equals exactly 1.0 km on the ground. A linear bar stays accurate even after 200% photocopying!
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-400">2. Stratospheric Ozone</span>
              <p className="text-xs text-slate-300">
                Ozone (O₃) sits between 15-35 km, absorbing dangerous UV rays and protecting phytoplankton and human eye lenses.
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400">3. In-Situ Weathering</span>
              <p className="text-xs text-slate-300">
                Rocks expand by 9% under freezing ice in Ladakh, while Meghalaya limestone dissolves through carbonic acid carbonation.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={400} height={35} className="w-full rounded-lg bg-slate-900/40" />

          {/* Progress & Competency Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-indigo-700 font-mono capitalize">
                Competency: {currentChallengeObj.competencyLevel}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-amber-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentChallengeObj.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ICSE Question #{currentChallenge + 1}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Target Node: {currentChallengeObj.nodeId}
              </span>
            </div>

            <p className="text-base sm:text-lg font-bold text-white mb-6">
              {currentChallengeObj.question}
            </p>

            {/* A. MCQ Types (classify, distinguish, match, evaluate) */}
            {(currentChallengeObj.type === 'classify' ||
              currentChallengeObj.type === 'distinguish' ||
              currentChallengeObj.type === 'match' ||
              currentChallengeObj.type === 'evaluate') &&
              currentChallengeObj.options && (
                <div className="space-y-3">
                  {currentChallengeObj.options.map((option, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        showExplanation && i === currentChallengeObj.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 border-slate-700 hover:border-indigo-500 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-3 text-indigo-400">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* B. Drag-Label Diagram Challenge */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 w-full mb-1">
                    Draggable Palette:
                  </span>
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'slot_relief', label: 'Relief / Contours Target' },
                    { id: 'slot_vegetation', label: 'Vegetation / Forest Target' },
                    { id: 'slot_water', label: 'Water Bodies Target' },
                    { id: 'slot_roads', label: 'Metalled Roads Target' }
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[11px] font-medium">{target.label}</span>
                      <strong className="text-sm mt-1">
                        {droppedLabels[target.id] || '[ Drop Colour Here ]'}
                      </strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Colour Assignments →
                </motion.button>
              </div>
            )}

            {/* C. Drag-Sort Layer Arrangement Challenge */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400">
                  Drag and reorder items so they ascend from Lowest Layer (Surface) to Highest Layer (Space):
                </span>
                <div className="space-y-2">
                  {(sortArrangement.length === currentChallengeObj.sortItems.length
                    ? sortArrangement.map((idx) => currentChallengeObj.sortItems![idx])
                    : currentChallengeObj.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-indigo-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500">≡ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Check Layer Hierarchy →
                </motion.button>
              </div>
            )}

            {/* D. Numeric Calculation Challenge */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-slate-300">
                    {currentChallengeObj.unit}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* E. Construct String Challenge */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{currentChallengeObj.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg text-xs font-semibold border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-indigo-950 text-indigo-200 border border-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      {p}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, j) => j !== idx))}
                        className="text-rose-400 hover:text-rose-300 text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">[ Click words above to construct statement ]</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Assembled Statement →
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-slate-950 rounded-2xl border border-amber-800/80 space-y-3"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step-by-Step Geographical Explanation:
                </h4>
                {currentChallengeObj.explanation
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
                      <strong className="text-amber-400 mr-1.5">{idx + 1}.</strong>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap gap-3">
                  {revealedSteps < currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold rounded-xl"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 to-slate-900 rounded-3xl border border-emerald-700 text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Himalayan Expedition Complete!
            </h2>
            
            {/* MOTIVATIONAL FEEDBACK */}
            <div className={`py-2 px-4 rounded-xl inline-block font-black text-base sm:text-lg tracking-wide ${
              errors === 0
                ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500'
                : errors <= 3
                ? 'bg-indigo-900/80 text-indigo-300 border border-indigo-500'
                : errors <= 7
                ? 'bg-amber-900/80 text-amber-300 border border-amber-500'
                : 'bg-rose-900/80 text-rose-300 border border-rose-500'
            }`}>
              {motivationalMessage}
            </div>

            <p className="text-sm text-slate-300">
              Final Composite Score: <strong className="text-emerald-400 font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-slate-400">
              Assessed Node Mastery Level: <strong className="text-white capitalize">{masteryLevel}</strong>
            </p>
          </div>

          {/* SPACED REPETITION SCHEDULE VISIBILITY */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                📅 Spaced Repetition Next Review (SM-2 Algorithm)
              </h4>
              <span className="px-3 py-1 bg-indigo-900 text-indigo-200 font-bold rounded-lg border border-indigo-700">
                Review in {srsIntervalDays} {srsIntervalDays === 1 ? 'day' : 'days'}
              </span>
            </div>
            <p className="text-slate-300">
              Based on your score and error count ({errors} {errors === 1 ? 'mistake' : 'mistakes'}), the spaced repetition scheduler recommends revising these concepts in <strong className="text-indigo-300 font-bold">{srsIntervalDays} {srsIntervalDays === 1 ? 'day' : 'days'}</strong> to guarantee long-term retention.
            </p>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                ⚠️ Your Targeted Conceptual Gap Review
              </h4>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/60 text-xs space-y-1">
                      <p className="font-bold text-rose-300">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ ICSE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Capstone Assignment */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              🌍 {REAL_WORLD_ACTIVITY.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {REAL_WORLD_ACTIVITY.description}
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400 list-disc pl-5">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Geography Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_GeographyTopographicalMapsIntroductionSim;
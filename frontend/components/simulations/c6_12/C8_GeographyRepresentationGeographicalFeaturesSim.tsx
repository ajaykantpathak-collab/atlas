'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Bar, Line } from 'recharts';

// Node IDs as string literals for ICSE Class 8 Geography
const NODE_C8_GEO_001 = 'c8_geo_001';
const NODE_C8_GEO_002 = 'c8_geo_002';
const NODE_C8_GEO_003 = 'c8_geo_003';
const NODE_C8_GEO_004 = 'c8_geo_004';
const NODE_C8_GEO_005 = 'c8_geo_005';
const NODE_C8_GEO_006 = 'c8_geo_006';
const NODE_C8_GEO_007 = 'c8_geo_007';
const NODE_C8_GEO_008 = 'c8_geo_008';
const NODE_C8_GEO_009 = 'c8_geo_009';
const NODE_C8_GEO_010 = 'c8_geo_010';
const NODE_C8_GEO_011 = 'c8_geo_011';
const NODE_C8_GEO_012 = 'c8_geo_012';

const ALL_NODE_IDS = [
  NODE_C8_GEO_001, NODE_C8_GEO_002, NODE_C8_GEO_003, NODE_C8_GEO_004,
  NODE_C8_GEO_005, NODE_C8_GEO_006, NODE_C8_GEO_007, NODE_C8_GEO_008,
  NODE_C8_GEO_009, NODE_C8_GEO_010, NODE_C8_GEO_011, NODE_C8_GEO_012
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Asian Geographical Expedition',
  intro: 'You are the chief cartographer and environmental surveyor for the National Geospatial Institute of India. A massive expedition across India and greater Asia is underway, surveying topo sheets, demographic pressures, disaster hazard zones, and regional biomes.',
  context: 'Your mission is to read topomaps accurately, decode demographic dynamics, prepare disaster mitigation strategies, and map the physical realms of Asia and India.'
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Look at a Survey of India 1:50,000 topo sheet. A feature is located at Easting 47 (3 tenths east) and Northing 31 (4 tenths north). Which is the exact 6-figure grid reference, and what rule applies?',
  options: [
    '314473 — Up the stairs first, then along the corridor',
    '473314 — Along the corridor (Eastings first), then up the stairs (Northings second)',
    '470310 — Round off to nearest main grid intersection',
    '310470 — Measure Northings first as latitude takes precedence'
  ],
  correctIndex: 1,
  hintAfter: 'Grid coordinates always read Eastings first, then Northings: Along the corridor, then up the stairs!'
};

// ─── BRILLIANT.ORG PREDICTION-THEN-CHECK QUESTIONS ───
export interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1_lapse_rate',
    question: 'Predict: If you ascend from sea level (0 m) to a Himalayan altitude of 3,000 m, how much will the atmospheric temperature drop according to the standard normal lapse rate?',
    options: [
      'Temperature will increase by approximately 19.5°C due to direct solar radiation',
      'Temperature will drop by approximately 19.5°C (6.5°C drop per 1,000 m elevation)',
      'Temperature remains unchanged because air pressure balances heat loss',
      'Temperature will drop by exactly 1.0°C regardless of height'
    ],
    correctIndex: 1,
    explanation: 'The tropospheric normal lapse rate causes a steady temperature drop of 6.5°C for every 1,000 m of ascent. At 3,000 m, the net decrease is 3 × 6.5 = 19.5°C.',
    verifyInstruction: 'Navigate to the Geospatial Parameter Sandbox and drag the Altitude slider to 3,000 m to verify the calculated -19.5°C temperature drop.'
  },
  {
    id: 'pred_2_demographic_shift',
    question: 'Predict: If a country reduces its Crude Birth Rate from 35 to 12 per 1,000 while its Death Rate remains at 7 per 1,000, how will the Natural Growth Rate and population pyramid structure change?',
    options: [
      'Growth rate surges to 4.2% per annum, forming a broad, expanding base',
      'Growth rate drops to 0.5% per annum, narrowing the base and producing a constrictive ageing pyramid',
      'Growth rate immediately becomes negative (-5.0%) leading to instant population extinction',
      'Natural growth rate stays identical because death rate was unchanged'
    ],
    correctIndex: 1,
    explanation: 'Natural Growth Rate % = (12 - 7) / 10 = 5 / 10 = 0.5% per annum. As birth rate plunges, fewer children enter the base (0-9 years), creating a constrictive pyramid shape typical of developed ageing nations.',
    verifyInstruction: 'Open Lab 2 (Demographic Simulator), set Birth Rate to 12 and Death Rate to 7, and observe both the 0.50% growth rate and the narrowing pyramid base.'
  }
];

// ─── BRILLIANT.ORG 'WHAT DO YOU NOTICE?' OBSERVATION QUESTIONS ───
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
    id: 'obs_1_climate_contrast',
    question: 'Observe the Verkhoyansk (Siberia) vs Mumbai (Coastal India) climate comparison chart. What is the most prominent observable pattern in their temperature ranges?',
    options: [
      'Verkhoyansk exhibits an almost flat temperature curve with less than 5°C annual fluctuation',
      'Verkhoyansk demonstrates an extreme continental temperature range spanning over 60°C (-45°C to +18°C), whereas Mumbai has an equable maritime climate (24°C to 32°C)',
      'Mumbai experiences freezing temperatures below -10°C during January winter',
      'Both cities receive identical precipitation regimes throughout the year'
    ],
    observableOptions: [
      'Verkhoyansk deep winter plunges to -45°C in Jan and warms to +18°C in Jul (63°C range)',
      'Mumbai line stays between 24°C and 32°C due to sea breezes moderating coastal temperatures',
      'Mumbai rainfall graph exhibits an enormous spike above 700 mm during June-July SW Monsoon',
      'Verkhoyansk monthly precipitation remains scarce (<40 mm) all year round'
    ],
    correctIndex: 1,
    explanation: 'Extreme continentality (remoteness from oceans) combined with high subarctic latitude causes Verkhoyansk to have Earth’s highest non-polar annual temperature range (>60°C), whereas Mumbai’s coastal position provides thermal moderation.'
  },
  {
    id: 'obs_2_disaster_loop',
    question: 'Observe the 4 phases of the Disaster Management Cycle and the Odisha cyclone preparedness case study. What is the critical observable factor that prevents mass casualties during catastrophic cyclones?',
    options: [
      'Waiting until landfall has occurred before activating any emergency personnel',
      'Pre-disaster early warnings (Preparedness) enabling proactive mass evacuation into reinforced shelters before storm surge impact',
      'Halting all recovery and reconstruction efforts permanently after storm passage',
      'Relying solely on post-disaster insurance compensation rather than physical coastal shelters'
    ],
    observableOptions: [
      'Preparedness activates radar tracking, early siren alerts, and pre-landfall evacuation',
      'Response initiates immediate search, rescue, and emergency medical triage at landfall',
      'Recovery restores housing, electricity grids, and economic livelihoods in subsequent weeks',
      'Mitigation constructs long-term bio-shields (mangroves) and reinforced cyclone shelters'
    ],
    correctIndex: 1,
    explanation: 'Observation of modern disaster telemetry reveals that proactive Preparedness and early warning issuance before landfall reduces storm casualties by over 98% compared to uncoordinated reactive measures.'
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

// ─── CHALLENGES ARRAY (24 Comprehensive ICSE Challenges) ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-8)
  {
    id: 'ch_001_topo_sym',
    nodeId: NODE_C8_GEO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On a Survey of India topo sheet, what does a blue broken line represent?',
    options: [
      'A perennial river that flows all year round',
      'A non-perennial (seasonal) river or dry watercourse',
      'An artificial irrigation canal with concrete banks',
      'An underground pipeline carrying drinking water'
    ],
    correctIndex: 1,
    explanation: 'A solid blue line denotes a perennial river with year-round flow. A broken blue line indicates a non-perennial (seasonal) river that flows only during the rainy season.',
    hints: [
      'Think about how maps differentiate seasonal streams from permanent rivers.',
      'A solid line shows permanent flow; broken lines show intermittent or dry beds.',
      'Broken blue lines signify seasonal (non-perennial) drainage.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_002_topo_scale',
    nodeId: NODE_C8_GEO_001,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A topo map has an RF of 1:50,000. How many metres on the ground does 4 cm on the map represent?',
    correctAnswer: 2000,
    tolerance: 50,
    unit: 'metres',
    explanation: '1 cm represents 50,000 cm = 500 m. Therefore, 4 cm represents 4 × 500 m = 2,000 m (or 2 km).',
    hints: [
      'Convert 50,000 cm to metres first by dividing by 100.',
      '1 cm on map = 500 m on ground.',
      'Multiply 500 m by 4 to get 2000 metres.'
    ]
  },
  {
    id: 'ch_003_pop_growth',
    nodeId: NODE_C8_GEO_002,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A district has a Crude Birth Rate of 26 per 1000 and a Crude Death Rate of 6 per 1000. Calculate its Natural Growth Rate in percentage.',
    correctAnswer: 2,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Natural Growth Rate % = (Birth Rate - Death Rate) / 10 = (26 - 6) / 10 = 20 / 10 = 2.0% per annum.',
    hints: [
      'Subtract the death rate from the birth rate to get the natural increase per 1000.',
      'Natural increase = 26 - 6 = 20 per 1000.',
      'Divide by 10 to convert per thousand into percentage (20 / 10 = 2.0%).'
    ]
  },
  {
    id: 'ch_004_migration_types',
    nodeId: NODE_C8_GEO_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following represents Rural-to-Urban migration in India?',
    options: [
      'A software engineer transferred from Bengaluru to Hyderabad',
      'A farmer from Saharsa, Bihar moving to Mumbai for textile mill work',
      'A retired government official moving from New Delhi to their ancestral village',
      'A bride moving to her spouse’s neighbouring agricultural village'
    ],
    correctIndex: 1,
    explanation: 'Villagers moving from rural hinterlands to metropolitan centres for industrial work is the primary rural-to-urban migration stream in India.',
    hints: [
      'Look for movement originating in a village and terminating in a large metropolis.',
      'Bihar countryside to Mumbai factories is rural-to-urban.',
      'Option 2 is the classic rural-to-urban example.'
    ]
  },
  {
    id: 'ch_005_urban_slum',
    nodeId: NODE_C8_GEO_004,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does a squatter settlement differ strictly from a standard slum?',
    options: [
      'Squatter settlements have formal municipal water meters, while slums do not',
      'Squatters occupy land illegally without title, whereas slums may sit on legal land with substandard amenities',
      'Slums are only located in Europe while squatter settlements exist in Asia',
      'Squatter settlements are planned satellite towns built by municipal bodies'
    ],
    correctIndex: 1,
    explanation: 'A slum denotes deteriorated housing and deficient amenities on land that may be legally owned or leased. Squatter settlements specifically denote illegal occupation of land without property title.',
    hints: [
      'Focus on legal property rights and ownership.',
      'Squatting implies occupying land without legal ownership.',
      'Option 2 correctly highlights the lack of legal land title in squatter settlements.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_006_disaster_types',
    nodeId: NODE_C8_GEO_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Indian institution operates the Indian Tsunami Early Warning Centre established after the 2004 disaster?',
    options: [
      'ISRO, Bengaluru',
      'INCOIS, Hyderabad',
      'BARC, Mumbai',
      'NITI Aayog, New Delhi'
    ],
    correctIndex: 1,
    explanation: 'The Indian National Centre for Ocean Information Services (INCOIS) at Hyderabad operates the National Tsunami Early Warning Centre.',
    hints: [
      'The ocean information agency is based in Telangana’s capital.',
      'Look for the acronym starting with INCOIS.',
      'INCOIS, Hyderabad operates tsunami buoy telemetry.'
    ]
  },
  {
    id: 'ch_007_asia_bounds',
    nodeId: NODE_C8_GEO_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which man-made waterway separates the Sinai Peninsula of Asia from the African mainland?',
    options: [
      'Panama Canal',
      'Suez Canal',
      'Kiel Canal',
      'Palk Strait'
    ],
    correctIndex: 1,
    explanation: 'The Suez Canal cuts across the Isthmus of Suez in Egypt, marking the boundary separating Asia from the African continent.',
    hints: [
      'It links the Mediterranean Sea to the Red Sea.',
      'Opened in 1869 in Egypt.',
      'It is the Suez Canal.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_008_asia_relief',
    nodeId: NODE_C8_GEO_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which plateau has an average elevation of 4,500 m and is famously termed the "Roof of the World"?',
    options: [
      'Deccan Plateau',
      'Tibetan Plateau',
      'Anatolian Plateau',
      'Arabian Plateau'
    ],
    correctIndex: 1,
    explanation: 'The Tibetan Plateau is the highest and largest plateau on Earth with an average elevation around 4,500 m, acting as the water tower of Asia.',
    hints: [
      'It lies north of the Great Himalayas.',
      'Major rivers like the Yangtze, Indus, and Brahmaputra rise here.',
      'It is the Tibetan Plateau.'
    ]
  },

  // Standard Tier (9-16)
  {
    id: 'ch_009_drag_topo',
    nodeId: NODE_C8_GEO_001,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag the topographical feature names to their correct positions on the Survey of India map layout.',
    dragItems: [
      { label: 'Perennial Stream', targetId: 'zone_stream' },
      { label: 'Nucleated Settlement', targetId: 'zone_village' },
      { label: 'Steep Contours', targetId: 'zone_cliff' },
      { label: 'Cultivated Land', targetId: 'zone_farm' }
    ],
    correctMapping: {
      zone_stream: 'Perennial Stream',
      zone_village: 'Nucleated Settlement',
      zone_cliff: 'Steep Contours',
      zone_farm: 'Cultivated Land'
    },
    explanation: 'Blue lines mark perennial streams; red clusters denote nucleated settlements; closely packed brown contours indicate steep slopes/cliffs; yellow shading marks cultivated agricultural land.',
    hints: [
      'Match blue with water and yellow with farming.',
      'Brown lines close together mean steep slopes.',
      'Red squares mark nucleated villages.'
    ]
  },
  {
    id: 'ch_010_pop_pyramid',
    nodeId: NODE_C8_GEO_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare a broad-based population pyramid (e.g. Nigeria) with a constrictive pyramid (e.g. Japan). What demographic challenge does Japan face?',
    options: [
      'Severe shortage of primary schools and hyper-inflation',
      'High young-age dependency and rapid population explosion',
      'Ageing population, shrinking domestic workforce, and rising pension-care burdens',
      'Extreme physiological density exceeding arable capacity'
    ],
    correctIndex: 2,
    explanation: 'A constrictive pyramid has a narrow base of infants and a bulging top of elderly citizens, causing an ageing society with high elderly dependency and labour shortages.',
    hints: [
      'A narrow base means very few children are being born.',
      'The top of the pyramid represents the elderly cohort.',
      'Japan faces workforce shrinkage and high geriatric healthcare costs.'
    ]
  },
  {
    id: 'ch_011_step_chain',
    nodeId: NODE_C8_GEO_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A family moves from a village to Gorakhpur, then to Lucknow, and finally settles in New Delhi. What distinct migration process is this?',
    options: [
      'Chain migration through family network sponsorship',
      'Step migration moving hierarchically through intermediate urban tiers',
      'Forced political emigration across international boundaries',
      'Seasonal transhumance migration'
    ],
    correctIndex: 1,
    explanation: 'Step migration is movement occurring in progressive stages up the urban hierarchy (village → small town → state capital → national metropolis).',
    hints: [
      'The movement progresses up size tiers in stages.',
      'It is not driven by relatives inviting them (chain).',
      'It is step migration.'
    ]
  },
  {
    id: 'ch_012_urban_problems',
    nodeId: NODE_C8_GEO_004,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the Indian metropolis to its primary urban challenge: Mumbai, Delhi, Bengaluru.',
    options: [
      'Mumbai: Acute Slum Housing; Delhi: Severe Winter Smog/Air Pollution; Bengaluru: Traffic Gridlock & Water Scarcity',
      'Mumbai: Desertification; Delhi: Coastal Surges; Bengaluru: Tundra Permafrost',
      'Mumbai: Depopulation; Delhi: Deforestation; Bengaluru: High infant mortality',
      'Mumbai: Overfarming; Delhi: Glacial Lake Outburst; Bengaluru: Volcanic ash'
    ],
    correctIndex: 0,
    explanation: 'Mumbai battles slum housing (Dharavi); Delhi suffers winter smog and vehicular particulate air pollution; Bengaluru faces rapid tech-growth traffic jams and lake depletion.',
    hints: [
      'Think of Mumbai’s Dharavi and Delhi’s winter air quality index.',
      'Bengaluru is the Silicon Valley facing IT corridor gridlocks.',
      'Option 1 correctly aligns each city with its signature challenge.'
    ]
  },
  {
    id: 'ch_013_bhopal_analysis',
    nodeId: NODE_C8_GEO_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the 1984 Bhopal Gas Tragedy, which chemical leaked due to systemic refrigeration and scrubber safety failures?',
    options: [
      'Potassium Cyanide',
      'Methyl Isocyanate (MIC)',
      'Sulphur Dioxide',
      'Carbon Monoxide'
    ],
    correctIndex: 1,
    explanation: 'Methyl Isocyanate (MIC) gas leaked from the Union Carbide pesticide plant in Bhopal in December 1984 due to disabled refrigeration units and non-functional scrubbers.',
    hints: [
      'The abbreviation is MIC.',
      'It was used in pesticide synthesis by Union Carbide.',
      'Methyl Isocyanate.'
    ]
  },
  {
    id: 'ch_014_climate_factors',
    nodeId: NODE_C8_GEO_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does Verkhoyansk in Siberia record winter lows below -40°C while Mumbai at the same longitude remains tropical?',
    options: [
      'Verkhoyansk has lower elevation than Mumbai',
      'Verkhoyansk is affected by high latitude and deep continentality far from moderating oceans',
      'Mumbai lies on the leeward rain-shadow slope of the Himalayas',
      'Verkhoyansk is heated by Western Disturbances in summer'
    ],
    correctIndex: 1,
    explanation: 'Verkhoyansk combines sub-arctic high latitude (above 60°N) with extreme continentality (thousands of km from warm seas), creating an enormous annual temperature range.',
    hints: [
      'Consider both the distance from the equator and the distance from the ocean.',
      'Continentality causes extreme temperature swings.',
      'Option 2 correctly pairs high latitude with continentality.'
    ]
  },
  {
    id: 'ch_015_veg_taiga',
    nodeId: NODE_C8_GEO_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do Siberian Coniferous (Taiga) trees physically adapt to severe sub-zero winters and heavy snowfall?',
    options: [
      'They develop broad flat deciduous leaves to absorb maximum snow moisture',
      'They have needle-shaped leaves with waxy cuticles and flexible cone-shaped crowns that shed snow',
      'They shed bark entirely during winter and store water in aerial roots',
      'They grow large buttress roots and a multi-layered canopy'
    ],
    correctIndex: 1,
    explanation: 'Needle leaves minimize transpiration surface area, and conical sloping branches allow snow loads to slide off without snapping the branches.',
    hints: [
      'Think of pine, fir, and spruce adaptations.',
      'Cones shed snow; needles stop evaporation.',
      'Option 2 describes needle leaves and cone-shaped architecture.'
    ]
  },
  {
    id: 'ch_016_india_coast_plains',
    nodeId: NODE_C8_GEO_011,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the segments of the Western Coastal Plain of India strictly from NORTH to SOUTH.',
    sortItems: [
      'Konkan Coast (Maharashtra & Goa)',
      'Kanara Coast (Karnataka)',
      'Malabar Coast (Kerala)'
    ],
    correctOrder: [0, 1, 2],
    explanation: 'From North to South along the Arabian Sea: Konkan Coast (North) → Kanara Coast (Middle) → Malabar Coast (South).',
    hints: [
      'Konkan around Mumbai is the northernmost.',
      'Malabar around Kochi is the southernmost.',
      'Kanara in Karnataka sits in the middle.'
    ],
    misconceptionIndex: 3
  },

  // Advanced Tier (17-24)
  {
    id: 'ch_017_disaster_cycle_sort',
    nodeId: NODE_C8_GEO_005,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the four continuous phases of the Disaster Management Cycle starting from the pre-disaster planning stage.',
    sortItems: [
      'Preparedness (Early warning, evacuation drills, shelter stocking)',
      'Response (Search, rescue, emergency triage, medical relief)',
      'Recovery (Rehabilitation, rebuilding infrastructure with resilient codes)',
      'Mitigation (Long-term hazard zoning, afforestation, building regulations)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Disaster management operates as a continuous closed loop: Preparedness (pre-event) → Response (during/immediate post-event) → Recovery (rehabilitation) → Mitigation (long-term risk reduction).',
    hints: [
      'Pre-disaster planning is Preparedness.',
      'Immediate crisis handling is Response.',
      'Reconstruction is Recovery, leading to permanent Mitigation.'
    ]
  },
  {
    id: 'ch_018_med_vs_monsoon',
    nodeId: NODE_C8_GEO_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Critique the rainfall regime of the Mediterranean climate (Lebanon/Israel) vs the Tropical Monsoon climate (India).',
    options: [
      'Both receive their peak rainfall during the hot summer solstice months',
      'Mediterranean has dry summers and wet winters; Tropical Monsoon has wet summers and dry winters',
      'Mediterranean receives convectional rain daily; Monsoon receives only frontal snow',
      'Both climates are completely arid with under 10 cm precipitation annually'
    ],
    correctIndex: 1,
    explanation: 'Mediterranean climates experience dry summers (under subtropical anticyclones) and receive rain in winter from Westerlies. Tropical Monsoon regions experience heavy summer rains (SW monsoon) and dry winters.',
    hints: [
      'Think about when India gets rain (June-Sept summer monsoon).',
      'Mediterranean regions get rain in the mild winter.',
      'They are inverted mirror opposites in seasonal rainfall.'
    ]
  },
  {
    id: 'ch_019_india_physio_density',
    nodeId: NODE_C8_GEO_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is Physiological Density always significantly higher than Arithmetic Density in agricultural nations like India?',
    options: [
      'Arithmetic density includes animal populations while physiological does not',
      'Physiological density divides population by arable land only, excluding mountains, deserts, and urban settlements',
      'Physiological density is measured only during night hours during the census',
      'Arithmetic density divides population by forest reserves alone'
    ],
    correctIndex: 1,
    explanation: 'Arithmetic density divides total population by gross total area. Physiological density divides the same population by only arable (cultivable) land. Because arable land is a fraction of total area, the denominator is much smaller, yielding a higher density.',
    hints: [
      'Arable land means cultivable land.',
      'Total land includes deserts, snow peaks, and rocky terrain.',
      'Dividing by a smaller denominator (arable only) yields a higher density.'
    ]
  },
  {
    id: 'ch_020_river_systems_construct',
    nodeId: NODE_C8_GEO_011,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Construct the profile of West-flowing Peninsular Rivers by selecting the 3 correct geological characteristics.',
    availableParts: [
      'Flow through fault rift valleys',
      'Form broad multi-channel deltas',
      'Drain into Arabian Sea forming estuaries',
      'Perennial snow-fed discharge',
      'Examples: Narmada and Tapi'
    ],
    targetState: 'Flow through fault rift valleys Drain into Arabian Sea forming estuaries Examples: Narmada and Tapi',
    validationHint: 'Select: Rift valleys, Arabian Sea estuaries, Narmada & Tapi.',
    explanation: 'The Narmada and Tapi flow westward through structural rift valleys between the Vindhyas and Satpuras, emptying into the Arabian Sea with estuaries rather than deltas.',
    hints: [
      'They flow west, so they do NOT form deltas on the Bay of Bengal.',
      'They run through rift valleys into the Arabian Sea.',
      'Narmada and Tapi are the key examples.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_021_human_resources_sectors',
    nodeId: NODE_C8_GEO_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An economy transitions workers from subsistence farming to software engineering and banking. How has its occupational structure shifted?',
    options: [
      'From Secondary Sector to Primary Sector',
      'From Primary Sector directly into Tertiary (Service) Sector',
      'From Quaternary Sector to Informal Manufacturing',
      'No structural shift has occurred'
    ],
    correctIndex: 1,
    explanation: 'Agriculture is the Primary Sector (direct extraction of natural resources). Software and banking belong to the Tertiary Sector (services).',
    hints: [
      'Farming is Primary.',
      'Banking and IT services are Tertiary.',
      'The shift is from Primary to Tertiary.'
    ]
  },
  {
    id: 'ch_022_npp_objectives',
    nodeId: NODE_C8_GEO_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which of the following is a core objective of India’s National Population Policy (NPP 2000)?',
    options: [
      'Imposing mandatory one-child legal penalties on all families',
      'Stabilising population, lowering fertility to replacement levels, and improving maternal-child health',
      'Halting all rural-to-urban internal migration by decree',
      'Banning primary sector employment in Gangetic states'
    ],
    correctIndex: 1,
    explanation: 'NPP 2000 aims to achieve population stabilisation, reduce Total Fertility Rate to replacement level (2.1), enhance maternal and child health, and promote delayed marriage through voluntary family welfare.',
    hints: [
      'India’s policy is voluntary, not coercive like China’s former one-child policy.',
      'It focuses on maternal-child healthcare and fertility stabilization.',
      'Option 2 represents the true constitutional framework of NPP 2000.'
    ]
  },
  {
    id: 'ch_023_asia_rivers_mouth',
    nodeId: NODE_C8_GEO_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The three great Siberian rivers — Ob, Yenisei, and Lena — share which unique drainage characteristic?',
    options: [
      'They flow southward through inland drainage into the Aral Sea',
      'They flow northward across the Siberian plains and empty into the frozen Arctic Ocean',
      'They form extensive mangrove delta ecosystems along the Pacific Rim',
      'They originate in the Arabian Desert dunes'
    ],
    correctIndex: 1,
    explanation: 'The Ob, Yenisei, and Lena flow northwards down the gradient of the Siberian plains into the Arctic Ocean, often causing severe spring flooding when their upper reaches thaw before their frozen mouths.',
    hints: [
      'Look at northern Russia on the physical map.',
      'They drain into the polar waters at the top of the continent.',
      'They flow north into the Arctic Ocean.'
    ]
  },
  {
    id: 'ch_024_urban_solutions_eval',
    nodeId: NODE_C8_GEO_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To resolve unchecked urban sprawl in an Indian metropolis, what spatial planning policy directly restricts outward peripheral expansion?',
    options: [
      'Building additional multi-lane highways radiating outwards infinitely',
      'Establishing a protected Green Belt ring around the city perimeter coupled with high-density transit corridors',
      'Demolishing all public transit lines to favor private vehicles',
      'Closing municipal schools to reduce city density'
    ],
    correctIndex: 1,
    explanation: 'A Green Belt is a legally protected buffer zone of agricultural and forest land surrounding an urban core, forcing compact transit-oriented development and containing sprawl.',
    hints: [
      'Think about nature rings around cities like London or Chandigarh.',
      'A green perimeter halts continuous suburban construction.',
      'Green Belts limit sprawl and protect rural fringes.'
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
  nodeId: NODE_C8_GEO_001,
  title: 'ICSE Class 8 Comprehensive Geography Suite',
  definition: 'An integrated study of Topographical Map Representation, Demographic Dynamics, Migration, Urbanisation, Natural & Man-made Disasters, Physical & Climatic Realms of Asia, and Indian Physical & Human Resources.',
  eli5: 'Think of Geography as Earth’s giant user manual: Topo maps give you the secret code, population models show who lives where, disaster cycles keep communities safe, and physical maps show how mountains, rivers, and monsoons shape human life.',
  misconceptions: [
    {
      misconception: 'A seasonal river and a perennial river look identical on topo maps.',
      correction: 'Perennial rivers with year-round flow are drawn as solid blue lines. Non-perennial seasonal rivers are drawn as broken blue lines.'
    },
    {
      misconception: 'Slums and squatter settlements are the exact same legal classification.',
      correction: 'Slums are dilapidated neighbourhoods that may be on legally owned land. Squatter settlements specifically denote illegal occupation lacking land title.'
    },
    {
      misconception: 'The Suez Canal separates Asia from Europe.',
      correction: 'The Suez Canal separates Asia (Sinai Peninsula) from Africa. The Asia-Europe boundary is marked by the Urals, Caspian Sea, Caucasus, and Black Sea.'
    },
    {
      misconception: 'Konkan coast is the southernmost stretch of the Western Coastal Plain.',
      correction: 'From North to South, the Western Coastal Plain consists of Konkan (Maharashtra/Goa) → Kanara (Karnataka) → Malabar (Kerala).'
    },
    {
      misconception: 'All Peninsular rivers flow eastwards into the Bay of Bengal.',
      correction: 'Narmada and Tapi flow westwards through rift valleys into the Arabian Sea and form estuaries rather than deltas.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the RF scale if 1 cm on the map equals 500 m on the ground?', options: ['1:5,000', '1:50,000', '1:500,000', '1:25,000'], correctIndex: 1 },
    { question: 'What is the 3-figure bearing of a village lying due South-East?', options: ['045°', '090°', '135°', '225°'], correctIndex: 2 },
    { question: 'Which formula yields the Natural Population Growth Rate %?', options: ['(Births + Deaths) / 100', '(Birth Rate - Death Rate) / 10', 'Birth Rate × Death Rate', 'Total People / Arable Land'], correctIndex: 1 },
    { question: 'Which chemical caused the 1984 Bhopal Disaster?', options: ['Methyl Isocyanate', 'Hydrogen Cyanide', 'Ammonia', 'Nitrogen Dioxide'], correctIndex: 0 },
    { question: 'Which mountain range marks the land boundary between Asia and Europe?', options: ['Himalayas', 'Ural Mountains', 'Alps', 'Andes'], correctIndex: 1 },
    { question: 'What is the highest peak in the world, located in the Himalayas?', options: ['K2', 'Kanchenjunga', 'Mount Everest (8848 m)', 'Nanda Devi'], correctIndex: 2 },
    { question: 'Which Asian climate zone features dry summers and wet mild winters?', options: ['Equatorial', 'Tropical Monsoon', 'Mediterranean', 'Tundra'], correctIndex: 2 },
    { question: 'Which sector of the economy employs the largest workforce in India?', options: ['Primary Sector', 'Secondary Sector', 'Tertiary Sector', 'Quaternary Sector'], correctIndex: 0 }
  ],
  masteryCriteria: 'Student demonstrates full mastery of topo mapping, demographic formulas, disaster cycle management, Asian physical & climate biomes, and Indian geography.',
  onComplete: () => {}
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Interactive Topo Map Lab (Grid & Scale)',
    instruction: 'Adjust the Map Coordinate sliders (Eastings & Northings) to pinpoint topographical features and convert scale in real time.',
    interactionType: 'topo-grid',
    nodeId: NODE_C8_GEO_001
  },
  {
    title: 'Demographic Dynamics & Pyramid Simulator',
    instruction: 'Drag Birth Rate and Death Rate sliders to observe how the Population Pyramid shape dynamically evolves from broad-based to constrictive.',
    interactionType: 'demographic-sim',
    nodeId: NODE_C8_GEO_002
  },
  {
    title: 'Disaster Management Preparedness Lab',
    instruction: 'Cycle through the 4 phases of Disaster Management for an Odisha coastal cyclone and test risk mitigation responses.',
    interactionType: 'disaster-cycle',
    nodeId: NODE_C8_GEO_005
  },
  {
    title: 'Asia Physical & Biome Explorer',
    instruction: 'Click different Asian latitude zones from Equatorial (0°) to Polar (75°N) to inspect live temperature, precipitation, and biome flora.',
    interactionType: 'asia-climate',
    nodeId: NODE_C8_GEO_009
  },
  {
    title: 'India Physical & Human Resource Balancer',
    instruction: 'Manipulate rural development and secondary/tertiary education investments to balance India’s human resource productivity.',
    interactionType: 'india-hr',
    nodeId: NODE_C8_GEO_012
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Survey of India Regional Analyst Challenge',
  description: 'Download or inspect an official 1:50,000 Survey of India Topographical Sheet for your home district. Locate your school using a 6-figure grid reference, determine its 3-figure bearing from the nearest railway station, and assess local flood/drainage resilience.',
  steps: [
    'Obtain or view a 1:50,000 Topo Sheet section (e.g. 45 D/7 or 53 K/2).',
    'Locate a prominent temple or school and calculate its 6-figure grid reference (Eastings first, tenths, Northings, tenths).',
    'Measure the curved distance of the nearest metalled road or seasonal stream using a thread and graphical scale.',
    'Identify whether settlements are nucleated, linear, or dispersed, and evaluate their disaster preparedness.'
  ]
};

// ─── CLIMATE DATA FOR RECHARTS ───
const CLIMATE_GRAPH_DATA = [
  { month: 'Jan', verkhoyanskTemp: -45, verkhoyanskRain: 8, mumbaiTemp: 24, mumbaiRain: 2 },
  { month: 'Feb', verkhoyanskTemp: -40, verkhoyanskRain: 7, mumbaiTemp: 25, mumbaiRain: 1 },
  { month: 'Mar', verkhoyanskTemp: -22, verkhoyanskRain: 6, mumbaiTemp: 28, mumbaiRain: 1 },
  { month: 'Apr', verkhoyanskTemp: -5, verkhoyanskRain: 8, mumbaiTemp: 30, mumbaiRain: 2 },
  { month: 'May', verkhoyanskTemp: 8, verkhoyanskRain: 14, mumbaiTemp: 32, mumbaiRain: 15 },
  { month: 'Jun', verkhoyanskTemp: 16, verkhoyanskRain: 28, mumbaiTemp: 30, mumbaiRain: 520 },
  { month: 'Jul', verkhoyanskTemp: 18, verkhoyanskRain: 36, mumbaiTemp: 28, mumbaiRain: 750 },
  { month: 'Aug', verkhoyanskTemp: 14, verkhoyanskRain: 32, mumbaiTemp: 28, mumbaiRain: 480 },
  { month: 'Sep', verkhoyanskTemp: 4, verkhoyanskRain: 22, mumbaiTemp: 28, mumbaiRain: 310 },
  { month: 'Oct', verkhoyanskTemp: -14, verkhoyanskRain: 16, mumbaiTemp: 29, mumbaiRain: 60 },
  { month: 'Nov', verkhoyanskTemp: -35, verkhoyanskRain: 12, mumbaiTemp: 28, mumbaiRain: 10 },
  { month: 'Dec', verkhoyanskTemp: -42, verkhoyanskRain: 9, mumbaiTemp: 26, mumbaiRain: 2 }
];

// ─── MAIN COMPONENT ───
function C8_GeographyRepresentationGeographicalFeaturesSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌍', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction-Then-Check State (Brilliant Pattern)
  const [activePredIdx, setActivePredIdx] = useState(0);
  const [predSelected, setPredSelected] = useState<Record<number, number>>({});
  const [predChecked, setPredChecked] = useState<Record<number, boolean>>({});

  // Observation State (Brilliant Pattern)
  const [activeObsIdx, setActiveObsIdx] = useState(0);
  const [obsSelected, setObsSelected] = useState<Record<number, number>>({});
  const [obsChecked, setObsChecked] = useState<Record<number, boolean>>({});

  // Challenge Interactivity State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection Responses State
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // Drag-and-drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Effects State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive Simulator Controls
  const [topoEasting, setTopoEasting] = useState(47);
  const [topoTenthEast, setTopoTenthEast] = useState(3);
  const [topoNorthing, setTopoNorthing] = useState(31);
  const [topoTenthNorth, setTopoTenthNorth] = useState(4);
  const [topoScaleCm, setTopoScaleCm] = useState(4);
  const [activeTopoLayer, setActiveTopoLayer] = useState<'all' | 'drainage' | 'relief' | 'settlement'>('all');

  const [simBirthRate, setSimBirthRate] = useState(24);
  const [simDeathRate, setSimDeathRate] = useState(7);
  const [simArableLand, setSimArableLand] = useState(150);
  const [simTotalPop, setSimTotalPop] = useState(1400);

  const [activeDisasterTab, setActiveDisasterTab] = useState<'preparedness' | 'response' | 'recovery' | 'mitigation'>('preparedness');
  const [cycloneWarningCategory, setCycloneWarningCategory] = useState(3);
  const [evacuationOrderGiven, setEvacuationOrderGiven] = useState(false);

  const [selectedZoneIndex, setSelectedZoneIndex] = useState(1);
  const [asiaContinentalityDistance, setAsiaContinentalityDistance] = useState(500);

  const [eduInvestment, setEduInvestment] = useState(60);
  const [healthInvestment, setHealthInvestment] = useState(55);
  const [skillInvestment, setSkillInvestment] = useState(50);

  const [sandboxElevation, setSandboxElevation] = useState(500);
  const [sandboxRainfall, setSandboxRainfall] = useState(120);

  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Motivational message based on errors
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) return { title: 'PERFECT SCORE!', desc: 'Flawless cartography and geographical analysis! You scored 100% with zero errors.' };
    if (errors >= 1 && errors <= 3) return { title: 'Great work!', desc: 'Superb geospatial reasoning! You demonstrated high ICSE competency with minimal mistakes.' };
    if (errors >= 4 && errors <= 7) return { title: 'Good effort!', desc: 'Solid attempt! Review the targeted concepts and retry to achieve full mastery.' };
    return { title: 'Do not give up — You WILL get this!', desc: 'Geography is all about pattern recognition. Practice with the map coordinates and disaster loops!' };
  }, [errors]);

  // Spaced repetition schedule based on error count
  const srsSchedule = useMemo(() => {
    if (errors === 0) {
      return {
        days: 7,
        label: 'review in 7 days',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        note: 'Outstanding retention! Mastered concepts scheduled for week-long consolidation.'
      };
    }
    if (errors >= 1 && errors <= 3) {
      return {
        days: 3,
        label: 'review in 3 days',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        note: 'Good foundation with minor gaps. Mid-term review scheduled in 3 days.'
      };
    }
    return {
      days: 1,
      label: 'review in 1 day',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      note: 'Critical misconceptions encountered. Immediate 24-hour reinforcement required.'
    };
  }, [errors]);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  const calculatedNaturalGrowthRate = useMemo(() => {
    return ((simBirthRate - simDeathRate) / 10).toFixed(2);
  }, [simBirthRate, simDeathRate]);

  const calculatedPhysiologicalDensity = useMemo(() => {
    return (simTotalPop / (simArableLand / 100)).toFixed(0);
  }, [simTotalPop, simArableLand]);

  const calculatedArithmeticDensity = useMemo(() => {
    return (simTotalPop / 3.28).toFixed(0);
  }, [simTotalPop]);

  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

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

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const angle = (frame * 0.03) % (Math.PI * 2);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(cx, cy) - 10;

      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 4 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText(`GEODETIC RADAR: E${topoEasting}.${topoTenthEast} N${topoNorthing}.${topoTenthNorth}`, 10, 15);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [topoEasting, topoTenthEast, topoNorthing, topoTenthNorth]);

  const handleDiscoveryAnswer = useCallback((index: number) => {
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Splendid observation! That is the golden rule of grid coordinates.' : 'Notice the rule: Along the corridor first, then up the stairs!');
  }, []);

  const handlePredictionSelect = useCallback((predIndex: number, optionIndex: number) => {
    setPredSelected(prev => ({ ...prev, [predIndex]: optionIndex }));
    setPredChecked(prev => ({ ...prev, [predIndex]: true }));
    const isCorrect = optionIndex === PREDICTION_QUESTIONS[predIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Prediction verified! Great hypothesis.' : 'Interesting hypothesis. Verify with the simulation controls!');
  }, []);

  const handleObservationSelect = useCallback((obsIndex: number, optionIndex: number) => {
    setObsSelected(prev => ({ ...prev, [obsIndex]: optionIndex }));
    setObsChecked(prev => ({ ...prev, [obsIndex]: true }));
    const isCorrect = optionIndex === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Check the data curves carefully.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Geographical Laboratories. Discover by doing!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode unlocked. Experiment with all geographical parameters without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering ICSE Board Competency Challenges. Good luck surveyor!');
  }, []);

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
      audioManager.play('chime');
      speechManager.speak('Hints exhausted. Let us analyze the complete geographical explanation together.');
    }
  }, [hintCount, challenge]);

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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding geographical precision.');
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
        speechManager.speak('Let us review the step-by-step ICSE walkthrough.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, showNextHint, hitMisconceptions]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have successfully completed the ICSE Class 8 Geography Expedition.');
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

  const handleSlideNext = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide(s => s + 1);
      audioManager.play('whoosh');
    } else {
      handleAdvanceToSandbox();
    }
  }, [currentSlide, handleAdvanceToSandbox]);

  const handleSlidePrev = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">

      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950/50"
            role="img"
            aria-label="Geography Icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ICSE Class 8
              </span>
              <span className="text-xs font-semibold text-slate-400">Humanities Stream</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800" role="navigation" aria-label="Simulation Phase Navigation">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Navigate to ${p} phase`}
              onClick={() => {
                if (p === 'complete') handleComplete();
                else setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY & PREDICTION HOOKS ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 rounded-3xl border border-emerald-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🧭 Expedition Briefing</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs text-slate-400">
              {SCENARIO.context}
            </div>
          </div>

          {/* Discovery Question Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span>⚡ Pre-Survey Curiosity Challenge</span>
            </div>
            <p className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="radiogroup" aria-label="Pre-survey discovery options">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-2xl text-sm font-medium border transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                      : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-emerald-500/50 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓' : discoveryAnswered ? '✗' : String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-700/40 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-bold text-emerald-300">
                    {discoveryCorrect ? '✓ Correct! Excellent cartographic thinking!' : '✗ Incorrect. Notice the logic!'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Launch Interactive Labs"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-black rounded-2xl shadow-lg shadow-emerald-700/40 shrink-0"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* ─── BRILLIANT.ORG PREDICTION-THEN-CHECK MODULE ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <span>🔮 Predict-Then-Check Inquiries (Brilliant Pattern)</span>
              </div>
              <div className="flex gap-2">
                {PREDICTION_QUESTIONS.map((_, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => setActivePredIdx(pIdx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      activePredIdx === pIdx ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Prediction {pIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <p className="text-sm font-bold text-white">{PREDICTION_QUESTIONS[activePredIdx].question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[activePredIdx].options.map((opt, optIdx) => {
                  const isChosen = predSelected[activePredIdx] === optIdx;
                  const isChecked = predChecked[activePredIdx];
                  const isCorrect = optIdx === PREDICTION_QUESTIONS[activePredIdx].correctIndex;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handlePredictionSelect(activePredIdx, optIdx)}
                      className={`p-3 text-left rounded-xl text-xs font-medium border transition-all ${
                        isChecked
                          ? isCorrect
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : isChosen
                            ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                          : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-500/50'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {predChecked[activePredIdx] && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl space-y-1">
                  <p className="text-xs text-cyan-300 font-semibold">{PREDICTION_QUESTIONS[activePredIdx].explanation}</p>
                  <p className="text-[11px] text-amber-300 font-mono mt-1">
                    🔍 <strong>How to Verify:</strong> {PREDICTION_QUESTIONS[activePredIdx].verifyInstruction}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION & OBSERVATIONS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

          {/* Stepper Tabs */}
          <div className="grid grid-cols-5 gap-2" role="tablist" aria-label="Exploration Laboratories">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                role="tab"
                aria-selected={currentSlide === idx}
                aria-label={`Open ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`p-2.5 rounded-2xl text-left border transition-all ${
                  currentSlide === idx
                    ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] uppercase font-bold text-emerald-400">Lab {idx + 1}</div>
                <div className="text-xs font-bold truncate">{step.title}</div>
              </motion.button>
            ))}
          </div>

          {/* Active Interactive Lab Canvas */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* LAB 1: TOPO MAP SIMULATOR */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative flex flex-col items-center">
                    <svg viewBox="0 0 400 300" className="w-full h-auto rounded-xl" aria-label="Survey of India Topographical Map Visualization">
                      <defs>
                        <pattern id="topoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="400" height="300" fill="url(#topoGrid)" />

                      {(activeTopoLayer === 'all' || activeTopoLayer === 'relief') && (
                        <rect x="40" y="40" width="160" height="120" fill="#eab308" opacity="0.25" rx="10" />
                      )}

                      {(activeTopoLayer === 'all' || activeTopoLayer === 'relief') && (
                        <g stroke="#b45309" strokeWidth="1.5" fill="none">
                          <ellipse cx="300" cy="80" rx="60" ry="40" />
                          <ellipse cx="300" cy="80" rx="45" ry="30" />
                          <ellipse cx="300" cy="80" rx="30" ry="20" strokeWidth="2" />
                          <text x="300" y="85" fill="#f59e0b" fontSize="8" textAnchor="middle">Peak 480 m</text>
                        </g>
                      )}

                      {(activeTopoLayer === 'all' || activeTopoLayer === 'drainage') && (
                        <g>
                          <path d="M 0 150 Q 150 180 250 220 T 400 280" fill="none" stroke="#38bdf8" strokeWidth="3" />
                          <text x="260" y="240" fill="#38bdf8" fontSize="8" fontWeight="bold">Perennial River (Solid)</text>
                          <path d="M 200 40 Q 220 100 240 180" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6 4" />
                          <text x="170" y="90" fill="#0ea5e9" fontSize="7">Seasonal Stream</text>
                        </g>
                      )}

                      {(activeTopoLayer === 'all' || activeTopoLayer === 'settlement') && (
                        <g fill="#ef4444">
                          <rect x="80" y="80" width="12" height="12" rx="2" />
                          <rect x="96" y="80" width="12" height="12" rx="2" />
                          <rect x="88" y="96" width="12" height="12" rx="2" />
                          <rect x="104" y="96" width="12" height="12" rx="2" />
                          <text x="96" y="74" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">Village Rampur</text>
                        </g>
                      )}

                      <g transform={`translate(${(topoEasting - 45) * 80 + topoTenthEast * 8}, ${300 - ((topoNorthing - 30) * 80 + topoTenthNorth * 8)})`}>
                        <motion.circle
                          animate={{ r: [6, 12, 6] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          fill="#10b981"
                          opacity="0.5"
                        />
                        <circle cx="0" cy="0" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                        <line x1="-15" y1="0" x2="15" y2="0" stroke="#10b981" strokeWidth="1" />
                        <line x1="0" y1="-15" x2="0" y2="15" stroke="#10b981" strokeWidth="1" />
                        <text x="10" y="-8" fill="#34d399" fontSize="9" fontWeight="bold">
                          [{topoEasting}{topoTenthEast}{topoNorthing}{topoTenthNorth}]
                        </text>
                      </g>
                    </svg>

                    <div className="w-full mt-3 p-2 bg-slate-900 rounded-xl flex items-center justify-between text-xs border border-slate-800">
                      <span className="text-slate-400">Scale 1:50,000 (1 cm = 500 m)</span>
                      <span className="text-emerald-400 font-bold">
                        {topoScaleCm} cm on map = {topoScaleCm * 0.5} km on ground
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="text-xs font-bold text-slate-300 uppercase">Grid Address Controls</div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Easting (Corridor): <strong className="text-white">{topoEasting}</strong></span>
                          <span>Tenth: <strong className="text-emerald-400">.{topoTenthEast}</strong></span>
                        </div>
                        <input
                          type="range"
                          min={45}
                          max={48}
                          value={topoEasting}
                          aria-label="Easting primary slider"
                          onChange={(e) => setTopoEasting(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                        <input
                          type="range"
                          min={0}
                          max={9}
                          value={topoTenthEast}
                          aria-label="Easting tenth slider"
                          onChange={(e) => setTopoTenthEast(Number(e.target.value))}
                          className="w-full accent-emerald-400 mt-1"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Northing (Stairs): <strong className="text-white">{topoNorthing}</strong></span>
                          <span>Tenth: <strong className="text-emerald-400">.{topoTenthNorth}</strong></span>
                        </div>
                        <input
                          type="range"
                          min={30}
                          max={33}
                          value={topoNorthing}
                          aria-label="Northing primary slider"
                          onChange={(e) => setTopoNorthing(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                        <input
                          type="range"
                          min={0}
                          max={9}
                          value={topoTenthNorth}
                          aria-label="Northing tenth slider"
                          onChange={(e) => setTopoTenthNorth(Number(e.target.value))}
                          className="w-full accent-emerald-400 mt-1"
                        />
                      </div>

                      <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-center">
                        <span className="text-xs text-slate-400">6-Figure Grid Reference:</span>
                        <div className="text-2xl font-black text-emerald-300 font-mono tracking-widest mt-0.5">
                          {topoEasting}{topoTenthEast}{topoNorthing}{topoTenthNorth}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800" role="group" aria-label="Map Layer Toggles">
                      {(['all', 'drainage', 'relief', 'settlement'] as const).map((layer) => (
                        <button
                          key={layer}
                          aria-label={`Show ${layer} layer`}
                          onClick={() => {
                            setActiveTopoLayer(layer);
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl capitalize ${
                            activeTopoLayer === layer
                              ? 'bg-emerald-600 text-white'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {layer}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: DEMOGRAPHIC PYRAMID SIMULATOR */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
                      <span>Age-Sex Pyramid Visualization</span>
                      <span className="text-emerald-400 font-mono">Growth: {calculatedNaturalGrowthRate}%</span>
                    </div>

                    <svg viewBox="0 0 400 240" className="w-full h-auto" aria-label="Population Age Sex Pyramid">
                      <line x1="200" y1="20" x2="200" y2="220" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="140" y="15" fill="#38bdf8" fontSize="10" fontWeight="bold">MALES (%)</text>
                      <text x="220" y="15" fill="#f472b6" fontSize="10" fontWeight="bold">FEMALES (%)</text>

                      {[
                        { age: '80+', factor: Math.max(2, 20 - simDeathRate * 1.5) },
                        { age: '60-79', factor: Math.max(6, 40 - simDeathRate * 2.2) },
                        { age: '40-59', factor: 55 },
                        { age: '20-39', factor: 70 },
                        { age: '10-19', factor: simBirthRate * 2.8 },
                        { age: '0-9', factor: simBirthRate * 3.4 }
                      ].map((cohort, i) => {
                        const y = 30 + i * 30;
                        const barW = Math.min(180, cohort.factor * 1.8);
                        return (
                          <g key={cohort.age}>
                            <rect x={200 - barW} y={y} width={barW} height="20" fill="#38bdf8" opacity="0.8" rx="3" />
                            <rect x="200" y={y} width={barW} height="20" fill="#f472b6" opacity="0.8" rx="3" />
                            <text x="200" y={y + 14} fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">
                              {cohort.age}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Arithmetic Density:</span>
                        <div className="text-lg font-black text-white">{calculatedArithmeticDensity} <span className="text-xs font-normal text-slate-400">persons/km²</span></div>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Physiological Density:</span>
                        <div className="text-lg font-black text-emerald-300">{calculatedPhysiologicalDensity} <span className="text-xs font-normal text-slate-400">persons/km² arable</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Crude Birth Rate (per 1000):</span>
                          <strong className="text-emerald-400">{simBirthRate}</strong>
                        </div>
                        <input
                          type="range"
                          min={8}
                          max={45}
                          value={simBirthRate}
                          aria-label="Crude Birth Rate Slider"
                          onChange={(e) => {
                            setSimBirthRate(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Crude Death Rate (per 1000):</span>
                          <strong className="text-rose-400">{simDeathRate}</strong>
                        </div>
                        <input
                          type="range"
                          min={4}
                          max={25}
                          value={simDeathRate}
                          aria-label="Crude Death Rate Slider"
                          onChange={(e) => {
                            setSimDeathRate(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-rose-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Arable Land (Million Hectares):</span>
                          <strong className="text-amber-400">{simArableLand} M ha</strong>
                        </div>
                        <input
                          type="range"
                          min={80}
                          max={200}
                          value={simArableLand}
                          aria-label="Arable Land Slider"
                          onChange={(e) => {
                            setSimArableLand(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1 text-slate-300">
                        <div><strong>Pyramid Profile:</strong> {simBirthRate > 25 ? 'Expanding Broad-Based (Young Pop)' : simBirthRate < 14 ? 'Constrictive (Ageing Society)' : 'Stationary Box Shape'}</div>
                        <div className="text-slate-400">Formula: Natural Growth % = (Births - Deaths) / 10</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: DISASTER MANAGEMENT CYCLE */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="tablist" aria-label="Disaster Management Cycle Phases">
                    {[
                      { id: 'preparedness', title: '1. Preparedness', desc: 'Pre-disaster sirens, drills & stock', color: 'border-amber-500 text-amber-300' },
                      { id: 'response', title: '2. Response', desc: 'Search, rescue & medical triage', color: 'border-rose-500 text-rose-300' },
                      { id: 'recovery', title: '3. Recovery', desc: 'Rehabilitation & reconstruction', color: 'border-blue-500 text-blue-300' },
                      { id: 'mitigation', title: '4. Mitigation', desc: 'Building codes & mangrove belts', color: 'border-emerald-500 text-emerald-300' }
                    ].map((phaseItem) => (
                      <motion.button
                        key={phaseItem.id}
                        role="tab"
                        aria-selected={activeDisasterTab === phaseItem.id}
                        aria-label={`Select ${phaseItem.title}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setActiveDisasterTab(phaseItem.id as any);
                          audioManager.play('tap');
                        }}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          activeDisasterTab === phaseItem.id
                            ? `bg-slate-900 ${phaseItem.color} shadow-lg`
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-sm">{phaseItem.title}</div>
                        <div className="text-[11px] text-slate-400 mt-1">{phaseItem.desc}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                        Case Study: Bay of Bengal Cyclone Warning
                      </span>
                      <h4 className="text-lg font-bold text-white">Odisha Coastal Preparedness Protocol</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Tropical cyclones generate massive storm surges. India’s IMD telemetry issues early alerts to deploy NDRF units, activate cyclone shelters, and initiate pre-landfall evacuations.
                      </p>

                      <div className="flex gap-4 items-center pt-2">
                        <label className="text-xs text-slate-400">Cyclone Intensity Category:</label>
                        <input
                          type="range"
                          min={1}
                          max={5}
                          value={cycloneWarningCategory}
                          aria-label="Cyclone Warning Category Slider"
                          onChange={(e) => setCycloneWarningCategory(Number(e.target.value))}
                          className="accent-rose-500"
                        />
                        <span className="text-sm font-bold text-rose-400 font-mono">Cat {cycloneWarningCategory}</span>
                      </div>
                    </div>

                    <div className="md:col-span-5 p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
                      <div className="text-xs text-slate-400">Emergency Evacuation Command</div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={evacuationOrderGiven ? 'Evacuation Executed' : 'Issue Immediate Evacuation Order'}
                        onClick={() => {
                          setEvacuationOrderGiven(!evacuationOrderGiven);
                          audioManager.play(evacuationOrderGiven ? 'pop' : 'success');
                          if (!evacuationOrderGiven) speechManager.speak('Category 3+ warning issued. 1.2 million citizens moved to reinforced cyclone shelters.');
                        }}
                        className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all ${
                          evacuationOrderGiven
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white animate-pulse'
                        }`}
                      >
                        {evacuationOrderGiven ? '✓ Evacuation Executed (1M+ Safe)' : '🚨 Issue Immediate Evacuation Order'}
                      </motion.button>
                      <span className="text-[10px] text-slate-400">
                        Status: {evacuationOrderGiven ? '✓ Lives saved via INCOIS/IMD Early Warning' : '⏳ Awaiting Administrative Order'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: ASIA CLIMATE & BIOME EXPLORER */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-3">
                      <span>Extreme Continentality (Verkhoyansk, Siberia) vs Tropical Coastal (Mumbai)</span>
                      <span className="text-emerald-400">12-Month Regime Graph</span>
                    </div>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={CLIMATE_GRAPH_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                          />
                          <Legend wrapperStyle={{ fontSize: '11px' }} />
                          <Line type="monotone" dataKey="verkhoyanskTemp" name="Verkhoyansk Temp (°C)" stroke="#38bdf8" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="mumbaiTemp" name="Mumbai Temp (°C)" stroke="#f59e0b" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="mumbaiRain" name="Mumbai Rainfall (mm)" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: 'Equatorial Rainforest', region: 'Indonesia / Malaysia', flora: 'Mahogany, Rosewood, Canopy Layering', icon: '🌴' },
                      { name: 'Tropical Monsoon', region: 'India / Myanmar', flora: 'Teak, Sal, Sandalwood (Deciduous)', icon: '🌳' },
                      { name: 'Taiga Coniferous', region: 'Central Siberia', flora: 'Pine, Fir, Spruce (Needle leaves)', icon: '🌲' },
                      { name: 'Tundra Permafrost', region: 'Arctic Siberia', flora: 'Mosses, Lichens, Dwarf Willow', icon: '❄️' }
                    ].map((biome, i) => (
                      <motion.button
                        key={biome.name}
                        aria-label={`Select ${biome.name} biome`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedZoneIndex(i);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-2xl text-left border transition-all ${
                          selectedZoneIndex === i
                            ? 'bg-slate-900 border-emerald-500 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="text-xl mb-1">{biome.icon}</div>
                        <div className="text-xs font-bold text-slate-200">{biome.name}</div>
                        <div className="text-[10px] text-emerald-400 font-semibold">{biome.region}</div>
                        <div className="text-[10px] text-slate-400 mt-1 truncate">{biome.flora}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* LAB 5: INDIA PHYSICAL & HR BALANCER */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <div className="text-xs font-bold text-slate-300 mb-2">Cross-Section: Indian Physical Sandwich</div>
                    <svg viewBox="0 0 400 220" className="w-full h-auto" aria-label="Indian Relief Cross Section Diagram">
                      <polygon points="20,20 80,90 140,40 200,90 260,30 380,100 20,100" fill="#334155" />
                      <text x="200" y="55" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">1. Himalayas (Himadri / Himachal / Shiwalik)</text>
                      <rect x="20" y="100" width="360" height="40" fill="#047857" />
                      <text x="200" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">2. Northern Plains (Ganga-Brahmaputra Alluvium)</text>
                      <polygon points="40,140 360,140 310,210 90,210" fill="#78350f" />
                      <text x="200" y="175" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">3. Peninsular Plateau (Deccan & Central Highlands)</text>
                      <text x="50" y="195" fill="#38bdf8" fontSize="8">Western Coast</text>
                      <text x="310" y="195" fill="#38bdf8" fontSize="8">Eastern Coast</text>
                    </svg>

                    <div className="w-full p-2.5 bg-slate-900 rounded-xl mt-3 text-xs flex justify-between border border-slate-800">
                      <span className="text-slate-400">Tropic of Cancer (23°30'N):</span>
                      <span className="text-emerald-400 font-bold">Crosses 8 States (Gujarat to Mizoram)</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="text-xs font-bold text-slate-300 uppercase">National HR Development Engine</div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Education & Literacy Index:</span>
                          <strong className="text-emerald-400">{eduInvestment}%</strong>
                        </div>
                        <input
                          type="range"
                          min={30}
                          max={100}
                          value={eduInvestment}
                          aria-label="Education Index Slider"
                          onChange={(e) => setEduInvestment(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Healthcare & Maternal Care:</span>
                          <strong className="text-blue-400">{healthInvestment}%</strong>
                        </div>
                        <input
                          type="range"
                          min={30}
                          max={100}
                          value={healthInvestment}
                          aria-label="Healthcare Investment Slider"
                          onChange={(e) => setHealthInvestment(Number(e.target.value))}
                          className="w-full accent-blue-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Vocational Skills (Sec/Tertiary):</span>
                          <strong className="text-amber-400">{skillInvestment}%</strong>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={100}
                          value={skillInvestment}
                          aria-label="Vocational Skills Slider"
                          onChange={(e) => setSkillInvestment(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40 text-xs">
                        <span className="text-slate-400">Demographic Dividend Index:</span>
                        <div className="text-lg font-black text-emerald-300">
                          {((eduInvestment * 0.4 + healthInvestment * 0.3 + skillInvestment * 0.3)).toFixed(1)} / 100
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Converts 1.4 Billion Population into High-Yield Productive Asset
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── BRILLIANT.ORG 'WHAT DO YOU NOTICE?' OBSERVATION CHECK ─── */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <span>👁️ Observation Check: What do you notice? (Brilliant Pattern)</span>
                  </div>
                  <div className="flex gap-2">
                    {OBSERVATION_QUESTIONS.map((_, obsIdx) => (
                      <button
                        key={obsIdx}
                        onClick={() => setActiveObsIdx(obsIdx)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          activeObsIdx === obsIdx ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Observation {obsIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-bold text-white">{OBSERVATION_QUESTIONS[activeObsIdx].question}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[activeObsIdx].options.map((opt, optIdx) => {
                      const isChosen = obsSelected[activeObsIdx] === optIdx;
                      const isChecked = obsChecked[activeObsIdx];
                      const isCorrect = optIdx === OBSERVATION_QUESTIONS[activeObsIdx].correctIndex;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleObservationSelect(activeObsIdx, optIdx)}
                          className={`p-3 text-left rounded-xl text-xs font-medium border transition-all ${
                            isChecked
                              ? isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : isChosen
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-emerald-500/50'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {obsChecked[activeObsIdx] && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 space-y-1">
                      <p className="font-semibold">{OBSERVATION_QUESTIONS[activeObsIdx].explanation}</p>
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">Key Visual Signatures:</span>
                        <ul className="list-disc pl-4 text-[11px] text-slate-300 mt-1 space-y-0.5">
                          {OBSERVATION_QUESTIONS[activeObsIdx].observableOptions.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Navigation Bar */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Go to previous lab"
                  onClick={handleSlidePrev}
                  disabled={currentSlide === 0}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs font-bold text-slate-400">
                  Laboratory {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={currentSlide < EXPLORATION_STEPS.length - 1 ? 'Go to next lab' : 'Enter Free Sandbox'}
                  onClick={handleSlideNext}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-700/40"
                >
                  {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Laboratory →' : 'Enter Free Sandbox →'}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX EXPLORATION ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-black text-white">Geospatial Parameter Sandbox</h3>
                <p className="text-xs text-slate-400">Unrestricted sandbox — Manipulate variables simultaneously with live real-time rendering.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Proceed to ICSE Challenges"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-700/40"
              >
                Ready for ICSE Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                <canvas ref={canvasRef} width={260} height={180} className="w-full h-auto rounded-xl" />
                <span className="text-[11px] text-slate-400 mt-2">Live Topographical Radar Telemetry</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase">Atmospheric Controls</div>
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Altitude (Lapse Rate 6.5°C/km):</span>
                    <strong className="text-emerald-400">{sandboxElevation} m</strong>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={6000}
                    step={100}
                    value={sandboxElevation}
                    aria-label="Altitude in metres slider"
                    onChange={(e) => setSandboxElevation(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Temp Drop: -{((sandboxElevation / 1000) * 6.5).toFixed(1)}°C from Sea Level
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Annual Rainfall:</span>
                    <strong className="text-blue-400">{sandboxRainfall} cm</strong>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={400}
                    value={sandboxRainfall}
                    aria-label="Annual rainfall slider"
                    onChange={(e) => setSandboxRainfall(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Vegetation Biome: {sandboxRainfall > 200 ? 'Tropical Evergreen Rainforest' : sandboxRainfall > 75 ? 'Tropical Deciduous Forest' : sandboxRainfall > 25 ? 'Thorny Scrub & Savanna' : 'Arid Desert Xerophytes'}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-slate-300 uppercase mb-1">Real-Time Computed Metrics</div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Natural Growth Rate:</span>
                  <span className="font-bold text-emerald-400">{calculatedNaturalGrowthRate}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Physiological Pressure:</span>
                  <span className="font-bold text-amber-400">{calculatedPhysiologicalDensity} p/km²</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">6-Figure Grid Position:</span>
                  <span className="font-mono font-bold text-white">{topoEasting}{topoTenthEast}{topoNorthing}{topoTenthNorth}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Continentality Factor:</span>
                  <span className="font-bold text-blue-400">{asiaContinentalityDistance} km inland</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                NEP Competency: {challenge.competencyLevel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Show Hint (${hintCount} of 3 used)`}
                onClick={showNextHint}
                disabled={answerRevealed || showExplanation || hintCount >= 3}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold disabled:opacity-30"
              >
                💡 Hint ({hintCount}/3)
              </motion.button>
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <p className="text-lg font-bold text-white leading-relaxed">{challenge.question}</p>

            {/* 1. MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="radiogroup" aria-label="Challenge Options">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`p-4 text-left rounded-2xl text-sm font-medium border transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {showExplanation && i === challenge.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. Drag-and-Drop Labeling */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold self-center mr-2">Palette:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-xl text-xs font-bold text-white cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'zone_stream', title: 'Solid Blue Line Area', desc: 'Perennial flow feature' },
                    { id: 'zone_village', title: 'Red Block Cluster', desc: 'Nucleated houses & buildings' },
                    { id: 'zone_cliff', title: 'Closely Spaced Brown Rings', desc: 'Steep contour gradient' },
                    { id: 'zone_farm', title: 'Yellow Shaded Basin', desc: 'Cultivated agricultural land' }
                  ].map((target) => (
                    <div
                      key={target.id}
                      role="region"
                      aria-label={`Drop target: ${target.title}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-2xl text-center space-y-1 min-h-[90px] flex flex-col items-center justify-center"
                    >
                      <span className="text-xs font-bold text-slate-300">{target.title}</span>
                      <span className="text-[10px] text-slate-500">{target.desc}</span>
                      <div className="mt-1 font-bold text-xs text-emerald-400">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : '[Drop Label Here]'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Validate drag and drop labels"
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl disabled:opacity-40"
                >
                  Validate Labels →
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <div className="space-y-2" role="list" aria-label="Sortable items list">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Order item ${displayIdx + 1}: ${item}. Drag to reorder.`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between cursor-grab"
                    >
                      <span className="text-xs font-bold text-white">
                        {displayIdx + 1}. {item}
                      </span>
                      <span className="text-xs text-slate-500">☰ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify sorted order"
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Verify Order →
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Input Challenge */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  aria-label={`Enter numerical answer in ${challenge.unit || 'units'}`}
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-emerald-500 outline-none"
                />
                <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Submit numeric answer"
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Submit Answer →
                </motion.button>
              </div>
            )}

            {/* 5. Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-semibold">{challenge.validationHint}</p>

                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label={`Add part: ${part}`}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center" aria-label="Constructed parts container">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-900/60 border border-emerald-600 text-emerald-200 text-xs font-bold rounded-xl flex items-center gap-1">
                      {part}
                      <button
                        aria-label={`Remove part: ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200 ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click blocks above to construct the complete geological profile.</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify constructed profile"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Verify Constructed Profile →
                </motion.button>
              </div>
            )}

            {/* Explanation Walkthrough */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-emerald-950/30 border border-emerald-800/50 rounded-2xl space-y-3"
              >
                <div className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  Detailed Step-by-Step ICSE Analysis
                </div>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-slate-200 leading-relaxed"
                  >
                    <strong className="text-emerald-400 font-mono">Step {i + 1}:</strong> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Reveal next analytical step"
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-bold rounded-xl"
                  >
                    Reveal Next Analytical Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Expedition' : 'Next ICSE Challenge'}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-700/40 mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Expedition →' : 'Next ICSE Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE, MOTIVATION, REFLECTION & REVIEW ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/50 text-center space-y-4 shadow-2xl">
            <span className="text-4xl" role="img" aria-label="Celebration Party Popper">🎉</span>
            <h2 className="text-3xl font-black text-white">Expedition Complete!</h2>
            
            {/* Motivational Feedback Section */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-emerald-500/40 max-w-xl mx-auto">
              <div className="text-xl font-black text-emerald-400 mb-1 flex items-center justify-center gap-2">
                <span>✓</span>
                <span>{motivationalFeedback.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{motivationalFeedback.desc}</p>
            </div>

            <div className="flex justify-center gap-6 text-sm">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Final Score:</span>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Total Errors:</span>
                <div className="text-2xl font-black text-amber-400">{errors}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Mastery Rating:</span>
                <div className="text-2xl font-black text-white capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* ─── VISIBLE SPACED REPETITION SCHEDULE CARD ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <span>📅 Spaced Repetition Memory Schedule (SM-2 Engine)</span>
              </div>
              <span className={`text-xs font-black uppercase px-3 py-1 rounded-xl border ${srsSchedule.badgeColor}`}>
                {srsSchedule.label}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className={`p-4 rounded-2xl border ${errors === 0 ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                <div className="text-xs font-bold text-white mb-1">0 Errors (100% Mastery)</div>
                <div className="text-lg font-black text-emerald-400">review in 7 days</div>
                <p className="text-[11px] text-slate-400 mt-1">Long-term interval retention consolidation</p>
              </div>

              <div className={`p-4 rounded-2xl border ${errors >= 1 && errors <= 3 ? 'bg-amber-950/60 border-amber-500 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                <div className="text-xs font-bold text-white mb-1">1–3 Errors (High Competence)</div>
                <div className="text-lg font-black text-amber-400">review in 3 days</div>
                <p className="text-[11px] text-slate-400 mt-1">Targeted review for minor coordinate slips</p>
              </div>

              <div className={`p-4 rounded-2xl border ${errors >= 4 ? 'bg-rose-950/60 border-rose-500 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                <div className="text-xs font-bold text-white mb-1">4+ Errors (Needs Practice)</div>
                <div className="text-lg font-black text-rose-400">review in 1 day</div>
                <p className="text-[11px] text-slate-400 mt-1">Next-day repetition loop for foundation recall</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic pt-1">{srsSchedule.note}</p>
          </div>

          {/* ─── REFLECTION QUESTIONS SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>💭 Post-Expedition Geospatial Reflection</span>
            </div>
            <p className="text-xs text-slate-400">Consolidate your learning by reflecting on your conceptual takeaways.</p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflections.surprising}
                  onChange={(e) => setReflections(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g. How continentality causes a 60°C temperature swing in Verkhoyansk, or how non-perennial streams appear as broken blue lines..."
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none h-20"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflections.explain}
                  onChange={(e) => setReflections(r => ({ ...r, explain: e.target.value }))}
                  placeholder="e.g. Always read eastings first then northings (along corridor then up stairs), and understand how disaster loops loop through preparedness, response, recovery, and mitigation..."
                  aria-label="Reflection: How would you explain this to a friend?"
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none h-20"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflections.realLife}
                  onChange={(e) => setReflections(r => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g. Reading navigation maps during trekking, evaluating city drainage before purchasing property, or planning cyclone emergency protocols..."
                  aria-label="Reflection: Where in real life might you use this?"
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none h-20"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-900/50 space-y-4">
              <h3 className="text-sm font-black text-rose-300 uppercase tracking-wider">Your Targeted Misconception Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div className="text-rose-400 font-bold">✗ {m.misconception}</div>
                      <div className="text-emerald-300 font-semibold">✓ {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-lg font-black text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-600 flex items-center justify-center text-[10px] font-bold text-emerald-300 shrink-0">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_GeographyRepresentationGeographicalFeaturesSim;
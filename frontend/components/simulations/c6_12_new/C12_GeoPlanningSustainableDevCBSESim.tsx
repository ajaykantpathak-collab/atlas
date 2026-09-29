'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs covered by this simulation
const NODE_346 = 'c12_geo_cbse_346'; // Definition and Nature of Planning
const NODE_347 = 'c12_geo_cbse_347'; // Planning in the Context of Economic Development
const NODE_348 = 'c12_geo_cbse_348'; // Historical Evolution of Planning in India
const NODE_349 = 'c12_geo_cbse_349'; // Planning Commission of India and Its Functions
const NODE_350 = 'c12_geo_cbse_350'; // NITI Aayog: Establishment and Mandate
const NODE_351 = 'c12_geo_cbse_351'; // Objectives of NITI Aayog
const NODE_352 = 'c12_geo_cbse_352'; // Sectoral Planning
const NODE_353 = 'c12_geo_cbse_353'; // Regional Planning
const NODE_354 = 'c12_geo_cbse_354'; // Regional Imbalances in Economic Development
const NODE_355 = 'c12_geo_cbse_355'; // Need for Target Area Planning Approach
const NODE_356 = 'c12_geo_cbse_356'; // Target Area Planning Programmes in India
const NODE_357 = 'c12_geo_cbse_357'; // Target Group Planning Programmes
const NODE_358 = 'c12_geo_cbse_358'; // Drought Prone Area Development Programme
const NODE_359 = 'c12_geo_cbse_359'; // Identification and Geographic Spread of Drought Prone Areas in India
const NODE_360 = 'c12_geo_cbse_360'; // Sustainable Development of Drought Prone Areas
const NODE_361 = 'c12_geo_cbse_361'; // Hill Area Development Programme
const NODE_362 = 'c12_geo_cbse_362'; // Resource-Based Development of Hill Areas
const NODE_363 = 'c12_geo_cbse_363'; // Integrated Tribal Development Project (ITDP) Concept
const NODE_364 = 'c12_geo_cbse_364'; // Bharmaur Tribal Region: Geography and Demography
const NODE_365 = 'c12_geo_cbse_365'; // Socio-Economic Characteristics of the Gaddi Community
const NODE_366 = 'c12_geo_cbse_366'; // Impact of ITDP on Bharmaur: Infrastructure Development
const NODE_367 = 'c12_geo_cbse_367'; // Impact of ITDP on Bharmaur: Social Indicators
const NODE_368 = 'c12_geo_cbse_368'; // Impact of ITDP on Bharmaur: Economic Transformation
const NODE_369 = 'c12_geo_cbse_369'; // Concept of Development: Multi-Dimensional Nature
const NODE_370 = 'c12_geo_cbse_370'; // Evolution of the Concept of Development Over Time
const NODE_371 = 'c12_geo_cbse_371'; // Limitations of Conventional Economic Growth as Development
const NODE_372 = 'c12_geo_cbse_372'; // Origins of the Sustainable Development Concept
const NODE_373 = 'c12_geo_cbse_373'; // Brundtland Commission and Report
const NODE_374 = 'c12_geo_cbse_374'; // Brundtland Definition of Sustainable Development
const NODE_375 = 'c12_geo_cbse_375'; // Three Pillars of Sustainable Development
const NODE_376 = 'c12_geo_cbse_376'; // Case Study: Indira Gandhi Canal Command Area
const NODE_377 = 'c12_geo_cbse_377'; // Positive Ecological and Economic Impacts of Indira Gandhi Canal
const NODE_378 = 'c12_geo_cbse_378'; // Environmental Problems in Indira Gandhi Canal Command Area
const NODE_379 = 'c12_geo_cbse_379'; // Measures for Sustainable Development in Indira Gandhi Canal Command Area
const NODE_380 = 'c12_geo_cbse_380'; // Ecological Sustainability in Canal Command Areas
const NODE_381 = 'c12_geo_cbse_381'; // Economic and Social Sustainability in Planned Development

const ALL_NODE_IDS = [
  NODE_346, NODE_347, NODE_348, NODE_349, NODE_350, NODE_351, NODE_352, NODE_353, NODE_354, NODE_355,
  NODE_356, NODE_357, NODE_358, NODE_359, NODE_360, NODE_361, NODE_362, NODE_363, NODE_364, NODE_365,
  NODE_366, NODE_367, NODE_368, NODE_369, NODE_370, NODE_371, NODE_372, NODE_373, NODE_374, NODE_375,
  NODE_376, NODE_377, NODE_378, NODE_379, NODE_380, NODE_381
];

// MANDATORY SECTION 1: SCENARIO
const SCENARIO = {
  title: 'Sustainable Regional Development & Environmental Planning Laboratory',
  intro: 'Welcome, Regional Planner! You are appointed by the NITI Aayog to model sustainable planning interventions across India\'s diverse geographical landscapes.',
  context: 'In this simulation, you will analyze the ecological impacts of the Indira Gandhi Canal (Thar Desert), evaluate the Integrated Tribal Development Project (ITDP) in Bharmaur, design Drought Prone Area Programmes (DPAP), and balance economic growth with environmental conservation.',
};

// MANDATORY SECTION 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'In the Indira Gandhi Canal Command Area (Stage II), intensive canal irrigation turned lush green croplands into barren white fields after two decades. What primary physical mechanism caused this unexpected degradation?',
  options: [
    'Excessive pesticide run-off poisoning soil microbes',
    'Capillary action drawing deep subsoil salts to the surface due to severe waterlogging',
    'Depletion of topsoil organic matter due to wind erosion',
    'Compaction of soil particles caused by heavy agricultural machinery'
  ],
  correctIndex: 1,
  hintAfter: 'Unlined canals and excessive over-irrigation raise the groundwater table. Capillary action carries dissolved salts to the surface, evaporating and leaving behind an impermeable alkaline salt crust (alkalinisation and salinisation).',
};

// MANDATORY SECTION 3: EXPLORATION_STEPS
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Indira Gandhi Canal Command Area Simulator',
    instruction: 'Adjust irrigation volume, crop choices (water-intensive vs pasture), and afforestation shelterbelts. Observe changes in water table depth, soil salinity, biomass index, and crop yield in Stage I and II.',
    interactionType: 'canal-lab',
    nodeId: NODE_376,
  },
  {
    title: 'Lab 2: Bharmaur ITDP Tribal Region Simulator',
    instruction: 'Allocate funding across roads, female education, healthcare, and pastoral support. Observe the transformation in Gaddi literacy rates, sex ratio, transhumance patterns, and agrarian output.',
    interactionType: 'bharmaur-lab',
    nodeId: NODE_363,
  },
  {
    title: 'Lab 3: Drought Prone Area Programme (DPAP) Watershed Model',
    instruction: 'Deploy watershed management strategies (check dams, pasture development, silvipasture). Monitor groundwater recharge rates, soil moisture, and drought resilience score.',
    interactionType: 'dpap-lab',
    nodeId: NODE_358,
  },
  {
    title: 'Lab 4: Policy Framework: Planning Commission vs NITI Aayog',
    instruction: 'Toggle between Top-Down Centralized Allocation (Planning Commission) and Bottom-Up Cooperative Federalism (NITI Aayog). Compare regional imbalance reduction and policy flexibilities.',
    interactionType: 'niti-lab',
    nodeId: NODE_350,
  },
  {
    title: 'Lab 5: Three Pillars of Sustainable Development Balancer',
    instruction: 'Balance Economic Growth, Social Equity, and Environmental Integrity sliders. Maintain all three pillars above the sustainability threshold without collapsing ecological capital.',
    interactionType: 'pillars-lab',
    nodeId: NODE_375,
  },
];

// MANDATORY SECTION 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the local microclimate and soil structure in Thar Desert Stage II if cash crops (cotton/wheat) are continuously cultivated with high canal irrigation without tree shelterbelts?',
    options: [
      'Soil salinity will decrease while microclimate humidity stabilizes',
      'Waterlogging will occur, followed by severe soil salinization and land degradation',
      'Groundwater levels will fall dramatically causing desertification',
      'Crop yields will increase indefinitely with no soil deterioration'
    ],
    correctIndex: 1,
    verifyInstruction: 'Set Irrigation to 100% and Crop Choice to Cash Crops in Lab 1. Watch the Water Table rise and Soil Salinity surge above 8.5 dS/m.',
    nodeId: NODE_378,
  },
  {
    question: 'Predict: How did the implementation of Integrated Tribal Development Project (ITDP) in Bharmaur affect female literacy and gender sex ratio over three decades?',
    options: [
      'Female literacy remained under 5% and sex ratio deteriorated due to migration',
      'Female literacy jumped from 1.88% (1971) to 65%+ (2011) with marked improvement in sex ratio',
      'Male literacy declined while female literacy surpassed 95%',
      'No statistical change was recorded as Gaddi community rejected formal education'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, increase Female School Infrastructure investment to 100% and trace the demographic indicators across 1971–2011 timelines.',
    nodeId: NODE_367,
  },
];

// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the relationship between canal lining/afforestation and land degradation in Stage II of the Indira Gandhi Canal Command Area?',
    observableOptions: [
      'Tree shelterbelts and lining canals prevent capillary rise of salts and keep soil arable',
      'Afforestation increases soil salinity by drawing saline groundwater to surface',
      'Unlined canals improve groundwater quality without causing waterlogging',
      'Tree shelterbelts reduce crop yields by competing for solar radiation'
    ],
    correctIndex: 0,
    nodeId: NODE_379,
  },
  {
    question: 'What key structural change distinguishes NITI Aayog from the former Planning Commission of India?',
    observableOptions: [
      'NITI Aayog allocates Five-Year Plan funds directly to state governments',
      'NITI Aayog acts as a think-tank promoting bottom-up cooperative federalism rather than top-down fund allocation',
      'Planning Commission was a constitutional body while NITI Aayog is a statutory body',
      'NITI Aayog eliminated state chief ministers from the Governing Council'
    ],
    correctIndex: 1,
    nodeId: NODE_350,
  },
];

// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Real-World Exercise: Formulating a Sustainable Command Area Strategy for Stage II Thar Desert',
  description: 'As Senior Geo-Spatial Planner for Rajasthan\'s Water Resources Department, evaluate the environmental footprint of 100,000 hectares in Stage II Indira Gandhi Canal Area and optimize the cropping pattern.',
  steps: [
    'Step 1: Calculate water consumption under current flood irrigation (12,000 m³/ha/yr) vs micro-drip irrigation (5,000 m³/ha/yr).',
    'Step 2: Determine area requiring mandatory afforestation shelterbelts (minimum 15% land cover along canal banks).',
    'Step 3: Replace water-intensive paddy/wheat with drought-resistant gram, mustard, and fodder pasture crops.',
    'Step 4: Compute the reduction in soil salinity risk index from High (>8 dS/m) to Sustainable (<2 dS/m).'
  ],
};

// TOPIC MISCONCEPTIONS
const MISCONCEPTIONS = [
  {
    id: 'misc-1',
    statement: 'Economic growth (GDP increase) is identical to economic development.',
    correction: 'Economic growth is quantitative (increase in GDP), whereas economic development is qualitative and multi-dimensional, encompassing health, education, equity, and quality of life.',
    details: 'Node c12_geo_cbse_369 & 371. Income growth without equitable distribution or basic public infrastructure fails to achieve human development.',
  },
  {
    id: 'misc-2',
    statement: 'Target Area Planning and Target Group Planning are the same thing.',
    correction: 'Target Area Planning focuses on specific underdeveloped regions (e.g., Hill Area, Drought Prone Area), while Target Group Planning focuses on vulnerable socio-economic sections (e.g., Small Farmers, ITDP for Scheduled Tribes).',
    details: 'Node c12_geo_cbse_355, 356 & 357.',
  },
  {
    id: 'misc-3',
    statement: 'The Indira Gandhi Canal brought only environmental degradation to Thar Desert.',
    correction: 'The canal transformed green vegetation cover, increased crop output, stabilized sand dunes, and provided drinking water; environmental issues like salinization arose due to improper management and over-irrigation.',
    details: 'Node c12_geo_cbse_377 & 378.',
  },
  {
    id: 'misc-4',
    statement: 'Sustainable development means stopping all natural resource exploitation entirely.',
    correction: 'Sustainable development means meeting current needs without compromising the ability of future generations to meet their own needs—balancing ecological, economic, and social needs.',
    details: 'Node c12_geo_cbse_374 & 375.',
  },
  {
    id: 'misc-5',
    statement: 'NITI Aayog has full financial power to allocate central grants to state governments.',
    correction: 'Unlike the Planning Commission which allocated central plan funds, NITI Aayog is a policy think-tank; financial allocation powers reside with the Ministry of Finance.',
    details: 'Node c12_geo_cbse_350 & 351.',
  },
  {
    id: 'misc-6',
    statement: 'The Gaddi community in Bharmaur tribal region practiced nomadic pastoralism purely out of choice.',
    correction: 'Transhumance was an adaptation to harsh mountain topography, seasonal snow cover, and lack of winter pastures in high altitude regions.',
    details: 'Node c12_geo_cbse_364 & 365.',
  },
];

// INTERFACE DEFINITIONS
interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'drag-sort' | 'numeric' | 'match';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// 22 PROGRESSIVE CHALLENGES
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'chal-1',
    nodeId: NODE_346,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the primary definition of "Planning" in geography and economic policy?',
    options: [
      'The continuous physical expansion of urban boundaries',
      'The process of thinking, formulation of a scheme or program, and implementation of actions to achieve specific socio-economic objectives',
      'The measurement of meteorological changes across climatic zones',
      'The extraction of mineral wealth from natural reserves'
    ],
    correctIndex: 1,
    explanation: 'Planning involves systematically formulating and implementing schemes/programmes to reach target socio-economic goals utilizing available resources efficiently.',
    hints: [
      'Think about setting goals and choosing structured steps to reach them.',
      'It involves formulation, resource allocation, and targeted implementation.',
      'Select option B.'
    ]
  },
  {
    id: 'chal-2',
    nodeId: NODE_352,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following is an example of "Sectoral Planning"?',
    options: [
      'Development of Hill Areas in Uttarakhand',
      'Integrated Tribal Development Project in Bharmaur',
      'Formulating specific development plans for Agriculture, Irrigation, Manufacturing, or Transport',
      'Drought Prone Area Development in Rayalaseema'
    ],
    correctIndex: 2,
    explanation: 'Sectoral planning means formulating and implementing sets of schemes/programmes for spatial growth focused on specific sectors of the economy like agriculture, power, or transport.',
    hints: [
      'Sectoral planning focuses on economic sectors rather than bounded geographic regions.',
      'Look for the option listing sectors of the economy like agriculture or manufacturing.',
      'Select option C.'
    ]
  },
  {
    id: 'chal-3',
    nodeId: NODE_353,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'How does Regional Planning differ from Sectoral Planning?',
    options: [
      'Regional planning focuses only on heavy industries',
      'Regional planning aims to reduce spatial disparities by designing schemes for specific geographical areas',
      'Sectoral planning ignores the economy and focuses only on ecology',
      'Regional planning is conducted exclusively by municipal corporations'
    ],
    correctIndex: 1,
    explanation: 'Regional planning takes spatial dimensions into account to reduce regional imbalances across different geographical areas.',
    hints: [
      'Regions represent spatial/geographic units.',
      'Regional planning addresses geographical disparities between advanced and backward areas.',
      'Select option B.'
    ]
  },
  {
    id: 'chal-4',
    nodeId: NODE_350,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'When was NITI Aayog (National Institution for Transforming India) established to replace the Planning Commission?',
    options: [
      '15 August 1947',
      '1 January 2015',
      '2 October 2019',
      '15 March 1950'
    ],
    correctIndex: 1,
    explanation: 'NITI Aayog was formed on 1st January 2015 via a cabinet resolution, replacing the 65-year-old Planning Commission.',
    hints: [
      'It was established in the mid-2010s.',
      'New Year\'s Day of 2015.',
      'Select option B.'
    ]
  },
  {
    id: 'chal-5',
    nodeId: NODE_364,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which indigenous tribal community inhabits the Bharmaur region of Chamba district, Himachal Pradesh?',
    options: [
      'Santhal community',
      'Gaddi community',
      'Bhil community',
      'Gond community'
    ],
    correctIndex: 1,
    explanation: 'Bharmaur is the traditional homeland of the Gaddi tribal community in the valley of the Ravi river.',
    hints: [
      'They are famous for sheep and goat rearing in the Dhauladhar and Pir Panjal ranges.',
      'The community name starts with "G".',
      'Select option B.'
    ]
  },
  {
    id: 'chal-6',
    nodeId: NODE_374,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the world-renowned Brundtland Report definition of Sustainable Development (1987)?',
    options: [
      'Development that maximizes industrial output without exceeding national budget',
      'Development that meets the needs of the present without compromising the ability of future generations to meet their own needs',
      'Development that preserves nature by completely prohibiting human economic activities',
      'Development that accelerates GDP growth above 10% annually'
    ],
    correctIndex: 1,
    explanation: 'The WCED Brundtland Report ("Our Common Future", 1987) defined sustainable development as meeting present needs without compromising future generations.',
    hints: [
      'Focus on inter-generational equity.',
      'Present needs vs future generations\' capability.',
      'Select option B.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'chal-7',
    nodeId: NODE_376,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The Indira Gandhi Canal originates from which headworks at the confluence of the Satluj and Beas rivers in Punjab?',
    options: [
      'Bhakra Dam',
      'Harike Barrage',
      'Tehri Dam',
      'Pong Dam'
    ],
    correctIndex: 1,
    explanation: 'The Indira Gandhi Canal (formerly Rajasthan Canal) originates at Harike Barrage in Punjab.',
    hints: [
      'Located in Punjab where Satluj meets Beas.',
      'Starts with "H".',
      'Select option B.'
    ]
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'chal-8',
    nodeId: NODE_355,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why did Indian planners shift toward "Target Area Planning" during the Fourth Five-Year Plan?',
    options: [
      'Because aggregate economic growth was automatically trickling down to all regions equally',
      'Because regional economic imbalances were widening despite overall national economic growth',
      'Because heavy industries requested tax relief in metro cities',
      'Because international donors mandated spatial planning'
    ],
    correctIndex: 1,
    explanation: 'The Fourth Plan realized that general sector growth failed to benefit backward areas, creating acute regional disparities. Thus target area plans (Hill, Drought Prone, Tribal) were introduced.',
    hints: [
      'Growth was not trickling down evenly.',
      'Regional disparities were growing, necessitating direct intervention in lagging regions.',
      'Select option B.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'chal-9',
    nodeId: NODE_358,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What criterion was established by the Irrigation Commission (1972) to demarcate a "Drought Prone Area"?',
    options: [
      'An area where annual rainfall is less than 200 cm',
      'An area where annual rainfall is less than 75 cm AND irrigated area is less than 30% of total cultivated area',
      'An area where snow cover melts before the month of May',
      'An area located more than 500 km from sea coast'
    ],
    correctIndex: 1,
    explanation: 'Irrigation Commission criteria: annual rainfall < 75 cm and irrigated net sown area < 30%.',
    hints: [
      'Combines low annual rainfall with minimal irrigation coverage.',
      '< 75 cm rainfall and < 30% irrigation.',
      'Select option B.'
    ]
  },
  {
    id: 'chal-10',
    nodeId: NODE_361,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Hill Area Development Programmes (HADP) prioritize resource-based development. Which factor makes hill area planning distinct from plain areas?',
    options: [
      'Hill areas have flat terrain suitable for large heavy steel plants',
      'Fragile ecology, steep slopes, soil erosion susceptibility, and bio-climatic constraints',
      'Complete lack of mineral resources across all hill ranges',
      'Excessive underground aquifers that cause continuous flooding'
    ],
    correctIndex: 1,
    explanation: 'HADP plans consider ecological fragility, terrain slope, soil preservation, and eco-restoration.',
    hints: [
      'Consider the topography and environmental sensitivity of mountainous terrain.',
      'Fragile ecosystems and terrain slope dictate HADP strategies.',
      'Select option B.'
    ]
  },
  {
    id: 'chal-11',
    nodeId: NODE_366,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Under the Integrated Tribal Development Project (ITDP), what was the single most critical infrastructural priority in Bharmaur region?',
    options: [
      'Building international airports',
      'Development of transport (roads & bridges), communication, schools, and healthcare',
      'Construction of nuclear power stations',
      'Setting up automated car factories'
    ],
    correctIndex: 1,
    explanation: 'ITDP prioritized accessibility (roads/bridges connecting remote valleys), basic education, clean drinking water, and medical facilities.',
    hints: [
      'Isolated valley communities need physical connectivity and basic socio-economic infrastructure.',
      'Roads, schools, and medical care.',
      'Select option B.'
    ]
  },
  {
    id: 'chal-12',
    nodeId: NODE_368,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'How did ITDP transform the traditional agrarian economy of the Gaddi community in Bharmaur?',
    options: [
      'Shifted them entirely to computer software exports',
      'Decreased reliance on traditional migratory pastoralism while increasing settled agriculture and horticulture (apples, pulses)',
      'Forced the entire population to migrate permanently to metro cities',
      'Converted all agricultural land into commercial sugar plantations'
    ],
    correctIndex: 1,
    explanation: 'ITDP led to reduced transhumance (pastoral movement) as Gaddis adopted settled cultivation, cash crops (pulses, apples), and modern education.',
    hints: [
      'Look for the transition from transhumance pastoralism to cash cropping and horticulture.',
      'Apple orchards and settled farming reduced pastoral migration.',
      'Select option B.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'chal-13',
    nodeId: NODE_371,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why is conventional Gross Domestic Product (GDP) growth criticized as an inadequate measure of overall development?',
    options: [
      'Because GDP measures only domestic trade and ignores international exports',
      'Because GDP focuses purely on quantitative output while hiding income inequality, environmental degradation, and health deficits',
      'Because GDP calculations are performed only every 50 years',
      'Because GDP is calculated only for urban areas'
    ],
    correctIndex: 1,
    explanation: 'GDP measures total monetary output but ignores ecological destruction, distribution of wealth, human equity, literacy, and life expectancy.',
    hints: [
      'Growth is quantitative; development is multi-dimensional and qualitative.',
      'GDP ignores health, distribution equity, and environmental depletion.',
      'Select option B.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'chal-14',
    nodeId: NODE_377,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What was the major positive ecological transformation brought by Stage I Indira Gandhi Canal in western Rajasthan?',
    options: [
      'Extinction of indigenous camel breeds',
      'Afforestation shelterbelts and pasture development stabilized blowing sand dunes and greened arid landscape',
      'Formation of deep freshwater mountain lakes',
      'Elimination of all dust storms in northern India'
    ],
    correctIndex: 1,
    explanation: 'Canal irrigation coupled with tree plantations along canal banks stabilized shifting sand dunes and expanded cropped areas significantly.',
    hints: [
      'Trees and pasture cover stabilized shifting dunes.',
      'Afforestation belts reduced wind erosion and stabilized sand dunes.',
      'Select option B.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'chal-15',
    nodeId: NODE_378,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In Stage II of the Indira Gandhi Canal, what severe eco-hazard emerged due to excessive flood irrigation and unlined water courses?',
    options: [
      'Glacial outbursts',
      'Waterlogging and severe soil salinization/alkalinization',
      'Acid rain deposition',
      'Extreme permafrost formation'
    ],
    correctIndex: 1,
    explanation: 'Over-irrigation raised shallow water tables in fine-textured soils, causing waterlogging. Evaporation then drew subsoil salts to the surface (salinization).',
    hints: [
      'Excess water without drainage raises the water table.',
      'High evaporation leads to surface salt incrustation (salinization).',
      'Select option B.'
    ]
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'chal-16',
    nodeId: NODE_351,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Analyze how NITI Aayog\'s operational philosophy of "Cooperative & Competitive Federalism" differs from the Planning Commission\'s approach:',
    options: [
      'Planning Commission issued directive 5-year plans to states (top-down), whereas NITI Aayog engages states as equal partners in policy formulation (bottom-up) while ranking state performance',
      'NITI Aayog dictates state budgets while Planning Commission allowed full autonomy',
      'Planning Commission focused on private sector while NITI Aayog enforces state state-owned monopolies',
      'NITI Aayog has abolished all state level ministries'
    ],
    correctIndex: 0,
    explanation: 'NITI Aayog promotes a bottom-up approach where states actively shape national development strategies and compete constructively through performance indices (SDG Index, Innovation Index).',
    hints: [
      'Top-down centralization vs Bottom-up cooperative federalism.',
      'States as equal strategic partners in national development.',
      'Select option A.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'chal-17',
    nodeId: NODE_360,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Evaluating the Drought Prone Area Programme (DPAP): What strategic shift occurred in DPAP during the 1990s to ensure sustainable outcomes?',
    options: [
      'Shifting from mega hydro-electric dams to micro-watershed management, afforestation, soil conservation, and community participation',
      'Abandoning all rural employment schemes to focus on urban highways',
      'Converting drylands into chemical manufacturing hubs',
      'Replacing dryland crops with water-guzzling sugarcane'
    ],
    correctIndex: 0,
    explanation: 'DPAP shifted emphasis toward integrated watershed development (soil, water, biomass conservation) on an eco-zone basis with local community participation.',
    hints: [
      'Integrated watershed management at micro-level.',
      'Focus on conserving soil, water, and natural vegetation at watershed level.',
      'Select option A.'
    ]
  },
  {
    id: 'chal-18',
    nodeId: NODE_367,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Which social indicator in Bharmaur ITDP demonstrated the most dramatic transformation between 1971 and 2011?',
    options: [
      'Total population reduced by 80%',
      'Female literacy increased from 1.88% (1971) to over 65% (2011) alongside narrowing gender gap',
      'Infant mortality rate increased three-fold',
      'Primary school enrollment dropped to zero'
    ],
    correctIndex: 1,
    explanation: 'Female literacy in Bharmaur surged from a negligible 1.88% in 1971 to 65%+ by 2011, marking an unprecedented social advancement for Gaddi women.',
    hints: [
      'Think about gender empowerment and basic education growth.',
      'Female literacy jumped from <2% to over 65%.',
      'Select option B.'
    ]
  },
  {
    id: 'chal-19',
    nodeId: NODE_375,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'The Three Pillars of Sustainable Development require systemic balance. What occurs when economic growth is pursued aggressively while environmental and social pillars are ignored?',
    options: [
      'Long-term sustainable prosperity is automatically achieved',
      'Ecological capital collapses (salinization, deforestation, pollution) and social inequality triggers instability, undermining economic gains',
      'Natural ecosystems adapt instantaneously without damage',
      'Social equity reaches 100% equilibrium automatically'
    ],
    correctIndex: 1,
    explanation: 'Ignoring ecological carrying capacity and social equity creates resource exhaustion, environmental degradation, and civil friction, ultimately ruining economic stability.',
    hints: [
      'Look at the interconnectedness of Economy, Society, and Environment.',
      'Degradation of nature and social inequality undermines future economic growth.',
      'Select option B.'
    ]
  },
  {
    id: 'chal-20',
    nodeId: NODE_379,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'To restore ecological sustainability in the Indira Gandhi Canal Command Area, which measure is MANDATORY for Stage II implementation?',
    options: [
      'Increasing flood irrigation volume by 200%',
      'Strict adherence to eco-friendly cropping (gram, pasture, mustard), lining of canals, water management, and extensive afforestation shelterbelts',
      'Banning all agriculture and converting command area into industrial zones',
      'Removing all tree shelterbelts to clear space for tractors'
    ],
    correctIndex: 1,
    explanation: 'Sustainability measures mandated: strict water management, lining canals, planting shelterbelts along canals/roads, and shifting from water-intensive crops to dryland pastoralism & pulses.',
    hints: [
      'Water management, canal lining, afforestation, and dryland cropping.',
      'Look for the option combining lining, shelterbelts, and pasture/gram crops.',
      'Select option B.'
    ]
  },
  {
    id: 'chal-21',
    nodeId: NODE_380,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'In canal command planning, what is "Command Area Development (CAD)" primarily designed to accomplish?',
    options: [
      'Constructing military fortresses along canal routes',
      'Bridging the gap between created irrigation potential and actual field utilization through lined field channels, land leveling, and crop scheduling',
      'Generating hydro-electric power for capital cities',
      'Exporting fresh canal water to neighboring countries'
    ],
    correctIndex: 1,
    explanation: 'CAD ensures efficient on-farm water management: construction of field channels (warabandi system), land leveling, and crop scheduling to prevent water waste and waterlogging.',
    hints: [
      'Connecting the main canal outlet to individual farm fields efficiently.',
      'Lined field channels, land leveling, and equitable water distribution.',
      'Select option B.'
    ]
  },
  {
    id: 'chal-22',
    nodeId: NODE_381,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Synthesize the overall lesson from Bharmaur ITDP and Indira Gandhi Canal Case Studies regarding Indian Regional Planning:',
    options: [
      'Top-down engineering projects always succeed without environmental side-effects',
      'Targeted regional planning must align local environmental constraints, community needs, and eco-restoration; physical engineering without eco-social foresight causes land degradation',
      'Social development projects in tribal regions are economically unproductive',
      'Desert ecosystems should never receive irrigation projects under any circumstances'
    ],
    correctIndex: 1,
    explanation: 'Successful planning requires holistic synthesis: technical engineering must respect ecological carrying capacity (IGCAD lesson) and empower local socio-economic communities (Bharmaur ITDP lesson).',
    hints: [
      'Combine ecological wisdom with socio-economic empowerment.',
      'Planning must harmonize environmental realities with human welfare.',
      'Select option B.'
    ]
  }
];

// SVG DIAGRAM 1: INDIRA GANDHI CANAL COMMAND AREA SVG
const IndiraGandhiCanalDiagram: React.FC<{
  irrigation: number; // 0-100
  linedCanals: boolean;
  shelterbelts: boolean;
  cropType: 'intensive' | 'sustainable';
}> = ({ irrigation, linedCanals, shelterbelts, cropType }) => {
  // Calculate dynamic metrics
  const waterTableDepth = Math.max(1, 15 - (irrigation / 10) * (linedCanals ? 0.4 : 1.2)); // meters
  const soilSalinity = Math.min(12, 1.2 + (irrigation > 50 && cropType === 'intensive' ? (irrigation - 50) * 0.18 : 0) * (linedCanals ? 0.3 : 1.0)); // dS/m
  const isWaterlogged = waterTableDepth < 3;
  const isSaline = soilSalinity > 6;

  return (
    <svg viewBox="0 0 600 340" className="w-full h-auto bg-slate-900 rounded-lg shadow-inner border border-slate-700">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isSaline ? '#e2e8f0' : '#d97706'} />
          <stop offset="100%" stopColor={isSaline ? '#cbd5e1' : '#92400e'} />
        </linearGradient>
        <linearGradient id="waterTableGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="600" height="120" fill="url(#skyGrad)" />
      
      {/* Sun / Heat indicator */}
      <circle cx="530" cy="40" r="22" fill="#fbbf24" opacity="0.8" />
      <text x="530" y="44" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">Arid Sun</text>

      {/* Sand Dunes & Soil Layer */}
      <path d="M 0 120 Q 150 100 300 120 T 600 115 L 600 270 L 0 270 Z" fill="url(#sandGrad)" />

      {/* Main Canal Stream */}
      <path d="M 0 135 Q 250 145 600 135" stroke={linedCanals ? "#0284c7" : "#0369a1"} strokeWidth={linedCanals ? "14" : "18"} fill="none" />
      <path d="M 0 135 Q 250 145 600 135" stroke="#7dd3fc" strokeWidth="6" fill="none" strokeDasharray="10 5" />
      {linedCanals && (
        <path d="M 0 135 Q 250 145 600 135" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeDasharray="3 3" />
      )}
      <text x="20" y="130" fill="#e0f2fe" fontSize="11" fontWeight="bold">Indira Gandhi Feeder Canal</text>

      {/* Water Table Layer */}
      {/* Y position changes with water table depth: lower depth = higher up in SVG */}
      <rect 
        x="0" 
        y={270 - (15 - waterTableDepth) * 8} 
        width="600" 
        height={(15 - waterTableDepth) * 8 + 30} 
        fill="url(#waterTableGrad)" 
      />
      <line 
        x1="0" 
        y1={270 - (15 - waterTableDepth) * 8} 
        x2="600" 
        y2={270 - (15 - waterTableDepth) * 8} 
        stroke="#38bdf8" 
        strokeWidth="2" 
        strokeDasharray="4 4" 
      />
      <text x="440" y={260 - (15 - waterTableDepth) * 8} fill="#e0f2fe" fontSize="11" fontWeight="bold">
        Water Table ({waterTableDepth.toFixed(1)}m depth)
      </text>

      {/* Capillary Rise & Salinity Crust Visualization */}
      {isWaterlogged && (
        <g>
          {/* Capillary arrows */}
          {[100, 200, 300, 400, 500].map((x, i) => (
            <path key={i} d={`M ${x} ${270 - (15 - waterTableDepth) * 8} L ${x} 125`} stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          ))}
          <text x="300" y="85" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">
            Capillary Action Raising Subsoil Salts!
          </text>
        </g>
      )}

      {/* Shelterbelts / Trees */}
      {shelterbelts && (
        <g>
          {[40, 120, 220, 340, 440, 540].map((x, i) => (
            <g key={i} transform={`translate(${x}, 95)`}>
              <line x1="10" y1="25" x2="10" y2="40" stroke="#78350f" strokeWidth="4" />
              <polygon points="10,5 0,25 20,25" fill="#15803d" />
              <polygon points="10,0 3,18 17,18" fill="#22c55e" />
            </g>
          ))}
        </g>
      )}

      {/* Crops */}
      {!isSaline && (
        <g>
          {[80, 160, 280, 380, 480].map((x, i) => (
            <g key={i} transform={`translate(${x}, 105)`}>
              {cropType === 'intensive' ? (
                // Water intensive paddy/wheat
                <path d="M0,15 Q5,0 10,15 Q15,0 20,15" stroke="#84cc16" strokeWidth="3" fill="none" />
              ) : (
                // Sustainable gram/pasture
                <circle cx="10" cy="10" r="8" fill="#a3e635" />
              )}
            </g>
          ))}
        </g>
      )}

      {/* Salinity White Crust overlay */}
      {isSaline && (
        <path d="M 50 118 Q 200 115 350 118 T 580 116" stroke="#ffffff" strokeWidth="8" fill="none" opacity="0.9" />
      )}

      {/* Status Overlay Box */}
      <rect x="15" y="15" width="280" height="90" fill="#0f172a" opacity="0.85" rx="6" stroke="#334155" />
      <text x="25" y="35" fill="#f8fafc" fontSize="12" fontWeight="bold">Stage II Ecological Parameters:</text>
      <text x="25" y="53" fill={isWaterlogged ? "#f87171" : "#4ade80"} fontSize="11">
        • Water Table: {waterTableDepth.toFixed(1)} m {isWaterlogged ? '(WATERLOGGED!)' : '(Normal)'}
      </text>
      <text x="25" y="70" fill={isSaline ? "#f87171" : "#4ade80"} fontSize="11">
        • Soil Salinity: {soilSalinity.toFixed(1)} dS/m {isSaline ? '(SEVERE ALKALINIZATION)' : '(Optimal)'}
      </text>
      <text x="25" y="87" fill="#cbd5e1" fontSize="11">
        • Canal Lining: {linedCanals ? 'Lined (Seepage Low)' : 'Unlined (High Seepage)'}
      </text>
    </svg>
  );
};

// SVG DIAGRAM 2: BHARMAUR ITDP TRIBAL REGION SVG
const BharmaurRegionDiagram: React.FC<{
  infrastructure: number; // 0-100
  educationBudget: number; // 0-100
  year: number; // 1971 to 2011
}> = ({ infrastructure, educationBudget, year }) => {
  const literacyRate = Math.min(68, 1.88 + ((year - 1971) / 40) * 45 + (educationBudget / 100) * 20);
  const transhumanceIndex = Math.max(20, 90 - ((year - 1971) / 40) * 40 - (infrastructure / 100) * 25);
  const roadConnectivity = Math.min(95, 10 + (infrastructure / 100) * 75 + ((year - 1971) / 40) * 10);

  return (
    <svg viewBox="0 0 600 340" className="w-full h-auto bg-slate-900 rounded-lg shadow-inner border border-slate-700">
      <defs>
        <linearGradient id="mtnGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="snowCap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="600" height="140" fill="#0f172a" />
      <text x="300" y="25" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">
        BHARMAUR TRIBAL REGION (Chamba, Himachal Pradesh - Ravi Valley)
      </text>

      {/* Snow-capped Pir Panjal & Dhauladhar Ranges */}
      <polygon points="0,140 80,40 160,140" fill="url(#mtnGrad)" />
      <polygon points="80,40 60,65 80,60 100,65" fill="url(#snowCap)" />
      
      <polygon points="120,140 220,20 320,140" fill="url(#mtnGrad)" />
      <polygon points="220,20 195,50 220,45 245,50" fill="url(#snowCap)" />

      <polygon points="280,140 400,30 520,140" fill="url(#mtnGrad)" />
      <polygon points="400,30 375,60 400,55 425,60" fill="url(#snowCap)" />

      <polygon points="450,140 540,50 600,140" fill="url(#mtnGrad)" />
      <polygon points="540,50 525,70 540,65 555,70" fill="url(#snowCap)" />

      {/* Valley Floor */}
      <rect x="0" y="140" width="600" height="200" fill="#15803d" />

      {/* Ravi River */}
      <path d="M 0 260 Q 150 200 300 240 T 600 210" stroke="#38bdf8" strokeWidth="16" fill="none" opacity="0.8" />
      <text x="480" y="200" fill="#e0f2fe" fontSize="10" fontWeight="bold" transform="rotate(-5 480 200)">
        Ravi River Valley
      </text>

      {/* ITDP Road Infrastructure (Dynamic) */}
      {roadConnectivity > 20 && (
        <path 
          d="M 20 320 Q 200 270 380 290 T 580 260" 
          stroke="#f59e0b" 
          strokeWidth="6" 
          fill="none" 
          strokeDasharray="8 4" 
        />
      )}
      <text x="320" y="315" fill="#fbbf24" fontSize="10" fontWeight="bold">
        HADP/ITDP All-Weather Paved Road ({roadConnectivity.toFixed(0)}% connected)
      </text>

      {/* Schools and Healthcare Centers */}
      {educationBudget > 30 && (
        <g transform="translate(180, 160)">
          <rect x="0" y="0" width="40" height="25" fill="#ef4444" rx="3" />
          <polygon points="20,-10 -5,0 45,0" fill="#b91c1c" />
          <text x="20" y="16" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">SCHOOL</text>
        </g>
      )}

      {infrastructure > 40 && (
        <g transform="translate(380, 170)">
          <rect x="0" y="0" width="35" height="25" fill="#3b82f6" rx="3" />
          <text x="17.5" y="16" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">+</text>
        </g>
      )}

      {/* Gaddi Sheep Herders (Transhumance Indicator) */}
      <g opacity={transhumanceIndex / 100}>
        <text x="70" y="220" fill="#fef08a" fontSize="16">🐑 🐑 🚶‍♂️</text>
        <text x="50" y="240" fill="#fef08a" fontSize="9">Seasonal Transhumance Route</text>
      </g>

      {/* Apple Orchards (Economic Transformation) */}
      {year >= 1990 && (
        <g transform="translate(440, 230)">
          <circle cx="10" cy="10" r="8" fill="#dc2626" />
          <circle cx="25" cy="12" r="7" fill="#dc2626" />
          <circle cx="18" cy="22" r="9" fill="#dc2626" />
          <text x="18" y="38" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold">Apple Orchards</text>
        </g>
      )}

      {/* Metrics Overlay Card */}
      <rect x="15" y="240" width="230" height="85" fill="#0f172a" opacity="0.9" rx="6" stroke="#334155" />
      <text x="25" y="258" fill="#f8fafc" fontSize="12" fontWeight="bold">ITDP Bharmaur Timeline ({year}):</text>
      <text x="25" y="276" fill="#38bdf8" fontSize="11">• Female Literacy: {literacyRate.toFixed(1)}%</text>
      <text x="25" y="293" fill="#f59e0b" fontSize="11">• Pastoral Transhumance Ratio: {transhumanceIndex.toFixed(0)}%</text>
      <text x="25" y="310" fill="#4ade80" fontSize="11">• Road Infrastructure: {roadConnectivity.toFixed(0)}%</text>
    </svg>
  );
};

// SVG DIAGRAM 3: THREE PILLARS OF SUSTAINABLE DEVELOPMENT SVG
const SustainablePillarsDiagram: React.FC<{
  economic: number;
  social: number;
  environmental: number;
}> = ({ economic, social, environmental }) => {
  // System equilibrium calculation
  const minScore = Math.min(economic, social, environmental);
  const isBalanced = minScore >= 60;
  const isEcoCollapsed = environmental < 35;

  return (
    <svg viewBox="0 0 600 340" className="w-full h-auto bg-slate-900 rounded-lg shadow-inner border border-slate-700">
      <text x="300" y="30" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">
        THE THREE PILLARS OF SUSTAINABLE DEVELOPMENT (Brundtland Framework)
      </text>

      {/* Overlapping Venn Circles */}
      {/* 1. Economic Circle (Top Left) */}
      <circle 
        cx="230" 
        cy="150" 
        r={70 + (economic / 100) * 20} 
        fill="#3b82f6" 
        fillOpacity="0.4" 
        stroke="#60a5fa" 
        strokeWidth="3" 
      />
      <text x="180" y="130" fill="#93c5fd" fontSize="13" fontWeight="bold">ECONOMIC</text>
      <text x="180" y="148" fill="#ffffff" fontSize="11">Growth & Yields</text>

      {/* 2. Social Circle (Top Right) */}
      <circle 
        cx="370" 
        cy="150" 
        r={70 + (social / 100) * 20} 
        fill="#ec4899" 
        fillOpacity="0.4" 
        stroke="#f472b6" 
        strokeWidth="3" 
      />
      <text x="390" y="130" fill="#fbcfe8" fontSize="13" fontWeight="bold">SOCIAL</text>
      <text x="390" y="148" fill="#ffffff" fontSize="11">Equity & Literacy</text>

      {/* 3. Environmental Circle (Bottom Center) */}
      <circle 
        cx="300" 
        cy="230" 
        r={70 + (environmental / 100) * 20} 
        fill="#22c55e" 
        fillOpacity="0.4" 
        stroke="#4ade80" 
        strokeWidth="3" 
      />
      <text x="300" y="260" textAnchor="middle" fill="#bbf7d0" fontSize="13" fontWeight="bold">ENVIRONMENTAL</text>
      <text x="300" y="275" textAnchor="middle" fill="#ffffff" fontSize="11">Ecology & Resources</text>

      {/* Core Sustainability Intersection */}
      <circle 
        cx="300" 
        cy="175" 
        r="32" 
        fill={isBalanced ? "#eab308" : isEcoCollapsed ? "#ef4444" : "#64748b"} 
        fillOpacity="0.85" 
        stroke="#ffffff" 
        strokeWidth="2" 
      />
      <text x="300" y="172" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
        SUSTAINABLE
      </text>
      <text x="300" y="184" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">
        ZONE
      </text>

      {/* Intersections text */}
      <text x="300" y="120" textAnchor="middle" fill="#e2e8f0" fontSize="10">Equitable</text>
      <text x="235" y="215" fill="#e2e8f0" fontSize="10">Viable</text>
      <text x="335" y="215" fill="#e2e8f0" fontSize="10">Bearable</text>

      {/* Live Status Bar */}
      <rect x="30" y="295" width="540" height="35" fill="#0f172a" rx="6" stroke="#334155" />
      <text x="45" y="317" fill={isBalanced ? "#4ade80" : isEcoCollapsed ? "#f87171" : "#fbbf24"} fontSize="12" fontWeight="bold">
        {isBalanced 
          ? '✓ SUSTAINABLE EQUILIBRIUM ACHIEVED: High growth with ecological and social resilience!' 
          : isEcoCollapsed 
          ? '⚠ ECOLOGICAL COLLAPSE: Environmental degradation threatens long-term economy!' 
          : '⚡ UNBALANCED SYSTEM: Re-adjust regional policy allocations to achieve sustainability.'}
      </text>
    </svg>
  );
};

// SVG DIAGRAM 4: PLANNING FRAMEWORK NITI vs PLANNING COMMISSION
const PlanningFrameworkDiagram: React.FC<{ mode: 'planning_commission' | 'niti_aayog' }> = ({ mode }) => {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto bg-slate-900 rounded-lg shadow-inner border border-slate-700">
      <text x="300" y="28" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">
        {mode === 'planning_commission' 
          ? 'PLANNING COMMISSION ARCHITECTURE (1950 - 2014): Top-Down Mandate' 
          : 'NITI AAYOG ARCHITECTURE (2015 - Present): Bottom-Up Cooperative Federalism'}
      </text>

      {mode === 'planning_commission' ? (
        <g>
          {/* Top-Down Planning Commission flow */}
          <rect x="200" y="50" width="200" height="45" fill="#ef4444" rx="6" />
          <text x="300" y="77" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
            Central Planning Commission
          </text>
          <text x="300" y="89" textAnchor="middle" fill="#fecdd3" fontSize="9">Formulates 5-Year Plans & Fund Allocation</text>

          {/* Flow Arrows Down */}
          <line x1="300" y1="95" x2="300" y2="135" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow)" />
          <polygon points="300,145 292,130 308,130" fill="#ef4444" />

          <rect x="150" y="145" width="300" height="40" fill="#dc2626" rx="6" />
          <text x="300" y="170" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
            Central Ministries & State Departments
          </text>

          <line x1="200" y1="185" x2="130" y2="225" stroke="#ef4444" strokeWidth="3" />
          <polygon points="130,230 138,218 124,222" fill="#ef4444" />

          <line x1="400" y1="185" x2="470" y2="225" stroke="#ef4444" strokeWidth="3" />
          <polygon points="470,230 476,222 462,218" fill="#ef4444" />

          <rect x="50" y="230" width="160" height="45" fill="#991b1b" rx="6" />
          <text x="130" y="255" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">State Governments</text>
          <text x="130" y="267" textAnchor="middle" fill="#fca5a5" fontSize="9">Passive Recipient of Directives</text>

          <rect x="390" y="230" width="160" height="45" fill="#991b1b" rx="6" />
          <text x="470" y="255" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Local Districts/Blocks</text>
          <text x="470" y="267" textAnchor="middle" fill="#fca5a5" fontSize="9">Uniform One-Size-Fits-All Schemes</text>
        </g>
      ) : (
        <g>
          {/* Bottom-Up NITI Aayog Flow */}
          <rect x="50" y="210" width="160" height="50" fill="#16a34a" rx="6" />
          <text x="130" y="235" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">States & UTs</text>
          <text x="130" y="249" textAnchor="middle" fill="#bbf7d0" fontSize="9">Equal Strategic Partners</text>

          <rect x="390" y="210" width="160" height="50" fill="#16a34a" rx="6" />
          <text x="470" y="235" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Aspirational Districts</text>
          <text x="470" y="249" textAnchor="middle" fill="#bbf7d0" fontSize="9">Local Need-Based Inputs</text>

          {/* Upward Flow Arrows */}
          <line x1="130" y1="210" x2="210" y2="155" stroke="#22c55e" strokeWidth="3" />
          <polygon points="215,150 202,155 210,165" fill="#22c55e" />

          <line x1="470" y1="210" x2="390" y2="155" stroke="#22c55e" strokeWidth="3" />
          <polygon points="385,150 390,165 398,155" fill="#22c55e" />

          <rect x="180" y="105" width="240" height="45" fill="#15803d" rx="6" />
          <text x="300" y="130" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Governing Council & Team India</text>
          <text x="300" y="142" textAnchor="middle" fill="#bbf7d0" fontSize="9">Cooperative & Competitive Federalism</text>

          <line x1="300" y1="105" x2="300" y2="70" stroke="#22c55e" strokeWidth="4" />
          <polygon points="300,60 292,75 308,75" fill="#22c55e" />

          <rect x="180" y="45" width="240" height="40" fill="#047857" rx="6" />
          <text x="300" y="68" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">NITI Aayog Policy Think-Tank</text>
        </g>
      )}

      {/* Comparative Footer */}
      <rect x="20" y="280" width="560" height="30" fill="#0f172a" rx="4" stroke="#334155" />
      <text x="300" y="300" textAnchor="middle" fill="#cbd5e1" fontSize="11">
        {mode === 'planning_commission'
          ? 'Key Feature: Top-down financial allocation via 5-Year Plans (1951-2017).'
          : 'Key Feature: Think-tank advice, 15-Year Vision, 7-Year Strategy, 3-Year Action Agenda.'}
      </text>
    </svg>
  );
};


// MAIN COMPONENT
export default function C12_GeoPlanningSustainableDevCBSESim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Discovery Question State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [showDiscoveryHint, setShowDiscoveryHint] = useState<boolean>(false);

  // Lab Step & State Variables
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Lab 1: Indira Gandhi Canal Simulation Variables
  const [canalIrrigation, setCanalIrrigation] = useState<number>(75);
  const [linedCanals, setLinedCanals] = useState<boolean>(false);
  const [shelterbelts, setShelterbelts] = useState<boolean>(false);
  const [cropType, setCropType] = useState<'intensive' | 'sustainable'>('intensive');

  // Lab 2: Bharmaur ITDP Simulation Variables
  const [bharmaurYear, setBharmaurYear] = useState<number>(1971);
  const [bharmaurInfra, setBharmaurInfra] = useState<number>(20);
  const [bharmaurEducation, setBharmaurEducation] = useState<number>(15);

  // Lab 3: DPAP Watershed Variables
  const [dpapWatershedScore, setDpapWatershedScore] = useState<number>(30);
  const [dpapCheckDams, setDpapCheckDams] = useState<number>(2);
  const [dpapAfforestation, setDpapAfforestation] = useState<number>(15);

  // Lab 4: NITI vs PC Variables
  const [planningMode, setPlanningMode] = useState<'planning_commission' | 'niti_aayog'>('planning_commission');

  // Lab 5: 3 Pillars Balancer Variables
  const [pillarEco, setPillarEco] = useState<number>(40);
  const [pillarSocial, setPillarSocial] = useState<number>(50);
  const [pillarEnv, setPillarEnv] = useState<number>(30);

  // Prediction & Observation Answers State
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // Challenges Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // UI Visual Feedback States
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHintBubble, setShowHintBubble] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');

  // Auto-hint Timer Ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHintBubble(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeCompleted) {
        const chal = CHALLENGES[currentChallengeIndex];
        setHintText(chal.hints[0] || 'Think carefully about the geographical principles!');
        setShowHintBubble(true);
        audioManager.play('hint');
        speechManager.speak('Need a hint? Check the suggestion bubble.');
      }
    }, 12000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, challengeCompleted]);

  // Handle Discovery Answer Selection
  const handleDiscoverySelect = (idx: number) => {
    setDiscoveryAnswer(idx);
    setShowDiscoveryHint(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct observation! Over-irrigation causes soil salinization via capillary action.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider what happens when shallow groundwater rises and evaporates.');
    }
  };

  // Handle Challenge Option Click
  const handleChallengeSubmit = (index: number) => {
    if (challengeCompleted) return;
    setSelectedOption(index);
    const chal = CHALLENGES[currentChallengeIndex];
    const isCorrect = index === chal.correctIndex;

    // Update BKT & SRS
    const currentBKT = bktStates[chal.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [chal.nodeId]: updatedBKT }));

    const srsItem = createReviewItem(chal.nodeId);
    sm2Update(srsItem, isCorrect ? 5 : 2);

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Outstanding! That is correct.');
      setUserScore((prev) => prev + (chal.difficulty === 'advanced' ? 15 : chal.difficulty === 'standard' ? 10 : 5));
      setShowSparkle(true);
      setShowSuccessBanner(true);

      setTimeout(() => {
        setShowSparkle(false);
        setShowSuccessBanner(false);
      }, 2000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the geographical explanation.');
    }
    setChallengeCompleted(true);
  };

  // Move to next challenge
  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setChallengeCompleted(false);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all geography planning challenges.');
      const finalScore = Math.round((userScore / (CHALLENGES.length * 12)) * 100);
      recordGameScore('C12_GeoPlanningSustainableDevCBSESim', finalScore);
      if (onComplete) onComplete(finalScore);
      setActiveTab('summary');
    }
  };

  // Audio trigger for tabs
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    setActiveTab(tab);
    audioManager.play('tap');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col gap-6">
      {/* HEADER SECTION */}
      <header className="w-full bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30">
              Class 12 Geography (ISC/CBSE)
            </span>
            <span className="bg-gold-500/20 text-gold-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-gold-500/30">
              Interactive Lab Simulation
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Planning & Sustainable Development in India
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Target Area Planning • ITDP Bharmaur • Indira Gandhi Canal Command Area • NITI Aayog
          </p>
        </div>

        {/* Score & Mastery Indicator */}
        <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2.5 rounded-lg border border-slate-700">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Simulation Score</div>
            <div className="text-xl font-bold text-amber-400">{userScore} pts</div>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Challenges</div>
            <div className="text-sm font-semibold text-emerald-400">
              {currentChallengeIndex + 1} / {CHALLENGES.length}
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => handleTabChange('discovery')}
          className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
            activeTab === 'discovery'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          🔍 1. Discovery & Scenario
        </button>
        <button
          onClick={() => handleTabChange('lab')}
          className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
            activeTab === 'lab'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          🧪 2. Interactive Exploration Labs (5)
        </button>
        <button
          onClick={() => handleTabChange('challenges')}
          className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
            activeTab === 'challenges'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          🎯 3. Guided Challenges (22)
        </button>
        <button
          onClick={() => handleTabChange('summary')}
          className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
            activeTab === 'summary'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          📊 4. Real-World Case Summary
        </button>
      </nav>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scenario Description */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🗺️</span>
              <h2 className="text-xl font-bold text-emerald-400">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-base">{SCENARIO.intro}</p>
            <p className="text-slate-400 leading-relaxed text-sm bg-slate-950 p-4 rounded-lg border border-slate-800">
              {SCENARIO.context}
            </p>

            {/* Counterintuitive Discovery Question */}
            <div className="mt-6 border-t border-slate-800 pt-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
                ❓ Discovery Question (Preconception Test)
              </h3>
              <p className="text-slate-200 mb-4 font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-2.5">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySelect(idx)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all text-sm font-medium ${
                      discoveryAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {showDiscoveryHint && (
                <div className="mt-4 p-4 rounded-lg bg-gold-950/70 border border-gold-600/50 text-gold-200 text-sm">
                  <span className="font-bold text-gold-400">Geographical Explanation: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>
          </div>

          {/* Key Misconceptions Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col">
            <h3 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
              ⚠️ Misconception Radar
            </h3>
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
              {MISCONCEPTIONS.map((misc) => (
                <div key={misc.id} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                    ❌ Common Myth:
                  </div>
                  <div className="text-xs text-slate-300 italic font-medium">"{misc.statement}"</div>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-1">
                    ✓ Geographical Reality:
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">{misc.correction}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
      {activeTab === 'lab' && (
        <div className="flex flex-col gap-6">
          {/* Exploration Steps Selector */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  audioManager.play('tap');
                }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  currentStepIndex === idx
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                }`}
              >
                <div className="text-xs font-bold text-emerald-500 uppercase tracking-wide">Lab Step {idx + 1}</div>
                <div className="text-xs font-medium text-slate-200 truncate mt-1">{step.title.split(':')[1]}</div>
              </button>
            ))}
          </div>

          {/* Current Selected Step Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
            <h3 className="text-lg font-bold text-emerald-400">{EXPLORATION_STEPS[currentStepIndex].title}</h3>
            <p className="text-sm text-slate-300 mt-1">{EXPLORATION_STEPS[currentStepIndex].instruction}</p>
          </div>

          {/* LAB CONTENT RENDERER */}
          {currentStepIndex === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-6">
                <h4 className="text-base font-bold text-gold-400 border-b border-slate-800 pb-2">
                  🎛️ Command Area Controls
                </h4>

                <div>
                  <div className="flex justify-between text-sm text-slate-300 font-medium mb-1">
                    <span>Irrigation Discharge Level:</span>
                    <span className="text-emerald-400 font-bold">{canalIrrigation}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={canalIrrigation}
                    onChange={(e) => setCanalIrrigation(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={linedCanals}
                      onChange={(e) => setLinedCanals(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 rounded"
                    />
                    <span>Lined Canals (Prevents Seepage)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={shelterbelts}
                      onChange={(e) => setShelterbelts(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 rounded"
                    />
                    <span>Afforestation Shelterbelts (Windbreaks)</span>
                  </label>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-2">Cropping Pattern Strategy:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCropType('intensive')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                        cropType === 'intensive'
                          ? 'bg-rose-950 border border-rose-500 text-rose-200'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      💧 Intensive Cash Crops (Wheat/Cotton)
                    </button>
                    <button
                      onClick={() => setCropType('sustainable')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                        cropType === 'sustainable'
                          ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      🌱 Eco-Pasture & Fodder/Gram
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Diagram Render */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col justify-center">
                <IndiraGandhiCanalDiagram
                  irrigation={canalIrrigation}
                  linedCanals={linedCanals}
                  shelterbelts={shelterbelts}
                  cropType={cropType}
                />
              </div>
            </div>
          )}

          {currentStepIndex === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bharmaur Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-6">
                <h4 className="text-base font-bold text-amber-400 border-b border-slate-800 pb-2">
                  🏔️ ITDP Planning Timeline & Allocations
                </h4>

                <div>
                  <div className="flex justify-between text-sm text-slate-300 font-medium mb-1">
                    <span>Target Year Timeline:</span>
                    <span className="text-amber-400 font-bold">{bharmaurYear}</span>
                  </div>
                  <input
                    type="range"
                    min="1971"
                    max="2011"
                    step="10"
                    value={bharmaurYear}
                    onChange={(e) => setBharmaurYear(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1971 (Pre-ITDP)</span>
                    <span>1981</span>
                    <span>1991</span>
                    <span>2001</span>
                    <span>2011 (Post-ITDP)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-slate-300 font-medium mb-1">
                    <span>Road & Infrastructure Investment:</span>
                    <span className="text-emerald-400 font-bold">{bharmaurInfra}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bharmaurInfra}
                    onChange={(e) => setBharmaurInfra(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm text-slate-300 font-medium mb-1">
                    <span>Female Education & Health Allocation:</span>
                    <span className="text-gold-400 font-bold">{bharmaurEducation}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bharmaurEducation}
                    onChange={(e) => setBharmaurEducation(Number(e.target.value))}
                    className="w-full accent-gold-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>
              </div>

              {/* Diagram */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                <BharmaurRegionDiagram
                  infrastructure={bharmaurInfra}
                  educationBudget={bharmaurEducation}
                  year={bharmaurYear}
                />
              </div>
            </div>
          )}

          {currentStepIndex === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* DPAP Lab Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-6">
                <h4 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">
                  💧 DPAP Micro-Watershed Strategy
                </h4>

                <div>
                  <div className="flex justify-between text-sm text-slate-300 font-medium mb-1">
                    <span>Check Dams Built per Sub-basin:</span>
                    <span className="text-emerald-400 font-bold">{dpapCheckDams} dams</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={dpapCheckDams}
                    onChange={(e) => setDpapCheckDams(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm text-slate-300 font-medium mb-1">
                    <span>Pasture & Silvipasture Area:</span>
                    <span className="text-emerald-400 font-bold">{dpapAfforestation}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={dpapAfforestation}
                    onChange={(e) => setDpapAfforestation(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-400">DPAP Resilience Output:</div>
                  <div className="text-sm text-slate-200">
                    • Groundwater Recharge Index: <span className="text-gold-400 font-bold">{(dpapCheckDams * 8.5 + dpapAfforestation * 0.4).toFixed(1)} m³/ha</span>
                  </div>
                  <div className="text-sm text-slate-200">
                    • Soil Erosion Reduction: <span className="text-emerald-400 font-bold">{(dpapAfforestation * 1.5).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* Graphic Representation */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-full h-64 bg-slate-950 rounded-lg border border-slate-800 relative overflow-hidden flex items-end justify-around p-4">
                  {/* Watershed slope */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-950/40 via-emerald-950/40 to-slate-950" />

                  {/* Check Dams */}
                  {Array.from({ length: dpapCheckDams }).map((_, i) => (
                    <div key={i} className="z-10 flex flex-col items-center">
                      <div className="w-6 h-12 bg-slate-600 rounded-t border-t-2 border-slate-400" />
                      <div className="w-12 h-4 bg-gold-500/60 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                        Pond
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400">
                  Micro-watershed management stores surface runoff in check dams, recharging aquifers and reversing desertification.
                </p>
              </div>
            </div>
          )}

          {currentStepIndex === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-4">
                <h4 className="text-base font-bold text-gold-400 border-b border-slate-800 pb-2">
                  🏛️ Planning Institutional Model
                </h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setPlanningMode('planning_commission')}
                    className={`w-full p-3.5 rounded-lg text-left border transition-all ${
                      planningMode === 'planning_commission'
                        ? 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-sm">Planning Commission (1950 - 2014)</div>
                    <div className="text-xs opacity-80 mt-1">Top-down allocation, 5-Year plans, centralized directives.</div>
                  </button>

                  <button
                    onClick={() => setPlanningMode('niti_aayog')}
                    className={`w-full p-3.5 rounded-lg text-left border transition-all ${
                      planningMode === 'niti_aayog'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-sm">NITI Aayog (2015 - Present)</div>
                    <div className="text-xs opacity-80 mt-1">Bottom-up think tank, cooperative federalism, 15-yr vision.</div>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                <PlanningFrameworkDiagram mode={planningMode} />
              </div>
            </div>
          )}

          {currentStepIndex === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-5">
                <h4 className="text-base font-bold text-amber-400 border-b border-slate-800 pb-2">
                  ⚖️ Sustainability Balancer
                </h4>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                    <span>Economic Growth Pillar:</span>
                    <span className="text-gold-400 font-bold">{pillarEco}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={pillarEco}
                    onChange={(e) => setPillarEco(Number(e.target.value))}
                    className="w-full accent-gold-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                    <span>Social Equity & Inclusion:</span>
                    <span className="text-pink-400 font-bold">{pillarSocial}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={pillarSocial}
                    onChange={(e) => setPillarSocial(Number(e.target.value))}
                    className="w-full accent-pink-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                    <span>Environmental Integrity:</span>
                    <span className="text-emerald-400 font-bold">{pillarEnv}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={pillarEnv}
                    onChange={(e) => setPillarEnv(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                  />
                </div>
              </div>

              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                <SustainablePillarsDiagram
                  economic={pillarEco}
                  social={pillarSocial}
                  environmental={pillarEnv}
                />
              </div>
            </div>
          )}

          {/* RENDERING MANDATORY PREDICTION & OBSERVATION QUESTIONS INSIDE LAB TAB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Prediction Questions Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h4 className="text-md font-bold text-amber-400 flex items-center gap-2">
                🔮 Lab Prediction Verification
              </h4>
              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-200">{pred.question}</div>
                  <div className="space-y-1">
                    {pred.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          const newAns = [...predictionAnswers];
                          newAns[pIdx] = oIdx;
                          setPredictionAnswers(newAns);
                          if (oIdx === pred.correctIndex) audioManager.play('celebration');
                          else audioManager.play('error');
                        }}
                        className={`w-full text-left p-2 rounded text-xs transition-all ${
                          predictionAnswers[pIdx] === oIdx
                            ? oIdx === pred.correctIndex
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                              : 'bg-rose-950 text-rose-300 border border-rose-500'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="text-[11px] text-gold-400 italic">Verify: {pred.verifyInstruction}</div>
                </div>
              ))}
            </div>

            {/* Observation Questions Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h4 className="text-md font-bold text-gold-400 flex items-center gap-2">
                👁️ Empirical Observations
              </h4>
              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-200">{obs.question}</div>
                  <div className="space-y-1">
                    {obs.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          const newAns = [...observationAnswers];
                          newAns[oIdx] = optIdx;
                          setObservationAnswers(newAns);
                          if (optIdx === obs.correctIndex) audioManager.play('celebration');
                          else audioManager.play('error');
                        }}
                        className={`w-full text-left p-2 rounded text-xs transition-all ${
                          observationAnswers[oIdx] === optIdx
                            ? optIdx === obs.correctIndex
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                              : 'bg-rose-950 text-rose-300 border border-rose-500'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GUIDED CHALLENGES (22) */}
      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Challenge Card */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              {/* Challenge Header info */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                  {CHALLENGES[currentChallengeIndex].difficulty} Tier • Competency: {CHALLENGES[currentChallengeIndex].competencyLevel}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Node Ref: {CHALLENGES[currentChallengeIndex].nodeId}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-6">
                {CHALLENGES[currentChallengeIndex].question}
              </h3>

              {/* MCQ Options */}
              <div className="space-y-3">
                {CHALLENGES[currentChallengeIndex].options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === CHALLENGES[currentChallengeIndex].correctIndex;
                  let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600';

                  if (challengeCompleted) {
                    if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                    else if (isSelected) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={challengeCompleted}
                      onClick={() => handleChallengeSubmit(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Post-Answer Explanation Box */}
            {challengeCompleted && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  Geographical Explanation:
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  {CHALLENGES[currentChallengeIndex].explanation}
                </div>
                <div className="pt-3 flex justify-end">
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                  >
                    Next Challenge →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mastery & BKT Tracking Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <h4 className="text-md font-bold text-slate-200 mb-4 flex items-center gap-2">
                📈 Learning Knowledge Mastery
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Bayesian Knowledge Tracing (BKT) probability metrics across key geography syllabus nodes:
              </p>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
                {[
                  { id: NODE_350, label: 'NITI Aayog Framework' },
                  { id: NODE_355, label: 'Target Area Planning' },
                  { id: NODE_358, label: 'DPAP Watershed Strategy' },
                  { id: NODE_363, label: 'ITDP Tribal Bharmaur' },
                  { id: NODE_374, label: 'Brundtland Sustainability' },
                  { id: NODE_376, label: 'Indira Gandhi Canal Area' },
                  { id: NODE_378, label: 'Canal Soil Salinization Hazard' }
                ].map((nodeObj) => {
                  const bState = bktStates[nodeObj.id] || createBKTState();
                  const masteryPct = Math.round(bState.pKnown * 100);
                  const masteryLevel = getMasteryLevel(bState.pKnown);

                  return (
                    <div key={nodeObj.id} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                      <div className="flex justify-between font-medium text-slate-300 mb-1">
                        <span>{nodeObj.label}</span>
                        <span className="text-emerald-400 font-bold">{masteryPct}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full transition-all duration-500"
                          style={{ width: `${masteryPct}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 capitalize">Status: {masteryLevel}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <span className="text-xs text-slate-400">
                Spaced Repetition Algorithm: <span className="text-gold-400 font-semibold">SM-2 Active</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REAL-WORLD SUMMARY & ACTIVITY */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Description */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <span className="text-3xl">📋</span>
              <div>
                <h2 className="text-xl font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">Applied Planning & Geography Field Action</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide">Standard Operating Steps:</h3>
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Final Certificate / Performance Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col items-center text-center justify-between">
            <div className="space-y-4 w-full">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-500/20">
                🏆
              </div>
              <h3 className="text-lg font-bold text-white">Simulation Completed!</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You have mastered Planning Institutions, Regional Imbalances, Target Area Programmes, and Sustainable Development concepts.
              </p>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 w-full">
                <div className="text-xs text-slate-400">Total Score Earned</div>
                <div className="text-3xl font-extrabold text-amber-400 mt-1">{userScore} PTS</div>
              </div>
            </div>

            <button
              onClick={() => {
                setUserScore(0);
                setCurrentChallengeIndex(0);
                setSelectedOption(null);
                setChallengeCompleted(false);
                setActiveTab('discovery');
                audioManager.play('whoosh');
              }}
              className="w-full mt-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
            >
              🔄 Re-run Simulation
            </button>
          </div>
        </div>
      )}

      {/* MANDATORY SIMULATION FEEDBACK OVERLAYS */}
      <HintBubble show={showHintBubble} text={hintText} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Completed!" />
      <Confetti show={showConfetti} />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}
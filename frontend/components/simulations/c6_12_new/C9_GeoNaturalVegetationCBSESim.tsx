'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ---------------------------------------------------------------------------
// MANDATORY NODE IDS
// ---------------------------------------------------------------------------
const ALL_NODE_IDS = [
  'c9_geo_cbse_018',
  'c9_geo_cbse_019',
  'c9_geo_cbse_020',
  'c9_geo_cbse_021',
  'c9_geo_cbse_022',
  'c9_geo_cbse_023',
  'c9_geo_cbse_024',
  'c9_geo_cbse_025',
  'c9_geo_cbse_026',
  'c9_geo_cbse_027',
  'c9_geo_cbse_028',
  'c9_geo_cbse_029',
  'c9_geo_cbse_030',
  'c9_geo_cbse_031',
  'c9_geo_cbse_032',
  'c9_geo_cbse_033',
  'c9_geo_cbse_034',
  'c9_geo_cbse_035',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ---------------------------------------------------------------------------
// TYPES & INTERFACES
// ---------------------------------------------------------------------------
interface Scenario {
  title: string;
  intro: string;
  context: string;
}

interface DiscoveryQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  hintAfter: string;
}

interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: NodeId;
}

interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: NodeId;
}

interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: NodeId;
}

interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

interface Misconception {
  id: string;
  topic: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'classification' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface MedicinalPlant {
  name: string;
  botanicalName: string;
  uses: string;
  habitat: string;
  partUsed: string;
}

// ---------------------------------------------------------------------------
// MANDATORY CONSTANTS & SECTIONS
// ---------------------------------------------------------------------------
const SCENARIO: Scenario = {
  title: 'Indian Biome & Vegetation Ecosystem Simulator',
  intro: 'Welcome to the National Environmental & Botanical Laboratory of India. As a senior biogeographer, you are tasked with modeling India’s diverse natural ecosystems, understanding climate-vegetation interactions, and designing conservation strategies.',
  context: 'You will adjust environmental parameters such as annual rainfall, mean temperature, altitude, and photoperiod to observe biome transitions, examine canopy structures, explore medicinal flora, and protect endangered wildlife species.'
};

const DISCOVERY_QUESTION: DiscoveryQuestion = {
  question: 'Why do Tropical Deciduous forests shed their leaves during early summer for 6 to 8 weeks while Tropical Evergreen forests remain green year-round?',
  options: [
    'Deciduous trees lose leaves to protect themselves from frost and cold weather.',
    'Deciduous trees shed leaves to conserve water during dry periods, whereas Evergreen forests experience continuous heavy rainfall with no distinct dry season.',
    'Evergreen trees never drop leaves at any time of the year.',
    'Deciduous trees shed leaves because of excessive sunlight during summer months.'
  ],
  correctIndex: 1,
  hintAfter: 'Evergreen species actually shed leaves continuously at different times throughout the year, so the forest canopy as a whole never appears bare!'
};

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Climate Matrix & Biome Formation',
    instruction: 'Adjust Annual Rainfall (cm) and Mean Annual Temperature (°C) sliders to discover how tropical evergreen, deciduous, thorn scrub, and alpine biomes form.',
    interactionType: 'climate-matrix-slider',
    nodeId: 'c9_geo_cbse_022'
  },
  {
    title: 'Lab 2: Altitude & Montane Zonation',
    instruction: 'Change the Altitude slider from 0 meters up to 4000 meters to observe vertical zonation from wet temperate forests to conifers and alpine tundra.',
    interactionType: 'altitude-zonation-slider',
    nodeId: 'c9_geo_cbse_030'
  },
  {
    title: 'Lab 3: Forest Canopy Stratification & Photoperiod',
    instruction: 'Simulate solar photoperiod hours and light absorption through canopy layers (Emergent, Upper Canopy, Understory, Forest Floor).',
    interactionType: 'canopy-photoperiod-sim',
    nodeId: 'c9_geo_cbse_023'
  },
  {
    title: 'Lab 4: Mangrove & Tidal Ecosystem Dynamics',
    instruction: 'Toggle salinity levels and tidal inundation depth to test pneumatophore (breathing root) adaptation in Sundarbans tidal mangroves.',
    interactionType: 'mangrove-tidal-sim',
    nodeId: 'c9_geo_cbse_031'
  },
  {
    title: 'Lab 5: Ethnobotany & Medicinal Plant Matrix',
    instruction: 'Inspect indigenous medicinal plants of India (Sarpagandha, Neem, Tulsi, Babool, Arjun, Jamun) and test their pharmacognosic applications.',
    interactionType: 'medicinal-plant-matrix',
    nodeId: 'c9_geo_cbse_035'
  }
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: If annual rainfall in a region drops from 220 cm to 85 cm while temperature stays around 27°C, how will the natural vegetation transform?',
    options: [
      'It will shift from Montane Coniferous to Alpine Scrub.',
      'It will transition from Tropical Evergreen Forest to Dry Deciduous / Thorn Scrub Vegetation.',
      'It will turn directly into Tidal Mangrove Swamps.',
      'No change will occur because temperature dictates forest type entirely.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, drag Annual Rainfall down from >200 cm to 85 cm and observe the biome transformation.',
    nodeId: 'c9_geo_cbse_024'
  },
  {
    question: 'Predict: What adaptation allows trees like Cacti, Acacias, and Euphorbias to survive in regions with under 70 cm of annual precipitation?',
    options: [
      'Broad, thin leaves to catch maximum morning dew.',
      'Deep taproots, succulent stems, and leaves reduced to spines to minimize transpiration.',
      'High rates of leaf shedding during monsoon months.',
      'Aerial prop roots that absorb nitrogen from humid fog.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select the Thorn & Scrub Biome in Lab 1 and inspect plant morphological adaptations.',
    nodeId: 'c9_geo_cbse_029'
  }
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What do you notice about tree heights and canopy density as you increase elevation above 3,600 meters in the Montane zone?',
    observableOptions: [
      'Trees grow taller and denser canopy layers develop.',
      'Trees give way to stunted shrubs, birches, junipers, and eventually alpine mosses and lichens.',
      'Broadleaf evergreen trees replace coniferous pines.',
      'Dense bamboo groves dominate the landscape.'
    ],
    correctIndex: 1,
    nodeId: 'c9_geo_cbse_030'
  },
  {
    question: 'What special root adaptation is observed in Mangrove trees growing in saline deltaic mudflats?',
    observableOptions: [
      'Deep taproots that reach 50 meters into freshwater aquifers.',
      'Pneumatophores (vertical breathing roots) protruding above water level to absorb oxygen.',
      'Thick bulbous tubers that store starch.',
      'Fleshy stems that drop leaves every fortnight.'
    ],
    correctIndex: 1,
    nodeId: 'c9_geo_cbse_031'
  }
];

const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Ecosystem Restoration & Biosphere Management Plan',
  description: 'Apply botanical and biogeographical principles to design a conservation corridor in Western Ghats / Sundarbans reserve networks.',
  steps: [
    'Step 1: Calculate canopy coverage index using light transmission sensors in tropical wet evergreen zones (>200cm rainfall).',
    'Step 2: Map endemic fauna species (e.g., Lion-tailed Macaque, Nilgiri Tahr) against altitude and vegetation zones.',
    'Step 3: Evaluate threat factors from invasive exotic flora (e.g., Lantana camara, Water Hyacinth) disrupting local endemic species.',
    'Step 4: Formulate a multi-zone Biosphere Reserve layout (Core, Buffer, Transition) incorporating Project Tiger and indigenous medicinal plant nurseries.'
  ]
};

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_01',
    topic: 'Evergreen Shedding',
    misconception: 'Tropical Evergreen trees never drop their leaves at all.',
    correction: 'Evergreen trees shed leaves continuously throughout the year rather than all at once in a single season, so the canopy remains green year-round.',
    nodeId: 'c9_geo_cbse_027'
  },
  {
    id: 'misc_02',
    topic: 'Virgin Vegetation',
    misconception: 'All forests in India are natural virgin vegetation.',
    correction: 'Virgin vegetation refers specifically to plant communities that have grown naturally without human interference and remain undisturbed. Most cultivated crops and plantations are not virgin vegetation.',
    nodeId: 'c9_geo_cbse_019'
  },
  {
    id: 'misc_03',
    topic: 'Endemic vs Exotic',
    misconception: 'Exotic species are always beneficial to local biodiversity.',
    correction: 'Exotic species come from outside India; some can become invasive weeds (e.g., Lantana, Water Hyacinth) that threaten endemic indigenous flora.',
    nodeId: 'c9_geo_cbse_020'
  },
  {
    id: 'misc_04',
    topic: 'Rainfall vs Temperature',
    misconception: 'Only temperature determines where tropical deciduous forests grow.',
    correction: 'Both rainfall and temperature dictate biomes. Tropical Deciduous forests specifically depend on annual rainfall between 70 cm and 200 cm.',
    nodeId: 'c9_geo_cbse_028'
  },
  {
    id: 'misc_05',
    topic: 'Mangrove Oxygenation',
    misconception: 'Mangrove roots absorb water and nutrients only through subterranean soil roots.',
    correction: 'In anaerobic deltaic mud, mangroves require specialized aerial pneumatophores (breathing roots) to absorb atmospheric oxygen.',
    nodeId: 'c9_geo_cbse_031'
  },
  {
    id: 'misc_06',
    topic: 'Wildlife Sanctuaries vs National Parks',
    misconception: 'Wildlife Sanctuaries and National Parks have identical legal protection levels.',
    correction: 'National Parks enjoy higher protection where human activities like grazing or timber collection are strictly prohibited, whereas limited human activities may be permitted in Wildlife Sanctuaries.',
    nodeId: 'c9_geo_cbse_034'
  }
];

// ---------------------------------------------------------------------------
// 22 PROGRESSIVE CHALLENGES (FOUNDATION, STANDARD, ADVANCED)
// ---------------------------------------------------------------------------
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'chal_01',
    nodeId: 'c9_geo_cbse_018',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'India is one of the 12 mega-biodiversity countries of the world. Approximately how many plant species are documented in India?',
    options: ['Around 10,000', 'Around 47,000', 'Around 150,000', 'Over 1,000,000'],
    correctIndex: 1,
    explanation: 'India occupies 10th place in the world and 4th in Asia with about 47,000 plant species.',
    hints: [
      'Think of India’s global ranking in plant diversity (10th globally).',
      'The number is around four to five tens of thousands.',
      'The exact census count in textbook references is 47,000.'
    ]
  },
  {
    id: 'chal_02',
    nodeId: 'c9_geo_cbse_019',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Natural vegetation that has grown naturally without human aid and left undisturbed for a long time is termed as:',
    options: ['Cultivated crops', 'Orchard flora', 'Virgin vegetation (Akshat)', 'Exotic plantation'],
    correctIndex: 2,
    explanation: 'Pure undisturbed natural flora is called virgin vegetation. When purely native to India, it is termed endemic or indigenous.',
    hints: [
      'It implies untouched by human hands.',
      'The Hindi term for it in textbooks is "Akshat".',
      'Select Virgin Vegetation.'
    ]
  },
  {
    id: 'chal_03',
    nodeId: 'c9_geo_cbse_020',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Plant species that are purely native to India and have not come from outside are known as:',
    options: ['Exotic species', 'Endemic (Indigenous) species', 'Invasive weeds', 'Migratory species'],
    correctIndex: 1,
    explanation: 'Endemic or indigenous species originated within the specified region and are naturally confined to it.',
    hints: [
      'Contrast this with "exotic" species brought from foreign lands.',
      'The root word means restricted to a specific region.',
      'Answer is Endemic species.'
    ]
  },
  {
    id: 'chal_04',
    nodeId: 'c9_geo_cbse_027',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following tree species is characteristic of Tropical Evergreen Forests?',
    options: ['Teak (Tectona grandis)', 'Acacia', 'Ebony and Mahogany', 'Peepal'],
    correctIndex: 2,
    explanation: 'Ebony, Mahogany, Rosewood, Rubber, and Cinchona are major commercial tree species in Tropical Evergreen forests.',
    hints: [
      'Teak is deciduous; Acacia belongs to thorn scrub.',
      'Look for dense rainforest hardwoods.',
      'Ebony and Mahogany are evergreen species.'
    ]
  },
  {
    id: 'chal_05',
    nodeId: 'c9_geo_cbse_028',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the annual rainfall range required for Moist Deciduous Forests in India?',
    options: ['Above 200 cm', '100 cm to 200 cm', '70 cm to 100 cm', 'Less than 50 cm'],
    correctIndex: 1,
    explanation: 'Moist deciduous forests grow in areas receiving between 100 cm and 200 cm of annual precipitation.',
    hints: [
      'Evergreen receives >200 cm, Dry Deciduous 70-100 cm.',
      'It sits right in the medium rainfall band.',
      ' Choose 100 cm to 200 cm.'
    ]
  },
  {
    id: 'chal_06',
    nodeId: 'c9_geo_cbse_031',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'The famous "Sundari" tree, which yields durable hard timber, is primarily found in which deltaic forest region?',
    options: ['Western Ghats slopes', 'Sundarbans Delta of West Bengal', 'Thar Desert edge', 'Ladakh Cold Desert'],
    correctIndex: 1,
    explanation: 'Sundarbans delta in West Bengal is named after the abundant Sundari trees in its mangrove ecosystem.',
    hints: [
      'It is a mangrove tree growing in Ganga-Brahmaputra delta.',
      'The region shares its name with the tree species.',
      'Select Sundarbans Delta.'
    ]
  },
  {
    id: 'chal_07',
    nodeId: 'c9_geo_cbse_035',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which medicinal plant, found exclusively in India, is widely used for treating high blood pressure (hypertension)?',
    options: ['Jamun', 'Sarpagandha', 'Neem', 'Tulsi'],
    correctIndex: 1,
    explanation: 'Sarpagandha (Rauvolfia serpentina) is used to treat blood pressure and is found almost exclusively in India.',
    hints: [
      'Its root contains reserpine used for anti-hypertensive medicine.',
      'The name relates to "Sarpa" (snake-root).',
      'Select Sarpagandha.'
    ]
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'chal_08',
    nodeId: 'c9_geo_cbse_021',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'How do sandy soils of arid regions vs wet deltaic soils influence the spatial vegetation pattern in India?',
    options: ['Sandy soils support dense evergreens, while deltaic mud supports cacti.', 'Sandy soils support cacti & thorn scrub, while deltaic soils support mangroves and marshy vegetation.', 'Both soil types yield identical montane pine forests.', 'Soil type has zero influence on natural vegetation.'],
    correctIndex: 1,
    explanation: 'Soil variance influences vegetation: dry sandy soils foster xerophytic scrub; rich deltaic silts support mangroves.',
    hints: [
      'Consider water retention and salinity in desert sand vs delta mud.',
      'Thorns store water in deserts; mangroves handle coastal tides.',
      'Sandy -> Cactus/Thorn; Deltaic -> Mangroves.'
    ]
  },
  {
    id: 'chal_09',
    nodeId: 'c9_geo_cbse_022',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'On the slopes of the Himalayas above 900m, mean annual temperature drops below 17°C. What vegetation transition occurs?',
    options: ['Tropical to Subtropical and Temperate forests', 'Tropical Evergreen to Thorn Scrub', 'Mangroves to Dry Deciduous', 'Alpine Scrub to Desert Scrub'],
    correctIndex: 0,
    explanation: 'Fall in temperature with increasing altitude causes a transition from tropical to subtropical, temperate, and alpine zones.',
    hints: [
      'Higher altitude lowers temperature.',
      'Cooler temperatures switch tropical trees to temperate/coniferous types.',
      'Transition: Tropical -> Subtropical/Temperate.'
    ]
  },
  {
    id: 'chal_10',
    nodeId: 'c9_geo_cbse_023',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'How does variation in photoperiod (sunlight duration) affect tree growth rate during summer in northern India?',
    options: ['Trees grow faster in summer due to longer duration of photoperiod light.', 'Trees stop photosynthesis due to solar radiation excess.', 'Photoperiod alters soil mineral content without affecting growth.', 'Longer photoperiod forces leaf shedding.'],
    correctIndex: 0,
    explanation: 'Longer duration of sunlight (photoperiod) during summer accelerates photosynthetic activity and tree growth.',
    hints: [
      'More daylight hours means more light energy absorption.',
      'Sunlight directly powers photosynthesis.',
      'Trees grow faster in summer.'
    ]
  },
  {
    id: 'chal_11',
    nodeId: 'c9_geo_cbse_025',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which human activity has caused the most widespread fragmentation of wildlife habitats in India?',
    options: ['Scientific forestry plantations', 'Deforestation for agriculture, urbanisation, and infrastructure expansion', 'Afforestation drives by eco-clubs', 'Establishment of Biosphere Reserves'],
    correctIndex: 1,
    explanation: 'Uncontrolled clearing of forest land for farming, housing, roads, and industries breaks continuous habitat into fragmented corridors.',
    hints: [
      'Look for destructive land-use changes.',
      'Clearing trees destroys food webs and corridors.',
      'Deforestation for agriculture & urbanisation.'
    ]
  },
  {
    id: 'chal_12',
    nodeId: 'c9_geo_cbse_029',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Why do trees in Tropical Thorn Forests have deep roots, thick succulent stems, and leaves modified into spines?',
    options: ['To absorb atmospheric nitrogen and maximize evaporation.', 'To penetrate deep soil for water, store water, and reduce transpiration losses.', 'To withstand heavy snowfall during winter.', 'To prevent wild animals from climbing canopy tops.'],
    correctIndex: 1,
    explanation: 'Xerophytic adaptations: deep roots reach moisture, thick stems hold moisture, spines reduce leaf surface area to cut transpiration.',
    hints: [
      'Thorn forests receive less than 70cm rainfall.',
      'Every feature aims to conserve water in arid climates.',
      'Deep roots find water; spines cut transpiration.'
    ]
  },
  {
    id: 'chal_13',
    nodeId: 'c9_geo_cbse_030',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'At altitudes between 1500m and 3000m on Himalayan slopes, which forest type dominated by Deodar, Pine, Spruce, and Cedar is found?',
    options: ['Tropical Wet Evergreen', 'Temperate Coniferous Forests', 'Tidal Mangrove Swamps', 'Thorn Scrub'],
    correctIndex: 1,
    explanation: 'Coniferous trees like Pine, Deodar, Silver Fir, Spruce, and Cedar thrive in temperate elevation zones (1500–3000m).',
    hints: [
      'Deodar and Pine are evergreen conifers with needle leaves.',
      'Elevation 1500-3000m corresponds to temperate alpine zones.',
      'Temperate Coniferous Forests.'
    ]
  },
  {
    id: 'chal_14',
    nodeId: 'c9_geo_cbse_032',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Recall',
    question: 'The Gir National Park in Gujarat is famous for being the last remaining natural habitat of which endangered big cat?',
    options: ['Royal Bengal Tiger', 'Asiatic Lion', 'Snow Leopard', 'Indian Cheetah'],
    correctIndex: 1,
    explanation: 'Gir Forest in Gujarat is the solitary natural home of the Asiatic Lion (Panthera leo persica).',
    hints: [
      'It is not the Bengal tiger (found in Sundarbans/MP).',
      'It is the only wild population of this lion subspecies.',
      'Asiatic Lion.'
    ]
  },
  {
    id: 'chal_15',
    nodeId: 'c9_geo_cbse_034',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What is the primary objective of establishing a Biosphere Reserve under UNESCO’s Man and Biosphere (MAB) program?',
    options: ['To clear forests for sustainable timber harvesting.', 'To promote large-scale ecotourism resorts.', 'To conserve biodiversity alongside sustainable economic and social development of local communities.', 'To capture wild animals for zoological parks.'],
    correctIndex: 2,
    explanation: 'Biosphere Reserves balance environmental conservation with scientific research and sustainable development for local human communities.',
    hints: [
      'Biosphere reserves include core, buffer, and transition zones.',
      'They integrate nature conservation with local livelihoods.',
      'Conserve biodiversity with sustainable community development.'
    ]
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'chal_16',
    nodeId: 'c9_geo_cbse_026',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Evaluate ecological role: How do natural forest ecosystems regulate local hydrological cycles and mitigate flash floods?',
    options: ['Forests absorb water through canopy and roots, enhancing soil infiltration and slowing surface runoff.', 'Forests convert groundwater directly into atmospheric methane.', 'Forest canopy blocks all rainfall from reaching soil layers.', 'Forests increase surface evaporation to create drought.'],
    correctIndex: 0,
    explanation: 'Forest canopy intercepts rain drops, root networks bind soil and increase water permeability, reducing peak stream flows during monsoons.',
    hints: [
      'Think about tree root systems acting like sponges.',
      'Canopy breaks direct impact of heavy rain drops on soil.',
      'Root networks bind soil and enhance groundwater recharge.'
    ]
  },
  {
    id: 'chal_17',
    nodeId: 'c9_geo_cbse_033',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Analyze threat factors: Why are large apex carnivores like the Bengal Tiger and Indian Leopard disproportionately vulnerable to habitat fragmentation?',
    options: ['They feed only on synthetic food sources.', 'They require extensive home ranges and dense prey populations; fragmented habitats force human-wildlife conflict.', 'They cannot reproduce in temperate climates.', 'They are immune to poaching activities.'],
    correctIndex: 1,
    explanation: 'Apex predators have wide territorial ranges and low population densities. Corridor disruption leads to gene pool isolation and territorial conflict.',
    hints: [
      'Apex predators sit at the top of the trophic pyramid.',
      'Smaller isolated forest patches cannot support territory or prey.',
      'They require large home ranges & suffer from territorial isolation.'
    ]
  },
  {
    id: 'chal_18',
    nodeId: 'c9_geo_cbse_035',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Match the medicinal plant with its correct biochemical application: Neem, Arjun, Tulsi, Babool.',
    options: [
      'Neem: Antibacterial/Pesticide; Arjun: Heart/Earache; Tulsi: Cough/Cold; Babool: Eye sores/Gum strength',
      'Neem: High BP; Arjun: Cough; Tulsi: Eye sores; Babool: Heart',
      'Neem: Asthma; Arjun: Blood Pressure; Tulsi: Malaria; Babool: Cholera',
      'Neem: Diabetes; Arjun: Skin rash; Tulsi: Earache; Babool: High BP'
    ],
    correctIndex: 0,
    explanation: 'Neem has antibacterial/antiseptic qualities; Arjun bark is used for heart ailments; Tulsi cures cough/cold; Babool gum cures eye sores and strengthens teeth.',
    hints: [
      'Neem leaves/seeds are natural antibacterial pest repellents.',
      'Tulsi is widely taken in herbal tea for respiratory ailments.',
      'Arjun bark is a cardio-tonic.'
    ]
  },
  {
    id: 'chal_19',
    nodeId: 'c9_geo_cbse_024',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'A meteorological station records 1,850 mm (185 cm) of annual rainfall with mean annual temperature of 26°C. Calculate the expected leaf-shedding duration (in weeks) for dominant flora.',
    correctAnswer: 7,
    explanation: 'With 185 cm rainfall, this region belongs to Moist Deciduous Forest where trees shed leaves for approximately 6 to 8 weeks (average 7 weeks) in dry summer.',
    hints: [
      'Identify the forest type: 100-200 cm rainfall = Deciduous.',
      'Deciduous trees shed leaves in dry summer for 6 to 8 weeks.',
      'Enter the average integer value between 6 and 8: 7.'
    ]
  },
  {
    id: 'chal_20',
    nodeId: 'c9_geo_cbse_030',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'At what altitude threshold (in meters) do Temperate Coniferous forests transition into Alpine Vegetation (Junipers, Birches, Rhododendrons) in the Himalayas?',
    correctAnswer: 3600,
    explanation: 'At high altitudes above 3,600 meters above sea level, temperate forests give way to Alpine vegetation and pastures.',
    hints: [
      'Temperate broadleaf: 1000-2000m; Coniferous: 1500-3000m.',
      'Alpine vegetation begins above 3600 meters.',
      'Enter 3600.'
    ]
  },
  {
    id: 'chal_21',
    nodeId: 'c9_geo_cbse_034',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Which legal wildlife protection project launched in 1973 in India successfully created 50+ specialized reserves for apex feline conservation?',
    options: ['Project Snow Leopard', 'Project Elephant', 'Project Tiger', 'Project Rhino'],
    correctIndex: 2,
    explanation: 'Project Tiger was launched in April 1973 to save Bengal Tigers from extinction by establishing protected tiger reserves across India.',
    hints: [
      'It launched in 1973.',
      'It targets Panthera tigris.',
      'Project Tiger.'
    ]
  },
  {
    id: 'chal_22',
    nodeId: 'c9_geo_cbse_018',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Synthesize India’s bio-geographical status: India holds ~8% of world species on only ~2.4% of land area. What combination of factors enables this high biodiversity?',
    options: ['Uniform topography and constant freezing climate throughout.', 'Vast range of landforms (mountains, plains, coasts, deserts), varied soil types, monsoon climate variations, and tropical-to-alpine temperature gradients.', 'Absence of human habitation across 90% of landmass.', 'Artificial greenhouse cultivation across all states.'],
    correctIndex: 1,
    explanation: 'India’s immense biodiversity stems from its varied altitudinal range, diverse soil types, vast latitude span, and monsoon precipitation variations.',
    hints: [
      'Think of physical geography: Himalayas, Thar, Western Ghats, Sundarbans.',
      'Climate ranges from tropical heat to arctic alpine cold.',
      'Diverse landforms, soil types, climate, and altitudinal gradients.'
    ]
  }
];

// ---------------------------------------------------------------------------
// MEDICINAL PLANTS DATA MATRIX
// ---------------------------------------------------------------------------
const MEDICINAL_PLANTS: MedicinalPlant[] = [
  { name: 'Sarpagandha', botanicalName: 'Rauvolfia serpentina', uses: 'Treats high blood pressure (hypertension); exclusive native to India.', habitat: 'Moist deciduous forest undergrowth', partUsed: 'Root extract' },
  { name: 'Jamun', botanicalName: 'Syzygium cumini', uses: 'Seed powder controls diabetes; juice helps digestive ailments.', habitat: 'Peninsular moist forest riverbanks', partUsed: 'Seeds & Fruit' },
  { name: 'Arjun', botanicalName: 'Terminalia arjuna', uses: 'Bark juice treats earache & regulates blood pressure / heart function.', habitat: 'Deciduous riverine zones', partUsed: 'Bark & Leaves' },
  { name: 'Babool', botanicalName: 'Acacia nilotica', uses: 'Leaves cure eye sores; gum used as health tonic & tooth cleaning.', habitat: 'Dry thorn scrub & semi-arid plains', partUsed: 'Bark, Gum, Leaves' },
  { name: 'Neem', botanicalName: 'Azadirachta indica', uses: 'High antibacterial, antifungal & antiviral properties; natural pesticide.', habitat: 'Dry & moist deciduous plains', partUsed: 'Leaves, Bark, Seed oil' },
  { name: 'Tulsi', botanicalName: 'Ocimum sanctum', uses: 'Cures cough, cold, bronchitis, and boosts immune system.', habitat: 'Cultivated across household gardens & plains', partUsed: 'Leaves & Seeds' }
];

// ---------------------------------------------------------------------------
// SUB-COMPONENTS: CUSTOM INTERACTIVE DIAGRAMS & CANVASES
// ---------------------------------------------------------------------------

// 1. Interactive Vegetation Zone Diagram (SVG)
const VegetationZoneDiagram: React.FC<{
  rainfall: number;
  temperature: number;
  altitude: number;
}> = ({ rainfall, temperature, altitude }) => {
  // Determine dominant biome based on inputs
  let biomeName = 'Tropical Evergreen Forest';
  let biomeColor = '#059669';
  let canopyDensity = 'High (Closed Canopy)';
  let primarySpecies = 'Ebony, Mahogany, Rosewood, Rubber';

  if (altitude > 3600) {
    biomeName = 'Alpine Vegetation & Tundra';
    biomeColor = '#94a3b8';
    canopyDensity = 'Low (Stunted Shrubs, Mosses, Lichens)';
    primarySpecies = 'Junipers, Birches, Rhododendrons, Mosses';
  } else if (altitude > 1500) {
    biomeName = 'Montane Temperate Coniferous Forest';
    biomeColor = '#0d9488';
    canopyDensity = 'Moderate-High (Pine & Cedar Canopy)';
    primarySpecies = 'Deodar, Pine, Silver Fir, Spruce, Cedar';
  } else if (rainfall > 200) {
    biomeName = 'Tropical Wet Evergreen Forest';
    biomeColor = '#047857';
    canopyDensity = 'Dense Multi-Layered Canopy (>60m)';
    primarySpecies = 'Ebony, Mahogany, Rosewood, Cinchona';
  } else if (rainfall >= 100) {
    biomeName = 'Tropical Moist Deciduous Forest';
    biomeColor = '#65a30d';
    canopyDensity = 'Moderate Canopy (Sheds leaves 6-8 wks)';
    primarySpecies = 'Teak, Sal, Bamboo, Shisham, Sandalwood';
  } else if (rainfall >= 70) {
    biomeName = 'Tropical Dry Deciduous Forest';
    biomeColor = '#ca8a04';
    canopyDensity = 'Open Canopy with Grass Patches';
    primarySpecies = 'Sal, Peepal, Neem, Khair, Axlewood';
  } else {
    biomeName = 'Tropical Thorn & Scrub Vegetation';
    biomeColor = '#d97706';
    canopyDensity = 'Sparse Thorny Trees & Cacti Scrub';
    primarySpecies = 'Acacias, Euphorbias, Cacti, Palms, Khair';
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
          <span>🌿</span> Natural Biome Dynamic Profile
        </h3>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700">
          {biomeName}
        </span>
      </div>

      <svg className="w-full h-56 rounded-lg bg-slate-950 border border-slate-800" viewBox="0 0 600 220">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="mountainGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Background Sky & Grid */}
        <rect x="0" y="0" width="600" height="220" fill="url(#skyGrad)" />
        <line x1="50" y1="180" x2="550" y2="180" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="180" stroke="#475569" strokeWidth="2" />

        {/* Axes Labels */}
        <text x="300" y="210" fill="#94a3b8" fontSize="11" textAnchor="middle">Annual Precipitation (cm)</text>
        <text x="18" y="100" fill="#94a3b8" fontSize="11" textAnchor="middle" transform="rotate(-90 18 100)">Altitude (m) / Temp (°C)</text>

        {/* Dynamic Terrain Profile */}
        <path
          d={`M 50 180 Q 200 ${180 - (altitude / 4000) * 120} 350 ${180 - (altitude / 4000) * 140} T 550 ${180 - (altitude / 4000) * 130} L 550 180 Z`}
          fill={biomeColor}
          opacity="0.4"
        />

        {/* Forest Canopy Trees SVG Rendering */}
        {altitude > 3600 ? (
          // Alpine Low Shrubs
          <g transform="translate(200, 100)">
            <circle cx="50" cy="50" r="12" fill="#94a3b8" />
            <circle cx="120" cy="52" r="15" fill="#cbd5e1" />
            <circle cx="200" cy="48" r="10" fill="#64748b" />
          </g>
        ) : altitude > 1500 ? (
          // Coniferous Trees (Pine/Deodar triangles)
          <g transform="translate(150, 80)">
            <polygon points="50,60 30,110 70,110" fill="#0d9488" />
            <polygon points="50,40 35,80 65,80" fill="#14b8a6" />
            <rect x="46" y="110" width="8" height="20" fill="#78350f" />

            <polygon points="150,50 130,105 170,105" fill="#0d9488" />
            <polygon points="150,30 135,75 165,75" fill="#14b8a6" />
            <rect x="146" y="105" width="8" height="25" fill="#78350f" />
          </g>
        ) : rainfall > 200 ? (
          // Dense Evergreen Canopy Layers
          <g transform="translate(100, 40)">
            <circle cx="60" cy="60" r="45" fill="#047857" opacity="0.9" />
            <circle cx="120" cy="50" r="50" fill="#059669" opacity="0.9" />
            <circle cx="180" cy="65" r="40" fill="#10b981" opacity="0.8" />
            <circle cx="240" cy="55" r="48" fill="#047857" opacity="0.9" />
            <rect x="55" y="100" width="10" height="60" fill="#451a03" />
            <rect x="115" y="95" width="12" height="65" fill="#451a03" />
            <rect x="175" y="100" width="10" height="60" fill="#451a03" />
            <rect x="235" y="98" width="12" height="62" fill="#451a03" />
          </g>
        ) : rainfall >= 100 ? (
          // Deciduous Trees
          <g transform="translate(120, 60)">
            <circle cx="70" cy="60" r="38" fill="#65a30d" />
            <circle cx="160" cy="55" r="42" fill="#84cc16" />
            <circle cx="250" cy="65" r="35" fill="#4d7c0f" />
            <rect x="65" y="95" width="10" height="65" fill="#78350f" />
            <rect x="155" y="92" width="10" height="68" fill="#78350f" />
            <rect x="245" y="98" width="10" height="62" fill="#78350f" />
          </g>
        ) : (
          // Thorn Scrub / Cacti
          <g transform="translate(150, 90)">
            {/* Cactus */}
            <rect x="60" y="50" width="12" height="60" rx="6" fill="#ca8a04" />
            <rect x="45" y="65" width="40" height="8" rx="4" fill="#ca8a04" />
            <rect x="45" y="50" width="8" height="20" rx="4" fill="#ca8a04" />
            {/* Thorny Bush */}
            <circle cx="160" cy="80" r="25" fill="#b45309" stroke="#78350f" strokeDasharray="4,4" />
            <circle cx="240" cy="85" r="20" fill="#d97706" />
          </g>
        )}

        {/* Current State Marker Pin */}
        <circle cx={50 + (rainfall / 300) * 480} cy={180 - (altitude / 4000) * 130} r="6" fill="#ef4444" className="animate-ping" />
        <circle cx={50 + (rainfall / 300) * 480} cy={180 - (altitude / 4000) * 130} r="5" fill="#f87171" stroke="#ffffff" strokeWidth="2" />
      </svg>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-xs">
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <span className="text-slate-400 block">Canopy Structure</span>
          <span className="font-semibold text-emerald-300">{canopyDensity}</span>
        </div>
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <span className="text-slate-400 block">Key Tree Species</span>
          <span className="font-semibold text-amber-300 truncate block">{primarySpecies}</span>
        </div>
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <span className="text-slate-400 block">Rainfall Input</span>
          <span className="font-semibold text-cyan-300">{rainfall} cm / year</span>
        </div>
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <span className="text-slate-400 block">Altitude / Temp</span>
          <span className="font-semibold text-indigo-300">{altitude} m ({temperature}°C)</span>
        </div>
      </div>
    </div>
  );
};

// 2. Interactive Canopy Stratification Diagram (SVG)
const CanopyStratificationSVG: React.FC<{ photoperiodHours: number }> = ({ photoperiodHours }) => {
  const lightAbsorption = Math.min(99, Math.max(10, Math.round(photoperiodHours * 7.5)));

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-teal-400 flex items-center gap-2">
          <span>🌲</span> Forest Canopy Vertical Stratification
        </h3>
        <span className="text-xs bg-teal-950 text-teal-300 px-3 py-1 rounded-full border border-teal-800">
          Photoperiod: {photoperiodHours} Hours/Day
        </span>
      </div>

      <svg className="w-full h-64 rounded-lg bg-slate-950 border border-slate-800" viewBox="0 0 600 240">
        {/* Sky / Sunlight Ray Gradient */}
        <defs>
          <linearGradient id="sunRay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Sunlight Beams */}
        <polygon points="100,0 200,0 280,240 50,240" fill="url(#sunRay)" opacity={photoperiodHours / 14} />
        <polygon points="350,0 450,0 520,240 300,240" fill="url(#sunRay)" opacity={photoperiodHours / 14} />

        {/* Stratification Layers */}
        {/* 1. Emergent Layer (>40m) */}
        <line x1="0" y1="50" x2="600" y2="50" stroke="#059669" strokeDasharray="4,4" strokeWidth="1" />
        <text x="590" y="42" fill="#34d399" fontSize="11" textAnchor="end" fontWeight="bold">Emergent Layer (&gt;40m) - 100% Sunlight</text>
        <circle cx="150" cy="35" r="28" fill="#10b981" />
        <circle cx="420" cy="30" r="32" fill="#059669" />

        {/* 2. Upper Canopy Layer (20m-40m) */}
        <line x1="0" y1="110" x2="600" y2="110" stroke="#16a34a" strokeDasharray="4,4" strokeWidth="1" />
        <text x="590" y="102" fill="#4ade80" fontSize="11" textAnchor="end" fontWeight="bold">Canopy Layer (20m-40m) - 70-80% Light Filtered</text>
        <rect x="50" y="55" width="220" height="45" rx="20" fill="#15803d" opacity="0.9" />
        <rect x="310" y="50" width="240" height="50" rx="22" fill="#166534" opacity="0.9" />

        {/* 3. Understory Layer (5m-20m) */}
        <line x1="0" y1="170" x2="600" y2="170" stroke="#ca8a04" strokeDasharray="4,4" strokeWidth="1" />
        <text x="590" y="162" fill="#facc15" fontSize="11" textAnchor="end" fontWeight="bold">Understory (5m-20m) - Shrubs, Orchids, Palms</text>
        <circle cx="90" cy="140" r="18" fill="#a3e635" />
        <circle cx="210" cy="145" r="20" fill="#84cc16" />
        <circle cx="380" cy="138" r="22" fill="#65a30d" />
        <circle cx="490" cy="142" r="16" fill="#4d7c0f" />

        {/* 4. Forest Floor (0m-5m) */}
        <rect x="0" y="210" width="600" height="30" fill="#3f6212" />
        <text x="590" y="202" fill="#a1a1aa" fontSize="11" textAnchor="end" fontWeight="bold">Forest Floor (0m-5m) - Fungi, Ferns, Decomposers (&lt;2% Light)</text>

        {/* Tree Trunks */}
        <rect x="146" y="55" width="8" height="155" fill="#78350f" />
        <rect x="416" y="55" width="8" height="155" fill="#78350f" />
      </svg>

      <div className="mt-3 bg-slate-800 p-3 rounded-lg flex justify-between items-center text-xs">
        <div>
          <span className="text-slate-400">Photosynthetic Active Radiation Filtered: </span>
          <span className="text-teal-300 font-bold">{lightAbsorption}%</span>
        </div>
        <div>
          <span className="text-slate-400">Fauna Zones: </span>
          <span className="text-amber-300">Birds/Bats (Emergent) • Monkeys/Sloths (Canopy) • Frogs/Snakes (Understory)</span>
        </div>
      </div>
    </div>
  );
};

// 3. Interactive Mangrove Tidal Adaptation Simulator (SVG)
const MangroveTidalSVG: React.FC<{ tideLevel: number; salinity: number }> = ({ tideLevel, salinity }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
          <span>🌊</span> Mangrove Tidal & Breathing Root (Pneumatophore) Sim
        </h3>
        <span className="text-xs bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800">
          Salinity: {salinity} ppt (Parts per Thousand)
        </span>
      </div>

      <svg className="w-full h-56 rounded-lg bg-slate-950 border border-slate-800" viewBox="0 0 600 200">
        {/* Mud Bed */}
        <rect x="0" y="130" width="600" height="70" fill="#332720" />
        <text x="300" y="175" fill="#a8a29e" fontSize="11" textAnchor="middle">Anaerobic Saline Silt / Deltaic Mudflat</text>

        {/* Tidal Water Level Layer */}
        <rect x="0" y={130 - tideLevel * 0.8} width="600" height={70 + tideLevel * 0.8} fill="#0284c7" opacity="0.45" />
        <line x1="0" y1={130 - tideLevel * 0.8} x2="600" y2={130 - tideLevel * 0.8} stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" />
        <text x="20" y={120 - tideLevel * 0.8} fill="#7dd3fc" fontSize="11" fontWeight="bold">
          High Tide Line ({tideLevel} cm)
        </text>

        {/* Mangrove Tree Structure */}
        <g transform="translate(250, 10)">
          {/* Canopy */}
          <circle cx="50" cy="40" r="35" fill="#047857" />
          <circle cx="20" cy="50" r="25" fill="#059669" />
          <circle cx="80" cy="50" r="28" fill="#10b981" />

          {/* Main Trunk */}
          <rect x="44" y="70" width="12" height="60" fill="#543310" />

          {/* Stilt Roots / Prop Roots */}
          <path d="M 44 90 Q 20 120 0 140" stroke="#78350f" strokeWidth="5" fill="none" />
          <path d="M 56 90 Q 80 120 100 140" stroke="#78350f" strokeWidth="5" fill="none" />
          <path d="M 46 100 Q 30 130 15 145" stroke="#78350f" strokeWidth="4" fill="none" />
          <path d="M 54 100 Q 70 130 85 145" stroke="#78350f" strokeWidth="4" fill="none" />

          {/* Vertical Breathing Roots (Pneumatophores) growing up out of mud */}
          <line x1="-30" y1="150" x2="-30" y2="105" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
          <line x1="-15" y1="150" x2="-15" y2="100" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
          <line x1="115" y1="150" x2="115" y2="102" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
          <line x1="130" y1="150" x2="130" y2="108" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />

          {/* Oxygen Exchange Bubbles from exposed pneumatophores */}
          {130 - tideLevel * 0.8 < 105 && (
            <g className="animate-bounce">
              <circle cx="-30" cy="95" r="3" fill="#67e8f9" />
              <circle cx="-15" cy="90" r="4" fill="#67e8f9" />
              <circle cx="115" cy="92" r="3" fill="#67e8f9" />
              <text x="45" y="20" fill="#67e8f9" fontSize="10" textAnchor="middle" fontWeight="bold">
                O₂ Gas Exchange Active!
              </text>
            </g>
          )}
        </g>
      </svg>

      <div className="mt-3 bg-slate-800 p-2.5 rounded-lg text-xs grid grid-cols-2 gap-2">
        <div className="text-slate-300">
          <span className="font-semibold text-cyan-300 block">Adaptation Mechanism:</span>
          Pneumatophores project upward above brackish water to transport atmospheric oxygen to subterranean root tissues.
        </div>
        <div className="text-slate-300">
          <span className="font-semibold text-emerald-300 block">Sundarbans Eco-Importance:</span>
          Acts as a vital shoreline buffer against cyclone storm surges and provides habitat for Royal Bengal Tigers.
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// MAIN COMPONENT CLASS
// ---------------------------------------------------------------------------
export default function C9_GeoNaturalVegetationCBSESim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab Sim States
  const [rainfall, setRainfall] = useState<number>(180); // cm/year
  const [temperature, setTemperature] = useState<number>(24); // °C
  const [altitude, setAltitude] = useState<number>(600); // meters
  const [photoperiod, setPhotoperiod] = useState<number>(12); // hours
  const [tideLevel, setTideLevel] = useState<number>(40); // cm
  const [salinity, setSalinity] = useState<number>(28); // ppt
  const [selectedMedicinal, setSelectedMedicinal] = useState<MedicinalPlant>(MEDICINAL_PLANTS[0]);

  // Challenge & Mastery States
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [score, setScore] = useState<number>(0);

  // Discovery & Lab Quiz Answers
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // Visual Feedback Animations
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Hint & Timer Ref
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BKT & SRS States Map
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initialMap: Partial<Record<NodeId, ReturnType<typeof createBKTState>>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState(id);
    });
    return initialMap as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  const [sm2Items, setSm2Items] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach((c) => {
      initialMap[c.id] = createReviewItem(c.id);
    });
    return initialMap;
  });

  // ---------------------------------------------------------------------------
  // AUTO HINT TIMER HANDLER
  // ---------------------------------------------------------------------------
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const activeChal = CHALLENGES[currentChallengeIndex];
        if (activeChal && activeChal.hints.length > 0) {
          setCurrentHint(`💡 Auto-Hint: ${activeChal.hints[0]}`);
          setShowHint(true);
          audioManager.play('hint');
          speechManager.speak('Here is a helpful hint for this geography challenge.');
        }
      }
    }, 10000); // 10s inactivity trigger
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab]);

  // ---------------------------------------------------------------------------
  // ANSWER VERIFICATION FOR CHALLENGES
  // ---------------------------------------------------------------------------
  const handleAnswerSubmit = (optionIdx?: number) => {
    resetInactivityTimer();
    const chal = CHALLENGES[currentChallengeIndex];
    if (!chal) return;

    let isCorrect = false;

    if (chal.type === 'numeric') {
      const val = parseFloat(numericInput);
      isCorrect = val === chal.correctAnswer;
    } else {
      const chosen = optionIdx !== undefined ? optionIdx : selectedOption;
      if (chosen === null) return;
      isCorrect = chosen === chal.correctIndex;
    }

    // Audio & Visual Effects
    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });

      setFeedback({
        isCorrect: true,
        message: `Excellent! Correct analysis. ${chal.explanation}`
      });
      speechManager.speak('Correct! Outstanding geographical understanding.');

      if (!completedChallenges.has(chal.id)) {
        const nextCompleted = new Set(completedChallenges).add(chal.id);
        setCompletedChallenges(nextCompleted);
        const newScore = score + 10;
        setScore(newScore);

        if (nextCompleted.size === CHALLENGES.length) {
          setShowConfetti(true);
          setShowSuccess(true);
          audioManager.play('celebration');
          speechManager.speak('Congratulations! You have mastered all geography challenges for Natural Vegetation and Wildlife!');
          recordGameScore('c9_geo_cbse_natural_vegetation', newScore);
          if (onComplete) onComplete(newScore);
        }
      }
    } else {
      audioManager.play('error');
      setFeedback({
        isCorrect: false,
        message: `Incorrect. ${chal.explanation}`
      });
      speechManager.speak('That is not correct. Review the explanation and try again.');
    }

    // BKT State Update
    const prevBkt = bktStates[chal.nodeId] || createBKTState(chal.nodeId);
    const updatedBkt = bktUpdate(prevBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [chal.nodeId]: updatedBkt }));

    // SM2 Spaced Repetition Update
    const prevSm2 = sm2Items[chal.id] || createReviewItem(chal.id);
    const updatedSm2 = sm2Update(prevSm2, isCorrect ? 5 : 1);
    setSm2Items((prev) => ({ ...prev, [chal.id]: updatedSm2 }));
  };

  const handleNextChallenge = () => {
    setFeedback(null);
    setSelectedOption(null);
    setNumericInput('');
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('whoosh');
    }
  };

  const handlePrevChallenge = () => {
    setFeedback(null);
    setSelectedOption(null);
    setNumericInput('');
    setShowHint(false);
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex((prev) => prev - 1);
      audioManager.play('whoosh');
    }
  };

  // ---------------------------------------------------------------------------
  // TAB 1: DISCOVERY & SCENARIO RENDERER
  // ---------------------------------------------------------------------------
  const renderDiscoveryTab = () => {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Scenario Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border border-emerald-700 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🌏</span>
            <h2 className="text-2xl font-black text-emerald-300">{SCENARIO.title}</h2>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
          <div className="bg-emerald-950/70 border border-emerald-800/80 rounded-lg p-3 text-xs text-emerald-200">
            <strong className="text-emerald-400">Context & Objective:</strong> {SCENARIO.context}
          </div>
        </div>

        {/* Discovery Question Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-xs font-bold uppercase">
              Core Discovery Challenge
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

          <div className="space-y-3 mb-4">
            {DISCOVERY_QUESTION.options.map((opt, idx) => {
              const isSelected = discoveryAnswer === idx;
              const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
              let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750';

              if (discoveryAnswer !== null) {
                if (isCorrect) btnStyle = 'bg-emerald-900/80 border-emerald-500 text-emerald-200';
                else if (isSelected) btnStyle = 'bg-rose-900/80 border-rose-500 text-rose-200';
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setDiscoveryAnswer(idx);
                    audioManager.play(isCorrect ? 'pop' : 'error');
                    if (isCorrect) speechManager.speak('Correct discovery insight!');
                  }}
                  className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {discoveryAnswer !== null && (
            <div className={`p-4 rounded-lg border text-xs leading-relaxed ${discoveryAnswer === DISCOVERY_QUESTION.correctIndex ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300' : 'bg-rose-950/80 border-rose-700 text-rose-300'}`}>
              <strong className="block mb-1 font-bold">
                {discoveryAnswer === DISCOVERY_QUESTION.correctIndex ? '✓ Correct Discovery!' : '✕ Misconception Alert!'}
              </strong>
              {DISCOVERY_QUESTION.hintAfter}
            </div>
          )}
        </div>

        {/* PREDICTION QUESTIONS SECTION */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl space-y-6">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <span>🔮</span> Biome Hypotheses & Predictions
          </h3>

          {PREDICTION_QUESTIONS.map((pred, pIdx) => (
            <div key={pIdx} className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-3">
              <p className="font-semibold text-sm text-slate-100">{pred.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {pred.options.map((opt, oIdx) => {
                  const isSelected = predictionAnswers[pIdx] === oIdx;
                  const isCorrect = oIdx === pred.correctIndex;
                  let style = 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700';

                  if (predictionAnswers[pIdx] !== null) {
                    if (isCorrect) style = 'bg-emerald-900/80 border-emerald-500 text-emerald-200';
                    else if (isSelected) style = 'bg-rose-900/80 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        const newAns = [...predictionAnswers];
                        newAns[pIdx] = oIdx;
                        setPredictionAnswers(newAns);
                        audioManager.play(isCorrect ? 'chime' : 'error');
                      }}
                      className={`text-left p-3 rounded border text-xs transition-all ${style}`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {predictionAnswers[pIdx] !== null && (
                <div className="text-xs bg-slate-900/90 border border-slate-700 p-2.5 rounded text-cyan-300">
                  🔍 <strong>Interactive Verification:</strong> {pred.verifyInstruction}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // TAB 2: INTERACTIVE LAB & SIMULATION RENDERER
  // ---------------------------------------------------------------------------
  const renderLabTab = () => {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* EXPLORATION STEPS GUIDANCE BAR */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-lg">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span>🧪</span> 5 Progressive Exploration Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700 rounded p-2.5 text-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-bold text-emerald-400 block mb-1">{step.title}</span>
                  <p className="text-slate-300 text-[11px] leading-tight">{step.instruction}</p>
                </div>
                <span className="mt-2 text-[10px] text-slate-500 font-mono">Node: {step.nodeId}</span>
              </div>
            ))}
          </div>
        </div>

        {/* LAB MODULE 1 & 2: CONTROLS + DIAGRAM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sliders Panel */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-xl space-y-5">
            <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span>🎛️</span> Eco-Climate Simulator Controls
            </h3>

            {/* Rainfall Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Annual Rainfall</span>
                <span className="text-cyan-400 font-bold">{rainfall} cm</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="5"
                value={rainfall}
                onChange={(e) => {
                  setRainfall(Number(e.target.value));
                  audioManager.play('count');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Arid (&lt;70cm)</span>
                <span>Deciduous (70-200cm)</span>
                <span>Evergreen (&gt;200cm)</span>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Mean Temperature</span>
                <span className="text-amber-400 font-bold">{temperature} °C</span>
              </div>
              <input
                type="range"
                min="2"
                max="35"
                step="1"
                value={temperature}
                onChange={(e) => {
                  setTemperature(Number(e.target.value));
                  audioManager.play('count');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Alpine (&lt;7°C)</span>
                <span>Temperate (7-17°C)</span>
                <span>Tropical (&gt;24°C)</span>
              </div>
            </div>

            {/* Altitude Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Altitude Level</span>
                <span className="text-indigo-400 font-bold">{altitude} m</span>
              </div>
              <input
                type="range"
                min="0"
                max="4000"
                step="100"
                value={altitude}
                onChange={(e) => {
                  setAltitude(Number(e.target.value));
                  audioManager.play('swoop');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Plains (0m)</span>
                <span>Coniferous (1500m)</span>
                <span>Alpine (&gt;3600m)</span>
              </div>
            </div>

            {/* Photoperiod Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Photoperiod Sunlight</span>
                <span className="text-yellow-400 font-bold">{photoperiod} hrs/day</span>
              </div>
              <input
                type="range"
                min="6"
                max="16"
                step="0.5"
                value={photoperiod}
                onChange={(e) => {
                  setPhotoperiod(Number(e.target.value));
                  audioManager.play('tap');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
            </div>

            {/* Tidal & Salinity Controls */}
            <div className="border-t border-slate-800 pt-3 space-y-3">
              <span className="text-xs font-bold text-teal-400 block">Mangrove Tidal Controls</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-slate-400 block text-[11px]">Tide Depth (cm)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={tideLevel}
                    onChange={(e) => setTideLevel(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded accent-teal-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block text-[11px]">Salinity (ppt)</label>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    value={salinity}
                    onChange={(e) => setSalinity(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded accent-teal-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Biome Graphic Profile Component */}
          <div className="lg:col-span-2">
            <VegetationZoneDiagram
              rainfall={rainfall}
              temperature={temperature}
              altitude={altitude}
            />
          </div>
        </div>

        {/* LAB MODULE 3 & 4: CANOPY + MANGROVE VISUALIZERS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CanopyStratificationSVG photoperiodHours={photoperiod} />
          <MangroveTidalSVG tideLevel={tideLevel} salinity={salinity} />
        </div>

        {/* LAB MODULE 5: MEDICINAL PLANTS INTERACTIVE EXPLORER */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-xl">
          <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
            <span>🪴</span> Indian Indigenous Medicinal Plant Matrix
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4">
            {MEDICINAL_PLANTS.map((plant, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedMedicinal(plant);
                  audioManager.play('pickup');
                  speechManager.speak(`Selected ${plant.name}. ${plant.uses}`);
                }}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${selectedMedicinal.name === plant.name ? 'bg-emerald-900/80 border-emerald-500 text-emerald-200 shadow-md scale-105' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'}`}
              >
                <div className="text-lg mb-1">🌱</div>
                {plant.name}
              </button>
            ))}
          </div>

          {/* Active Medicinal Card */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Common Name</span>
              <span className="text-lg font-bold text-emerald-300">{selectedMedicinal.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Botanical Name</span>
              <span className="italic text-amber-300">{selectedMedicinal.botanicalName}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Part Used & Habitat</span>
              <span className="text-cyan-300">{selectedMedicinal.partUsed} ({selectedMedicinal.habitat})</span>
            </div>
            <div>
              <span className="text-slate-400 block">Pharmacognosic Use</span>
              <span className="text-slate-200 font-medium">{selectedMedicinal.uses}</span>
            </div>
          </div>
        </div>

        {/* OBSERVATION QUESTIONS SECTION */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl space-y-6">
          <h3 className="text-xl font-bold text-teal-400 flex items-center gap-2">
            <span>👁️</span> Empirical Observation Questions
          </h3>

          {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
            <div key={oIdx} className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-3">
              <p className="font-semibold text-sm text-slate-100">{obs.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {obs.observableOptions.map((opt, optIdx) => {
                  const isSelected = observationAnswers[oIdx] === optIdx;
                  const isCorrect = optIdx === obs.correctIndex;
                  let style = 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700';

                  if (observationAnswers[oIdx] !== null) {
                    if (isCorrect) style = 'bg-emerald-900/80 border-emerald-500 text-emerald-200';
                    else if (isSelected) style = 'bg-rose-900/80 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => {
                        const newAns = [...observationAnswers];
                        newAns[oIdx] = optIdx;
                        setObservationAnswers(newAns);
                        audioManager.play(isCorrect ? 'chime' : 'error');
                      }}
                      className={`text-left p-3 rounded border text-xs transition-all ${style}`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // TAB 3: 22 PROGRESSIVE CHALLENGES RENDERER
  // ---------------------------------------------------------------------------
  const renderChallengesTab = () => {
    const chal = CHALLENGES[currentChallengeIndex];
    if (!chal) return null;

    const isDone = completedChallenges.has(chal.id);

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Header Progress Bar */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex justify-between items-center shadow-lg">
          <div>
            <span className="text-xs text-slate-400 font-mono">
              Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${chal.difficulty === 'foundation' ? 'bg-blue-900/80 text-blue-300 border border-blue-700' : chal.difficulty === 'standard' ? 'bg-amber-900/80 text-amber-300 border border-amber-700' : 'bg-rose-900/80 text-rose-300 border border-rose-700'}`}>
                {chal.difficulty}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Competency: {chal.competencyLevel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Mastered:</span>
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-700 rounded-full text-xs font-bold">
              {completedChallenges.size} / {CHALLENGES.length}
            </span>
          </div>
        </div>

        {/* Main Challenge Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-white leading-snug">{chal.question}</h3>
            {isDone && (
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 rounded text-xs font-bold shrink-0">
                ✓ Solved
              </span>
            )}
          </div>

          {/* Answer Input Area */}
          {chal.type === 'numeric' ? (
            <div className="space-y-3">
              <label className="text-xs text-slate-300 block">Enter numerical value:</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Type number..."
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 w-48"
                />
                <button
                  onClick={() => handleAnswerSubmit()}
                  disabled={!numericInput}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {chal.options?.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750';

                if (isSelected) {
                  btnStyle = 'bg-indigo-950 border-indigo-500 text-indigo-200 shadow-md';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedOption(idx);
                      audioManager.play('tap');
                    }}
                    className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}

              <div className="pt-2">
                <button
                  onClick={() => handleAnswerSubmit()}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all"
                >
                  Check Answer
                </button>
              </div>
            </div>
          )}

          {/* Feedback Section */}
          {feedback && (
            <div className={`p-4 rounded-lg border text-xs leading-relaxed ${feedback.isCorrect ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300' : 'bg-rose-950/80 border-rose-700 text-rose-300'}`}>
              <strong className="block mb-1 font-bold text-sm">
                {feedback.isCorrect ? '✓ Correct Answer!' : '✕ Incorrect'}
              </strong>
              {feedback.message}
            </div>
          )}

          {/* Navigation & Hints */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={handlePrevChallenge}
              disabled={currentChallengeIndex === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-lg"
            >
              ← Previous
            </button>

            <button
              onClick={() => {
                setShowHint((prev) => !prev);
                if (!showHint) {
                  setCurrentHint(`💡 Hint: ${chal.hints[0]}`);
                  audioManager.play('hint');
                }
              }}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              {showHint ? 'Hide Hint' : '💡 Need a Hint?'}
            </button>

            <button
              onClick={handleNextChallenge}
              disabled={currentChallengeIndex === CHALLENGES.length - 1}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-lg"
            >
              Next Challenge →
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // TAB 4: SUMMARY & MASTERY REPORT RENDERER
  // ---------------------------------------------------------------------------
  const renderSummaryTab = () => {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Overview Score Card */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-800 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-black text-teal-300 mb-1">Ecosystem Mastery Report</h2>
            <p className="text-xs text-slate-300">
              Comprehensive BKT (Bayesian Knowledge Tracing) & SRS evaluation across 18 curriculum nodes.
            </p>
          </div>
          <div className="bg-slate-900/90 border border-teal-700 rounded-lg p-4 text-center shrink-0 min-w-[160px]">
            <span className="text-xs text-slate-400 block">Overall Score</span>
            <span className="text-3xl font-black text-emerald-400">{score} pts</span>
            <span className="text-[10px] text-teal-300 block mt-1">
              {completedChallenges.size} / {CHALLENGES.length} Completed
            </span>
          </div>
        </div>

        {/* REAL-WORLD EXTENSION ACTIVITY */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <h3 className="text-lg font-bold text-amber-400">{REAL_WORLD_ACTIVITY.title}</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
          <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-4 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase">Execution Protocol Steps:</h4>
            <ol className="list-decimal list-inside space-y-1 text-xs text-slate-200">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* MISCONCEPTIONS & CORRECTIONS MATRIX */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
            <span>⚠️</span> Misconceptions & Scientific Corrections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MISCONCEPTIONS.map((item) => (
              <div key={item.id} className="bg-slate-800/60 border border-slate-700 rounded-lg p-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-slate-700 pb-1.5">
                  <span className="font-bold text-amber-400">{item.topic}</span>
                  <span className="text-[10px] font-mono text-slate-500">{item.nodeId}</span>
                </div>
                <div>
                  <span className="text-rose-400 font-semibold block">Common Myth:</span>
                  <p className="text-slate-300">{item.misconception}</p>
                </div>
                <div>
                  <span className="text-emerald-400 font-semibold block">Scientific Reality:</span>
                  <p className="text-slate-200">{item.correction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NODE BKT MASTERY GRID */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
            <span>📊</span> BKT Knowledge State by Curriculum Node
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {ALL_NODE_IDS.map((nodeId) => {
              const bkt = bktStates[nodeId] || createBKTState(nodeId);
              const masteryPct = Math.round(bkt.pKnown * 100);
              const level = getMasteryLevel(bkt.pKnown);

              return (
                <div key={nodeId} className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-center text-xs">
                  <span className="font-mono text-[10px] text-slate-400 block mb-1">{nodeId}</span>
                  <div className="text-base font-bold text-emerald-400 mb-1">{masteryPct}%</div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${level === 'mastered' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : level === 'proficient' ? 'bg-amber-950 text-amber-300 border border-amber-700' : 'bg-slate-900 text-slate-400'}`}>
                    {level.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // MAIN COMPONENT JSX RETURN
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All Geography Challenges Completed!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <HintBubble show={showHint} text={currentHint} />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
              ICSE Class 9 Geography • Chapter Simulation
            </span>
            <h1 className="text-2xl font-black text-white">Natural Vegetation and Wildlife</h1>
          </div>

          <div className="flex gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => {
                setActiveTab('discovery');
                audioManager.play('whoosh');
              }}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${activeTab === 'discovery' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              🔍 Discovery
            </button>
            <button
              onClick={() => {
                setActiveTab('lab');
                audioManager.play('whoosh');
              }}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${activeTab === 'lab' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              🧪 Dynamic Lab
            </button>
            <button
              onClick={() => {
                setActiveTab('challenges');
                audioManager.play('whoosh');
              }}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${activeTab === 'challenges' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              🎯 Challenges ({CHALLENGES.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('summary');
                audioManager.play('whoosh');
              }}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${activeTab === 'summary' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              📊 Mastery Report
            </button>
          </div>
        </div>

        {/* Tab Content Rendering */}
        {activeTab === 'discovery' && renderDiscoveryTab()}
        {activeTab === 'lab' && renderLabTab()}
        {activeTab === 'challenges' && renderChallengesTab()}
        {activeTab === 'summary' && renderSummaryTab()}
      </div>
    </div>
  );
}
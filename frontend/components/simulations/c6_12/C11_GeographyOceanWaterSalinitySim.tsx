'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

// ─── ISC GEOGRAPHY CLASS 11 NODE IDENTIFIERS ───
const NODE_C11_GEO_021 = 'c11_geo_021'; // Ocean water — salinity, temperature, density
const NODE_C11_GEO_022 = 'c11_geo_022'; // Ocean currents and tides
const NODE_C11_GEO_023 = 'c11_geo_023'; // Biosphere — concept of ecosystems
const NODE_C11_GEO_024 = 'c11_geo_024'; // Biodiversity and conservation
const NODE_C11_GEO_025 = 'c11_geo_025'; // Map work — physical geography

const ALL_NODE_IDS = [
  NODE_C11_GEO_021,
  NODE_C11_GEO_022,
  NODE_C11_GEO_023,
  NODE_C11_GEO_024,
  NODE_C11_GEO_025
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Expedition Thalassa & Terra: The Earth System Odyssey',
  intro:
    'You are the Chief Oceanographer and Biogeographer aboard the Indian research vessel Sagar Nidhi. Your mission spans the high seas: investigate anomalous salinity stratification in the Arabian Sea, decode thermohaline sinking driving global conveyor currents, track tidal oscillations, preserve biodiversity hotspots across the Western Ghats, and chart the physical landmarks that anchor global geography.',
  context:
    'Earth’s hydrosphere, biosphere, and lithosphere are intricately coupled. Changing salinity alters density, triggering deep ocean overturning; warm and cold currents govern global climate; trophic energy limits biosphere biomass; and unique hotspots safeguard endangered endemics.'
};

// ─── DISCOVERY HOOK QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question:
    'The Equator receives the most intense solar radiation and highest thermal energy on Earth. Yet, the highest surface ocean salinity is NOT found at the Equator, but in the Subtropical belts (20°–30° N/S). Why?',
  options: [
    'Subtropical waters are colder, and cold water dissolves more crystalline mineral salts.',
    'Equatorial regions experience heavy daily convectional rainfall that dilutes surface seawater despite high evaporation.',
    'Undersea hydrothermal vents along the Mid-Atlantic ridge discharge salts directly into the subtropics.',
    'Subtropical zones have zero ocean currents, so dissolved mineral salts pool without moving.'
  ],
  correctIndex: 1,
  hintAfter:
    'Surprising, right? High insolation alone does not guarantee high salinity! Heavy equatorial rainfall (precipitation > evaporation) dilutes the seawater, while subtropical high-pressure zones suffer scorching dryness where evaporation vastly exceeds precipitation.'
};

// ─── PREDICTION QUESTIONS (Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_geo_01',
    question: 'Prediction: If surface seawater temperature drops towards 0°C while salinity increases due to sea-ice brine rejection, what will happen to that water mass?',
    options: [
      'It will become extremely dense and sink to form deep abyssal bottom water.',
      'It will expand in volume and float buoyantly as a thin surface sheet.',
      'Its density will remain strictly unchanged because cooling cancels salt concentration.',
      'It will instantly boil and vaporize into atmospheric clouds.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 1, set Surface Temperature to -1°C and raise Salinity to verify that calculated density surges above 1028 kg/m³, triggering downward sinking.',
    explanation: 'Cold temperatures cause thermal contraction and high salinity adds dissolved mass per unit volume. Combined, cold and saline waters form the densest water on Earth (such as Antarctic Bottom Water).'
  },
  {
    id: 'pred_geo_02',
    question: 'Prediction: What tidal range will occur when the Moon is positioned at a 90° right angle (Quadrature) relative to the Earth-Sun alignment line?',
    options: [
      'Maximum tidal amplitude (Spring Tide) with record high tides.',
      'Minimum tidal amplitude (Neap Tide) because the gravitational pulls of the Sun and Moon partially cancel each other out.',
      'Zero tidal oscillations, leaving sea level perfectly stationary.',
      'Catastrophic ocean tsunamis across every coastal harbor.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 3, drag the Moon Orbital Position slider to 90° (Quarter Moon) to verify the Neap Tide condition and reduced tidal amplitude.',
    explanation: 'At quadrature (first and third quarter moons), the gravitational attraction of the Sun pulls at right angles to the Moon, dampening the tidal bulge and producing Neap Tides with the lowest tidal range.'
  }
];

// ─── OBSERVATION QUESTIONS ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_geo_01',
    question: 'Observation: Look at the vertical depth profile graph in Lab 1. Below 1,000 meters depth, what happens to the ocean temperature across equatorial, temperate, and polar basins alike?',
    observableOptions: [
      'It rises back up to 25°C due to Earth’s molten core.',
      'It becomes uniformly cold (2°C to 4°C) because dense polar-origin waters fill the abyssal depths globally.',
      'It fluctuates wildly between boiling and freezing every 6 hours.',
      'It drops below -20°C forming solid ice along the ocean floor.'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_GEO_021
  },
  {
    id: 'obs_geo_02',
    question: 'Observation: In the Ocean Currents simulation (Lab 2), what key environmental phenomenon develops where the warm Gulf Stream collides with the cold Labrador Current off Newfoundland?',
    observableOptions: [
      'Subsurface volcanic lava flows that scorch marine life.',
      'Intense turbulent mixing and nutrient upwelling, producing rich phytoplankton blooms and premier commercial fishing banks (Grand Banks).',
      'A permanent oceanic vortex that prevents all fish migration.',
      'Total chemical neutralization transforming seawater into pure fresh drinking water.'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_GEO_022
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7 Challenges) ---
  {
    id: 'ch_geo_001',
    nodeId: NODE_C11_GEO_021,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the globally accepted average salinity of open ocean water in parts per thousand (ppt or ‰)?',
    correctAnswer: 35,
    tolerance: 0.5,
    unit: 'ppt (‰)',
    explanation:
      'The average salinity of open ocean water is 35 ppt (parts per thousand), meaning approximately 35 grams of dissolved inorganic salts in every 1,000 grams of seawater. Sodium chloride (NaCl) makes up over 77% of this dissolved content.',
    hints: [
      'Think of how many grams of dissolved mineral salt exist in 1 kilogram of ocean water.',
      'It is a number between 30 and 40.',
      'The exact global mean standard value is thirty-five ppt.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_geo_002',
    nodeId: NODE_C11_GEO_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Identify the ocean layer characterized by a steep, rapid decrease in water temperature with increasing depth.',
    options: ['Epipelagic Mixed Layer', 'Thermocline', 'Halocline', 'Abyssal Isothermal Floor'],
    correctIndex: 1,
    explanation:
      'The thermocline is the boundary layer (typically between 100 m and 1,000 m) where ocean water temperature plummets rapidly before stabilizing into the uniformly cold (2°–4°C) deep ocean layer.',
    hints: [
      'The prefix "thermo-" refers to heat and temperature.',
      'It is analogous to the halocline (salinity gradient) and pycnocline (density gradient).',
      'The rapid drop in temperature marks the thermocline layer.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_geo_003',
    nodeId: NODE_C11_GEO_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Gulf Stream in the North Atlantic and the Kuroshio in the North Pacific are classified as which type of current?',
    options: [
      'Cold currents flowing equatorward from polar latitudes',
      'Warm currents flowing poleward from tropical/equatorial latitudes',
      'Deep abyssal density-driven turbidity flows',
      'Seasonal monsoon currents that reverse direction twice a year'
    ],
    correctIndex: 1,
    explanation:
      'Both the Gulf Stream and Kuroshio are western boundary warm currents. They transport vast amounts of thermal energy from warm tropical latitudes poleward, moderating coastal climates in northwest Europe and Japan.',
    hints: [
      'Look at their origin: both start in warm equatorial basins.',
      'Warm currents travel from low latitudes toward high latitudes.',
      'Therefore, both are classic warm ocean currents.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_geo_004',
    nodeId: NODE_C11_GEO_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Lindeman’s ecological efficiency rule (10% law), what percentage of energy is transferred from one trophic level to the next?',
    options: ['50%', '25%', '10%', '1%'],
    correctIndex: 2,
    explanation:
      'Lindeman’s 10% law states that on average only about 10% of the net energy captured at any trophic level is converted into biomass and transferred to the next trophic level; the remaining 90% is dissipated as metabolic heat and respiration.',
    hints: [
      'It is famously called the 10 percent rule of trophic energy transfer.',
      'Roughly one-tenth of the energy moves up.',
      'The value is exactly 10%.'
    ]
  },
  {
    id: 'ch_geo_005',
    nodeId: NODE_C11_GEO_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is an example of IN-SITU biodiversity conservation in India?',
    options: [
      'Jim Corbett National Park in Uttarakhand',
      'National Gene Bank at NBPGR, New Delhi',
      'Svalbard Global Seed Vault',
      'Alipore Zoological Gardens, Kolkata'
    ],
    correctIndex: 0,
    explanation:
      'In-situ conservation protects wild species within their natural evolutionary habitats (e.g., National Parks, Wildlife Sanctuaries, and Biosphere Reserves). Zoos, botanical gardens, and seed banks represent ex-situ conservation.',
    hints: [
      '"In-situ" literally means "on site" or in the wild habitat.',
      'National parks preserve entire ecosystems in nature.',
      'Jim Corbett National Park is a premier in-situ protected area.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_geo_006',
    nodeId: NODE_C11_GEO_025,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the four iconic global mountain systems to their respective continental locations.',
    dragItems: [
      { label: 'Andes Range', targetId: 'loc_south_america' },
      { label: 'Rocky Mountains', targetId: 'loc_north_america' },
      { label: 'Himalayan Arc', targetId: 'loc_asia' },
      { label: 'Alps System', targetId: 'loc_europe' }
    ],
    correctMapping: {
      loc_south_america: 'Andes Range',
      loc_north_america: 'Rocky Mountains',
      loc_asia: 'Himalayan Arc',
      loc_europe: 'Alps System'
    },
    explanation:
      'The Andes run along western South America, the Rockies form the western backbone of North America, the Himalayas guard northern South Asia, and the Alps span south-central Europe.',
    hints: [
      'The Andes form the longest continental mountain chain in South America.',
      'The Rockies dominate the western cordillera of the USA and Canada.',
      'The Himalayas crown the Indian subcontinent in Asia.'
    ]
  },
  {
    id: 'ch_geo_007',
    nodeId: NODE_C11_GEO_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'During which lunar phases do SPRING TIDES (maximum tidal range) occur?',
    options: [
      'First quarter and Third quarter half-moons (quadrature)',
      'New Moon (Syzygy Conjunction) and Full Moon (Syzygy Opposition)',
      'Only during a total solar eclipse at perihelion',
      'Every 14 days when the moon is at perigee regardless of phase'
    ],
    correctIndex: 1,
    explanation:
      'Spring tides occur when the gravitational pulls of the Sun and Moon reinforce each other along a straight line with the Earth (Syzygy), which happens during New Moon and Full Moon.',
    hints: [
      'Think about when the Sun, Moon, and Earth align in a straight 180° line.',
      'This alignment happens twice every lunar cycle: at New Moon and Full Moon.',
      'Select the option with New Moon and Full Moon (Syzygy).'
    ]
  },

  // --- STANDARD (8 Challenges) ---
  {
    id: 'ch_geo_008',
    nodeId: NODE_C11_GEO_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Contrast the Red Sea (~40 ppt) and the Baltic Sea (~7 ppt). What is the primary physical reason for this extreme salinity disparity?',
    options: [
      'Red Sea has high volcanic sulfur input; Baltic Sea has massive tidal mixing.',
      'Red Sea experiences intense evaporation with zero major river influx; Baltic Sea receives massive freshwater river runoff with low evaporation.',
      'Red Sea is situated near the polar vortex; Baltic Sea lies directly beneath the Intertropical Convergence Zone.',
      'Red Sea waters are cooled by deep upwelling; Baltic Sea is heated by hydrothermal ocean ridges.'
    ],
    correctIndex: 1,
    explanation:
      'The Red Sea sits in an arid subtropical zone with extreme evaporation, negligible rainfall, and no permanent rivers entering it. The Baltic Sea lies in a cool, humid climate where immense freshwater river discharge and low evaporation result in brackish salinity (~7 ppt).',
    hints: [
      'Consider the balance between Evaporation (E) and Freshwater Influx (P + Rivers).',
      'High E with no rivers leads to high salinity (Red Sea). High river influx with low E lowers salinity (Baltic).',
      'Look for the option contrasting high evaporation against massive river runoff.'
    ]
  },
  {
    id: 'ch_geo_009',
    nodeId: NODE_C11_GEO_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 10,000 kg sample of ocean surface water from the subtropical North Atlantic is evaporated to dryness. If its salinity is 36.5 ppt, how many kilograms of salt residue remain?',
    correctAnswer: 365,
    tolerance: 1,
    unit: 'kg',
    explanation:
      'Salinity of 36.5 ppt means 36.5 g per 1 kg (or 36.5 kg per 1,000 kg). For 10,000 kg of seawater: 10 × 36.5 kg = 365 kg of dry mineral salt residue.',
    hints: [
      '36.5 parts per thousand means 36.5 kg per 1,000 kg of seawater.',
      'Multiply 36.5 by 10 (since 10,000 / 1,000 = 10).',
      '36.5 × 10 = 365 kg.'
    ]
  },
  {
    id: 'ch_geo_010',
    nodeId: NODE_C11_GEO_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why are the world’s most prolific commercial fishing banks (e.g., Grand Banks of Newfoundland and off Hokkaido, Japan) situated at the confluence of warm and cold ocean currents?',
    options: [
      'The temperature clash stuns commercial fish, allowing easy capture by trawlers.',
      'Upwelling and turbulent mixing replenish dissolved oxygen and vital mineral nutrients, fueling explosive phytoplankton blooms that support dense fish populations.',
      'Cold water acts as a physical wall, permanently trapping migrating fish schools.',
      'Warm currents sterilize ocean parasites, allowing unhindered fish breeding.'
    ],
    correctIndex: 1,
    explanation:
      'Where warm and cold currents converge (e.g., Gulf Stream + Labrador Current at Grand Banks; Kuroshio + Oyashio off Japan), intense vertical mixing and nutrient upwelling fertilize massive phytoplankton growth, creating world-famous fishing grounds.',
    hints: [
      'Phytoplankton form the base of marine food webs and need sunlight and nutrients.',
      'Mixing of different water masses circulates deep nitrates and phosphates upward.',
      'Select the option highlighting nutrient replenishment and phytoplankton blooms.'
    ]
  },
  {
    id: 'ch_geo_011',
    nodeId: NODE_C11_GEO_022,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do the surface currents of the Northern Indian Ocean fundamentally differ from the permanent gyres of the Atlantic and Pacific Oceans?',
    options: [
      'They do not experience the Coriolis deflection because of proximity to the equator.',
      'They reverse their circulation direction semi-annually in direct response to the Southwest and Northeast Monsoon wind reversals.',
      'They are completely frozen for four months during the Siberian high-pressure winter.',
      'They maintain a single clockwise gyre year-round with no seasonal alteration.'
    ],
    correctIndex: 1,
    explanation:
      'Unlike the fixed circular gyres of the open Atlantic and Pacific, the North Indian Ocean surface currents reverse completely: flowing clockwise/eastward during the SW Monsoon, and counter-clockwise/westward during the NE Winter Monsoon.',
    hints: [
      'Think about the unique monsoon climate of South Asia.',
      'Winds reverse between summer (SW) and winter (NE).',
      'The ocean surface currents faithfully mirror this seasonal wind reversal.'
    ]
  },
  {
    id: 'ch_geo_012',
    nodeId: NODE_C11_GEO_023,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the trophic levels in order of energy flow and biomass accumulation from lowest (base) to highest (apex):',
    sortItems: [
      'Primary Producers (Phytoplankton & Forest Flora)',
      'Primary Consumers / Herbivores (Zooplankton, Insects, Deer)',
      'Secondary Consumers / Carnivores (Frogs, Small Fish, Jackals)',
      'Tertiary / Apex Predators (Tigers, Oceanic Sharks, Eagles)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Energy flow is strictly unidirectional: Solar photons → Autotrophic Producers → Primary Consumers → Secondary Consumers → Apex Carnivores.',
    hints: [
      'Start with organisms that capture solar energy through photosynthesis.',
      'Next come the herbivores that graze on those producers.',
      'Finish with the apex predators at the top of the pyramid.'
    ]
  },
  {
    id: 'ch_geo_013',
    nodeId: NODE_C11_GEO_024,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following is NOT one of the four internationally recognized Biodiversity Hotspots located in or partially extending into India?',
    options: ['Western Ghats', 'Himalayan Hotspot', 'Thar Desert Basin', 'Indo-Burma Region'],
    correctIndex: 2,
    explanation:
      'India hosts four recognized global biodiversity hotspots: (1) Western Ghats & Sri Lanka, (2) Himalayas, (3) Indo-Burma (Northeast India), and (4) Sundaland (Nicobar Islands). The Thar Desert, while ecologically unique, is not a designated global biodiversity hotspot.',
    hints: [
      'Hotspots require extraordinary species endemism and severe habitat loss (>70%).',
      'The four hotspots are Western Ghats, Himalayas, Indo-Burma, and Sundaland.',
      'The Thar Desert is an arid biome, not a biodiversity hotspot.'
    ]
  },
  {
    id: 'ch_geo_014',
    nodeId: NODE_C11_GEO_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The Atacama Desert in Chile is the driest non-polar desert on Earth. Which ocean current is primarily responsible for desiccating its coastal air?',
    options: ['Warm Brazil Current', 'Cold Humboldt (Peru) Current', 'Warm Kuroshio Current', 'Warm North Atlantic Drift'],
    correctIndex: 1,
    explanation:
      'The cold Humboldt (Peru) Current chills the lower maritime air mass, creating strong atmospheric temperature inversions that prevent vertical convection, cloud formation, and precipitation over coastal Chile and Peru.',
    hints: [
      'Cold offshore currents suppress evaporation and cloud development.',
      'This cold current runs along western South America.',
      'It is named the Peru or Humboldt Current.'
    ]
  },
  {
    id: 'ch_geo_015',
    nodeId: NODE_C11_GEO_021,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the precise combination of physical factors that produces the MAXIMUM seawater density capable of sinking to form deep Antarctic Bottom Water (AABW):',
    availableParts: ['Low Temperature (Near Freezing)', 'High Temperature', 'High Salinity (Brine Rejection)', 'Low Salinity', 'High Hydrostatic Pressure'],
    targetState: 'Low Temperature (Near Freezing) + High Salinity (Brine Rejection) + High Hydrostatic Pressure',
    validationHint: 'Select the temperature, salinity, and pressure states that together maximize water mass density.',
    explanation:
      'Maximum ocean density occurs when seawater is coldest (thermal contraction), most saline (salt mass concentration during sea-ice freezing), and subjected to deep hydrostatic compression.',
    hints: [
      'Cold water is denser than warm water.',
      'High salt concentration increases mass per unit volume.',
      'Deep ocean pressure further compresses seawater.'
    ],
    misconceptionIndex: 2
  },

  // --- ADVANCED (7 Challenges) ---
  {
    id: 'ch_geo_016',
    nodeId: NODE_C11_GEO_021,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Evaluate the role of the Pycnocline (density gradient) as a physical barrier in tropical and temperate oceans. What is its direct biogeochemical consequence?',
    options: [
      'It allows instantaneous vertical nutrient transfer from abyssal sediments to the photic zone.',
      'It prevents vertical turbulent mixing, trapping regenerated nutrients in the dark deep ocean while surface phytoplankton become nutrient-starved.',
      'It stops sound waves from traveling across ocean basins.',
      'It forces surface water to freeze before the air temperature reaches 0°C.'
    ],
    correctIndex: 1,
    explanation:
      'The pycnocline forms a steep density barrier separating warm, light surface water from cold, dense deep water. This prevents vertical mixing, locking organic nutrients (nitrates/phosphates) in the abyss and leaving the tropical surface layer nutrient-depleted unless upwelling occurs.',
    hints: [
      'Think about density stratification: light water floats on dense water without mixing.',
      'Without mixing, dead biological matter sinking to the deep cannot easily return to the surface.',
      'Select the answer highlighting nutrient entrapment and lack of vertical mixing.'
    ]
  },
  {
    id: 'ch_geo_017',
    nodeId: NODE_C11_GEO_022,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During an El Niño Southern Oscillation (ENSO) event, what chain of ocean-atmosphere anomalies occurs across the Pacific basin?',
    options: [
      'Trade winds strengthen; Peru upwelling surges; severe flooding strikes Australia.',
      'Trade winds weaken or reverse; warm western Pacific pool surges eastward toward South America; Peruvian cold upwelling is suppressed, devastating anchovy fisheries and causing severe Peruvian floods and Indian droughts.',
      'Arctic sea ice breaks off and flows into the equatorial Pacific, dropping sea surface temperatures by 15°C.',
      'The Kuroshio current reverses its course and flows directly into San Francisco Bay.'
    ],
    correctIndex: 1,
    explanation:
      'El Niño represents a breakdown of normal Walker circulation: trade winds collapse, warm equatorial water sloshes eastward toward Ecuador and Peru, the thermocline deepens in the east, shutting down nutrient-rich upwelling and triggering global climatic disruptions including Indian monsoon deficits.',
    hints: [
      'El Niño is characterized by abnormal warming in the eastern equatorial Pacific.',
      'Trade winds weaken, stopping cold, nutrient-rich upwelling off South America.',
      'This brings floods to coastal Peru and drought/monsoon failure to Asia/India.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_geo_018',
    nodeId: NODE_C11_GEO_023,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a grassland ecosystem, autotrophic grasses capture 40,000 kJ of solar net primary productivity. According to the 10% law, how many kilojoules of energy reach the tertiary consumer (e.g., Hawk)?',
    correctAnswer: 40,
    tolerance: 0,
    unit: 'kJ',
    explanation:
      'Trophic Level 1 (Producers): 40,000 kJ → Level 2 (Herbivores): 4,000 kJ (10%) → Level 3 (Secondary Consumers/Frogs): 400 kJ (10%) → Level 4 (Tertiary Consumers/Hawks): 40 kJ (10%).',
    hints: [
      'Level 1 = 40,000 kJ.',
      'Divide by 10 for each successive step: Level 2 = 4,000; Level 3 = 400...',
      'Level 4 (tertiary consumer) receives 400 / 10 = 40 kJ.'
    ]
  },
  {
    id: 'ch_geo_019',
    nodeId: NODE_C11_GEO_024,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does habitat fragmentation pose a substantially greater extinction risk to endemic species than regulated poaching alone?',
    options: [
      'Fragmentation immediately converts all tropical rainforest trees into invasive weed species.',
      'Fragmentation creates isolated sub-populations, inducing inbreeding depression, genetic drift, severe edge effects, and total barrier to seasonal altitudinal migration.',
      'Poaching only affects cold-blooded reptiles while habitat loss only affects birds.',
      'Fragmented forest edges absorb more carbon dioxide, causing oxygen starvation among canopy mammals.'
    ],
    correctIndex: 1,
    explanation:
      'Habitat fragmentation divides large continuous ecosystems into tiny patches. This creates edge degradation, restricts gene flow, causes inbreeding, reduces genetic resilience, and prevents wildlife from migrating across altitudinal or thermal gradients.',
    hints: [
      'Consider genetic diversity and gene pool isolation in small populations.',
      'Think about edge effects and migratory bottlenecks.',
      'Choose the option explaining isolated sub-populations and inbreeding depression.'
    ]
  },
  {
    id: 'ch_geo_020',
    nodeId: NODE_C11_GEO_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The Pacific "Ring of Fire" accounts for over 75% of the world’s active volcanoes and 90% of all earthquakes. Which plate tectonic mechanism is responsible?',
    options: [
      'Continental rifting and seafloor spreading across peaceful divergence boundaries.',
      'Widespread subduction of dense oceanic plates (Pacific, Nazca, Philippine) beneath surrounding continental and island arc plates, generating intense magma generation and seismic slip.',
      'Massive gravitational tidal pull from the Moon causing crustal deformation only in the Pacific basin.',
      'Deep mantle plumes stationary beneath Hawaii that expand across all 40,000 km of the Pacific perimeter.'
    ],
    correctIndex: 1,
    explanation:
      'The circum-Pacific belt is dominated by convergent subduction boundaries where oceanic plates sink into the asthenosphere, melting to form explosive volcanic arcs (Andes, Cascades, Japan, Philippines) and generating powerful megathrust earthquakes.',
    hints: [
      'The Ring of Fire is bordered by deep trenches and island arcs.',
      'Dense oceanic lithosphere dives under lighter continental margins.',
      'This subduction process melts rock and produces seismic ruptures.'
    ]
  },
  {
    id: 'ch_geo_021_b',
    nodeId: NODE_C11_GEO_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under India’s Biological Diversity Act, 2002, what is the mandatory statutory mandate of the National Biodiversity Authority (NBA)?',
    options: [
      'To privatize wild tiger sanctuaries and commercialize forest timber logging.',
      'To regulate access to India’s biological resources, prevent biopiracy, and ensure fair and equitable benefit-sharing with local indigenous conservators.',
      'To eradicate all non-crop vegetation in protected wildlife reserves.',
      'To import invasive exotic flora like Lantana camara to increase vegetative ground cover.'
    ],
    correctIndex: 1,
    explanation:
      'The Biological Diversity Act, 2002 established the NBA to implement the UN Convention on Biological Diversity (CBD) principles: conservation of biological diversity, sustainable use of its components, and equitable sharing of benefits arising from genetic resources.',
    hints: [
      'The Act guards against biopiracy and exploitation of indigenous traditional knowledge.',
      'Benefit-sharing with tribal and rural communities is central.',
      'Select the option focusing on access regulation and fair benefit-sharing.'
    ]
  },
  {
    id: 'ch_geo_022_b',
    nodeId: NODE_C11_GEO_022,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The semi-diurnal tidal period between two successive high tides at a coastal port (e.g., Mumbai Harbor) is approximately 12 hours and how many minutes due to the lunar orbital progression?',
    correctAnswer: 25,
    tolerance: 1,
    unit: 'minutes (12h 25m)',
    explanation:
      'Because the Moon orbits Earth in the same direction Earth rotates, a point on Earth takes approximately 24 hours and 50 minutes to realign with the Moon (lunar day). Thus, the interval between two successive semi-diurnal high tides is exactly half that: 12 hours and 25 minutes.',
    hints: [
      'A full lunar day is 24 hours and 50 minutes.',
      'Divide the 50 extra minutes by two for the semi-diurnal interval.',
      'The answer is 25 minutes.'
    ]
  }
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Ocean Stratification Engine',
    instruction: 'Adjust Salinity (ppt) and Temperature (°C) sliders to see the real-time effect on seawater density and depth layering (Thermocline & Halocline).',
    interactionType: 'slider-stratification',
    nodeId: NODE_C11_GEO_021
  },
  {
    title: 'Lab 2: Global Currents & Gyre Confluence',
    instruction: 'Select different world currents (Gulf Stream, Labrador, Kuroshio) to inspect their temperature characteristics, climate influence, and fishing bank confluences.',
    interactionType: 'click-currents',
    nodeId: NODE_C11_GEO_022
  },
  {
    title: 'Lab 3: Astronomical Tide Simulator',
    instruction: 'Rotate the Moon around Earth to create Syzygy (Spring Tide alignment) and Quadrature (Neap Tide right-angle) and observe ocean tidal bulges.',
    interactionType: 'tide-orbit',
    nodeId: NODE_C11_GEO_022
  },
  {
    title: 'Lab 4: Trophic Energy Pyramid (10% Law)',
    instruction: 'Input the solar primary energy captured by producers and calculate the progressive energy dissipation across trophic consumer tiers.',
    interactionType: 'energy-pyramid',
    nodeId: NODE_C11_GEO_023
  },
  {
    title: 'Lab 5: India Biodiversity Hotspots & Conservation Matrix',
    instruction: 'Click on India’s four biodiversity hotspots to explore endemic flagship species (Nilgiri Tahr, Snow Leopard) and evaluate In-situ vs Ex-situ reserves.',
    interactionType: 'hotspot-explorer',
    nodeId: NODE_C11_GEO_024
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Senior Biogeographer Practicum: Coastal & Ecological Impact Assessment',
  description:
    'Synthesize your field research: Choose any coastal ecosystem in India (e.g., Gulf of Mannar, Sundarbans Delta, or Chilika Lagoon). Analyze how salinity shifts, monsoon-driven currents, and local trophic chains intersect with human conservation policies under the Biological Diversity Act, 2002.',
  steps: [
    'Select a study zone: Sunderbans (West Bengal), Gulf of Mannar (Tamil Nadu), or Vembanad (Kerala).',
    'Map seasonal salinity variations: High evaporation during pre-monsoon vs heavy river freshwater discharge during monsoon.',
    'Diagram a 4-tier trophic food web (Mangrove detritus/Phytoplankton → Crustaceans → Fish → Royal Bengal Tiger / Estuarine Crocodile).',
    'Evaluate In-situ conservation effectiveness: National Park buffer zones vs eco-tourism pressures.',
    'Formulate a 3-point conservation action plan for the local Biodiversity Management Committee (BMC).'
  ]
};

// ─── COMPONENT PROPS INTERFACE ───
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_GEO_021,
  title: 'Ocean Water, Currents, Biosphere & World Physical Geography',
  definition:
    'A comprehensive exploration of ocean salinity, thermal structure, density-driven thermohaline circulation, current gyres, lunar-solar tides, trophic energy flow in ecosystems, biodiversity conservation in India, and global physical map landmarks.',
  misconceptions: [
    {
      misconception: 'The Equator has the highest ocean salinity because it receives the hottest sunlight.',
      correction:
        'Subtropical belts (20°–30° N/S) have the highest salinity because evaporation vastly exceeds precipitation there, whereas the Equator receives heavy daily rain that dilutes surface waters.'
    },
    {
      misconception: 'Ocean water temperature drops at a steady, linear rate from the surface to the abyssal plain.',
      correction:
        'Temperature drops steeply within a narrow zone called the Thermocline (100–1,000 m); below this, deep water is uniformly cold (2°–4°C) across all latitudes.'
    },
    {
      misconception: 'Higher water temperature makes seawater denser.',
      correction:
        'Warm water expands, lowering its density. The densest water is cold, saline, and under high hydrostatic pressure.'
    },
    {
      misconception: 'Zoos, botanical gardens, and seed vaults are forms of in-situ conservation.',
      correction:
        'Zoos and seed vaults are EX-SITU conservation (outside natural habitats). In-situ conservation occurs inside natural reserves like National Parks and Biosphere Reserves.'
    },
    {
      misconception: 'Tides are caused solely by the gravitational pull of the Moon.',
      correction:
        'Tides result from the combined gravitational interactions of both the Moon (primary) and the Sun (secondary), producing spring tides when aligned and neap tides at right angles.'
    }
  ]
};

function C11_GeographyOceanWaterSalinitySim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_GEO_021,
    title = DEFAULT_PROPS.title || 'Ocean Water, Currents & Biosphere Simulation',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete
  } = props;

  const subjectConfig = SUBJECT_CONFIG['geography'] || {
    name: 'Geography (Class 11 ISC)',
    emoji: '🌊',
    color: 'sky'
  };

  // State Variables
  const [phase, setPhase] = useState<'discovery' | 'prediction' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Prediction Phase State
  const [predictionIndex, setPredictionIndex] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionAnswered, setPredictionAnswered] = useState(false);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive Lab Sliders & Controls
  const [simSalinity, setSimSalinity] = useState<number>(35);
  const [simTemperature, setSimTemperature] = useState<number>(20);
  const [simDepth, setSimDepth] = useState<number>(200);
  const [simEvaporation, setSimEvaporation] = useState<number>(50);
  const [simPrecipitation, setSimPrecipitation] = useState<number>(50);
  const [simRiverRunoff, setSimRiverRunoff] = useState<number>(20);
  const [simMoonAngle, setSimMoonAngle] = useState<number>(0);
  const [simSunEnergy, setSimSunEnergy] = useState<number>(100000);

  // Selection State
  const [selectedCurrentId, setSelectedCurrentId] = useState<string>('gulf_stream');
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('western_ghats');

  // Drag & Sort & Numeric States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Feedback Visuals States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived Calculations
  const calculatedDensity = useMemo(() => {
    const base = 1000 + simSalinity * 0.78 - (simTemperature - 4) * 0.22 + (simDepth / 1000) * 4.5;
    return parseFloat(base.toFixed(2));
  }, [simSalinity, simTemperature, simDepth]);

  const netSurfaceSalinity = useMemo(() => {
    const delta = (simEvaporation - 50) * 0.15 - (simPrecipitation - 50) * 0.12 - (simRiverRunoff - 20) * 0.08;
    return parseFloat(Math.max(5, Math.min(44, 35 + delta)).toFixed(1));
  }, [simEvaporation, simPrecipitation, simRiverRunoff]);

  const oceanProfileData = useMemo(() => {
    const depths = [0, 50, 100, 200, 400, 600, 800, 1000, 1500, 2000, 3000, 4000];
    return depths.map((d) => {
      let temp = 2;
      if (d <= 100) temp = simTemperature;
      else if (d <= 1000) {
        const factor = (d - 100) / 900;
        temp = simTemperature - factor * (simTemperature - 3.5);
      } else {
        temp = Math.max(1.8, 3.5 - ((d - 1000) / 3000) * 1.5);
      }

      let sal = 34.8;
      if (d <= 100) sal = netSurfaceSalinity;
      else if (d <= 1000) {
        const factor = (d - 100) / 900;
        sal = netSurfaceSalinity - factor * (netSurfaceSalinity - 34.7);
      } else {
        sal = 34.7 + ((d - 1000) / 3000) * 0.2;
      }

      const dens = 1000 + sal * 0.78 - (temp - 4) * 0.2 + (d / 1000) * 4.5;

      return {
        depth: d,
        temperature: parseFloat(temp.toFixed(1)),
        salinity: parseFloat(sal.toFixed(1)),
        density: parseFloat(dens.toFixed(1))
      };
    });
  }, [simTemperature, netSurfaceSalinity]);

  const tidalStatus = useMemo(() => {
    const deg = simMoonAngle % 180;
    if (deg <= 15 || deg >= 165) {
      return { type: 'Spring Tide (Syzygy)', amplitude: 'Maximum (High High-Tide / Low Low-Tide)', multiplier: 1.4 };
    } else if (deg >= 75 && deg <= 105) {
      return { type: 'Neap Tide (Quadrature)', amplitude: 'Minimum (Reduced Tidal Range)', multiplier: 0.7 };
    }
    return { type: 'Intermediate Tide', amplitude: 'Moderate Range', multiplier: 1.0 };
  }, [simMoonAngle]);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Motivational message & SRS calculation
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Flawless Earth-system mastery.';
    if (errors >= 1 && errors <= 3) return 'Great work! Strong analytical understanding.';
    if (errors >= 4 && errors <= 7) return 'Good effort! Keep reviewing core thermodynamic concepts.';
    return 'Do not give up — You WILL get this with deliberate practice!';
  }, [errors]);

  const srsScheduleInfo = useMemo(() => {
    if (errors === 0) {
      return {
        days: 7,
        label: '7 Days (Optimal Retention)',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-600',
        recommendation: 'You have demonstrated full conceptual mastery. Next Spaced Repetition (SRS) review is scheduled in 7 days.'
      };
    } else if (errors <= 3) {
      return {
        days: 3,
        label: '3 Days (Consolidation Needed)',
        badgeColor: 'bg-sky-950 text-sky-300 border-sky-600',
        recommendation: 'Good conceptual grasp with minor slips. Next Spaced Repetition (SRS) review is scheduled in 3 days to lock in memory.'
      };
    } else {
      return {
        days: 1,
        label: '1 Day (Targeted Remediation)',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-600',
        recommendation: 'Foundational review required. Next Spaced Repetition (SRS) review is scheduled in 1 day for optimal reinforcement.'
      };
    }
  }, [errors]);

  // Effects
  useEffect(() => {
    const saved = getNodeMastery(nodeId);
    if (saved && saved.bestScore > 0) {
      if (saved.bestScore >= 80) setDifficulty('advanced');
      else if (saved.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newTier =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newTier) {
        setCurrentChallenge(0);
        return newTier;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; speed: number; radius: number; color: string }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        radius: 1.5 + Math.random() * 2,
        color: i % 2 === 0 ? '#38bdf8' : '#f43f5e'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#0284c7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(10, canvas.height * 0.3);
      ctx.bezierCurveTo(canvas.width * 0.4, 10, canvas.width * 0.6, canvas.height * 0.9, canvas.width - 10, canvas.height * 0.5);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 4;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > canvas.width) {
          p.x = 0;
          p.y = Math.random() * canvas.height;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
      inactivityTimerRef.current = setTimeout(() => {
        if (activeChallenge.hints && activeChallenge.hints[0]) {
          setCurrentHint(activeChallenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Need a nudge? Here is a hint.');
        }
      }, 12000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, answerRevealed, hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
  }, []);

  const handleDiscoveryAnswer = useCallback(
    (index: number) => {
      resetInactivityTimer();
      const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
      setDiscoveryCorrect(isCorrect);
      setDiscoveryAnswered(true);
      if (isCorrect) {
        audioManager.play('success');
        speechManager.speak('Spot on! Let us understand the full physical geography behind this.');
      } else {
        audioManager.play('pop');
        speechManager.speak(DISCOVERY_QUESTION.hintAfter);
      }
    },
    [resetInactivityTimer]
  );

  const handleAdvanceToPrediction = useCallback(() => {
    resetInactivityTimer();
    setPhase('prediction');
    setPredictionIndex(0);
    setPredictionSelected(null);
    setPredictionAnswered(false);
    audioManager.play('whoosh');
  }, [resetInactivityTimer]);

  const handlePredictionAnswer = useCallback((index: number) => {
    resetInactivityTimer();
    setPredictionSelected(index);
    setPredictionAnswered(true);
    const activePred = PREDICTION_QUESTIONS[predictionIndex];
    if (index === activePred.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Great prediction! Now let us verify it.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Interesting intuition! Check how the simulation behaves.');
    }
  }, [predictionIndex, resetInactivityTimer]);

  const handleNextPrediction = useCallback(() => {
    if (predictionIndex + 1 < PREDICTION_QUESTIONS.length) {
      setPredictionIndex((prev) => prev + 1);
      setPredictionSelected(null);
      setPredictionAnswered(false);
      audioManager.play('tap');
    } else {
      setPhase('explore');
      audioManager.play('whoosh');
    }
  }, [predictionIndex]);

  const handleAdvanceToExploration = useCallback(() => {
    resetInactivityTimer();
    setPhase('explore');
    audioManager.play('whoosh');
  }, [resetInactivityTimer]);

  const handleAdvanceToSandbox = useCallback(() => {
    resetInactivityTimer();
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, [resetInactivityTimer]);

  const handleAdvanceToChallenge = useCallback(() => {
    resetInactivityTimer();
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
  }, [resetInactivityTimer]);

  const showNextHint = useCallback(() => {
    resetInactivityTimer();
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && activeChallenge.hints[nextLvl - 1]) {
      setCurrentHint(activeChallenge.hints[nextLvl - 1]);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLvl - 1]);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      speechManager.speak('Here is the full geographical explanation.');
    }
  }, [hintCount, activeChallenge, resetInactivityTimer]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You achieved a final score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    resetInactivityTimer();
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setRevealedSteps(0);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleCompleteSimulation();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation, resetInactivityTimer]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      resetInactivityTimer();
      let isCorrect = false;

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Geographically accurate! Excellent reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
    },
    [activeChallenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let arr = prev.length > 0 ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
        const [item] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, item);
        return arr;
      });
    },
    [activeChallenge]
  );

  const handleSortSubmit = useCallback(() => {
    const finalOrder =
      sortArrangement.length > 0
        ? sortArrangement
        : activeChallenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(finalOrder);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="text-4xl p-2 bg-sky-950/70 border border-sky-600 rounded-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-900/60 text-sky-400 border border-sky-700">
                ISC Class 11 Geography
              </span>
              <span className="text-xs text-slate-400 font-mono">BKT: {masteryLevel}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-1">{title}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(['discovery', 'prediction', 'explore', 'sandbox', 'challenge'] as const).map((pStep) => (
            <motion.button
              key={pStep}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Navigate to ${pStep} mode`}
              onClick={() => {
                setPhase(pStep);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                phase === pStep
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/40 border border-sky-400'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-750 border border-slate-700'
              }`}
            >
              {pStep}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-sky-950/80 via-slate-900 to-indigo-950/80 rounded-3xl border border-sky-800/60 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🚢</span>
              <h2 className="text-lg font-bold text-sky-300">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-sky-900/40 text-xs text-sky-200/80">
              {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xl font-bold">⚡ Curiosity Hook:</span>
              <span className="text-xs text-slate-400">(Low-stakes discovery test)</span>
            </div>
            <h3 className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Discovery option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-900/50 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-sky-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                  {opt}
                  {discoveryAnswered && (
                    <span className="ml-2 font-bold font-mono">
                      {i === DISCOVERY_QUESTION.correctIndex ? ' ✓' : ' ✗'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 rounded-2xl bg-sky-950/40 border border-sky-800/80 space-y-3"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Outstanding intuition! Equatorial precipitation dilutes salts, while dry subtropical highs concentrate them.'
                    : `💡 ✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Enter Prediction Arena"
                    onClick={handleAdvanceToPrediction}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                  >
                    Start Predict-then-Check Arena →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 1.5. PREDICTION PHASE (Predict-then-Check Pattern) ─── */}
      {phase === 'prediction' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔮</span>
                <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
                  Prediction Challenge {predictionIndex + 1} of {PREDICTION_QUESTIONS.length}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Predict-then-Check</span>
            </div>

            <h3 className="text-base font-bold text-white">
              {PREDICTION_QUESTIONS[predictionIndex].question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {PREDICTION_QUESTIONS[predictionIndex].options.map((opt, idx) => {
                const isSelected = predictionSelected === idx;
                const isCorrect = idx === PREDICTION_QUESTIONS[predictionIndex].correctIndex;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePredictionAnswer(idx)}
                    disabled={predictionAnswered}
                    className={`p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                      predictionAnswered
                        ? isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : isSelected
                          ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-indigo-400 mr-2">[{String.fromCharCode(65 + idx)}]</span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {predictionAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/80 space-y-3"
              >
                <div className="text-xs font-bold text-indigo-300 uppercase">
                  Verification Instruction:
                </div>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-indigo-900/50">
                  🔍 {PREDICTION_QUESTIONS[predictionIndex].verifyInstruction}
                </p>
                <p className="text-xs text-slate-400">
                  {PREDICTION_QUESTIONS[predictionIndex].explanation}
                </p>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextPrediction}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                  >
                    {predictionIndex + 1 < PREDICTION_QUESTIONS.length
                      ? 'Next Prediction →'
                      : 'Enter Interactive Laboratories →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-sky-400 font-bold uppercase">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                aria-label="Previous laboratory module"
                onClick={() => {
                  setCurrentSlide((s) => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs rounded-xl font-bold"
              >
                ← Prev Lab
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Free Sandbox Mode' : 'Next laboratory module'}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('tap');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs rounded-xl font-bold shadow-md"
              >
                {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Free Sandbox Mode →' : 'Next Lab →'}
              </motion.button>
            </div>
          </div>

          <p className="text-xs text-amber-300/90 font-medium bg-amber-950/30 px-4 py-2 rounded-xl border border-amber-800/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              {/* LAB 1: SALINITY & TEMPERATURE STRATIFICATION */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-bold">Surface Temperature (°C)</span>
                        <span className="text-sky-400 font-mono font-bold">{simTemperature} °C</span>
                      </div>
                      <input
                        type="range"
                        min={-2}
                        max={30}
                        step={1}
                        aria-label="Surface temperature slider in degrees Celsius"
                        value={simTemperature}
                        onChange={(e) => {
                          setSimTemperature(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-bold">Evaporation vs Rain Balance</span>
                        <span className="text-amber-400 font-mono font-bold">{netSurfaceSalinity} ppt</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-400" htmlFor="evap-slider">Evaporation Rate</label>
                          <input
                            id="evap-slider"
                            type="range"
                            min={0}
                            max={100}
                            aria-label="Evaporation rate control slider"
                            value={simEvaporation}
                            onChange={(e) => setSimEvaporation(Number(e.target.value))}
                            className="w-full accent-amber-500 cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400" htmlFor="precip-slider">Precipitation Rate</label>
                          <input
                            id="precip-slider"
                            type="range"
                            min={0}
                            max={100}
                            aria-label="Precipitation rate control slider"
                            value={simPrecipitation}
                            onChange={(e) => setSimPrecipitation(Number(e.target.value))}
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-sky-950/60 to-indigo-950/60 rounded-2xl border border-sky-800/50 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-sky-300 uppercase tracking-wider font-bold">
                          Calculated Seawater Density
                        </span>
                        <div className="text-2xl font-black text-white font-mono mt-0.5">
                          {calculatedDensity} <span className="text-xs font-normal text-slate-400">kg/m³</span>
                        </div>
                      </div>
                      <div
                        className={`text-xs px-3 py-1 rounded-xl font-bold ${
                          calculatedDensity > 1027.5
                            ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600'
                            : 'bg-amber-900/60 text-amber-300 border border-amber-600'
                        }`}
                      >
                        {calculatedDensity > 1027.5 ? '✓ Dense (Sinks Deep)' : '⚠ Buoyant (Floats)'}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-300">
                        Vertical Ocean Depth Profile (0–4000 m)
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Thermocline & Halocline Layering
                      </span>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={oceanProfileData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="depth" stroke="#64748b" fontSize={10} unit="m" />
                          <YAxis yAxisId="left" stroke="#38bdf8" fontSize={10} domain={[0, 32]} unit="°C" />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#f59e0b"
                            fontSize={10}
                            domain={[30, 42]}
                            unit="ppt"
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#0f172a',
                              borderColor: '#334155',
                              borderRadius: '12px',
                              fontSize: '11px'
                            }}
                          />
                          <Legend wrapperStyle={{ fontSize: '11px' }} />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="temperature"
                            stroke="#38bdf8"
                            strokeWidth={2}
                            name="Temp (°C)"
                            dot={false}
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="salinity"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            name="Salinity (ppt)"
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: OCEAN CURRENTS */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'gulf_stream', name: 'Gulf Stream', type: 'Warm', ocean: 'N. Atlantic' },
                      { id: 'labrador', name: 'Labrador Current', type: 'Cold', ocean: 'N. Atlantic' },
                      { id: 'kuroshio', name: 'Kuroshio', type: 'Warm', ocean: 'N. Pacific' },
                      { id: 'oyashio', name: 'Oyashio', type: 'Cold', ocean: 'N. Pacific' }
                    ].map((c) => (
                      <motion.button
                        key={c.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Inspect ${c.name} ${c.type} Current in the ${c.ocean}`}
                        onClick={() => setSelectedCurrentId(c.id)}
                        className={`p-3 rounded-2xl text-left border transition-all ${
                          selectedCurrentId === c.id
                            ? 'bg-sky-950/80 border-sky-500 shadow-md shadow-sky-600/30'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white">{c.name}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              c.type === 'Warm' ? 'bg-rose-900/60 text-rose-300' : 'bg-sky-900/60 text-sky-300'
                            }`}
                          >
                            {c.type === 'Warm' ? '♨ Warm' : '❄ Cold'}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500">{c.ocean}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 relative overflow-hidden">
                    <svg viewBox="0 0 700 280" className="w-full h-auto">
                      <path
                        d="M 50 40 Q 120 20 180 50 Q 160 120 130 160 Q 180 220 140 260 L 60 250 Z"
                        fill="#1e293b"
                        stroke="#334155"
                        strokeWidth="1.5"
                      />
                      <text x="90" y="100" fill="#64748b" fontSize="10" fontWeight="bold">
                        North America
                      </text>
                      <text x="90" y="220" fill="#64748b" fontSize="10" fontWeight="bold">
                        South America
                      </text>

                      <path
                        d="M 320 30 Q 420 20 480 60 Q 460 140 380 160 L 320 120 Z"
                        fill="#1e293b"
                        stroke="#334155"
                        strokeWidth="1.5"
                      />
                      <text x="360" y="70" fill="#64748b" fontSize="10" fontWeight="bold">
                        Eurasia
                      </text>

                      <path
                        d="M 330 150 Q 420 160 410 260 Q 340 270 320 200 Z"
                        fill="#1e293b"
                        stroke="#334155"
                        strokeWidth="1.5"
                      />
                      <text x="350" y="210" fill="#64748b" fontSize="10" fontWeight="bold">
                        Africa
                      </text>

                      <motion.path
                        d="M 140 120 Q 200 80 330 50"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth={selectedCurrentId === 'gulf_stream' ? 4 : 2}
                        strokeDasharray="6 4"
                        animate={{ strokeDashoffset: [0, -20] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      />
                      <text x="210" y="70" fill="#f43f5e" fontSize="9" fontWeight="bold">
                        Gulf Stream → North Atlantic Drift
                      </text>

                      <motion.path
                        d="M 160 30 Q 170 80 150 110"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth={selectedCurrentId === 'labrador' ? 4 : 2}
                        strokeDasharray="6 4"
                        animate={{ strokeDashoffset: [0, 20] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      />
                      <text x="110" y="45" fill="#38bdf8" fontSize="9" fontWeight="bold">
                        Labrador (Cold)
                      </text>

                      <circle cx="150" cy="110" r="10" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" />
                      <text x="165" y="115" fill="#fbbf24" fontSize="9" fontWeight="bold">
                        Grand Banks Fishing Zone 🐟
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* LAB 3: TIDE SIMULATOR */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-bold">Moon Orbital Position</span>
                        <span className="text-amber-400 font-mono font-bold">{simMoonAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        step={5}
                        aria-label="Moon orbital position in degrees"
                        value={simMoonAngle}
                        onChange={(e) => setSimMoonAngle(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>0° (New Moon)</span>
                        <span>90° (Quarter)</span>
                        <span>180° (Full Moon)</span>
                        <span>270° (Quarter)</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-indigo-950/60 to-slate-950 rounded-2xl border border-indigo-800/60 space-y-2">
                      <div className="text-xs font-bold text-indigo-300">{tidalStatus.type}</div>
                      <div className="text-sm font-semibold text-white">{tidalStatus.amplitude}</div>
                      <p className="text-[11px] text-slate-400">
                        {tidalStatus.type.includes('Spring')
                          ? 'Sun, Moon, and Earth are aligned (Syzygy). Gravitational vectors add together for maximum tidal bulge.'
                          : 'Sun and Moon exert gravitational pull at right angles (Quadrature). Tidal forces cancel out partially.'}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 320 220" className="w-full max-w-sm">
                      <circle cx="20" cy="110" r="16" fill="#f59e0b" />
                      <text x="20" y="140" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">
                        SUN
                      </text>

                      <circle cx="170" cy="110" r="30" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                      <text x="170" y="114" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">
                        EARTH
                      </text>

                      <ellipse
                        cx="170"
                        cy="110"
                        rx={32 * tidalStatus.multiplier}
                        ry={28 / tidalStatus.multiplier}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        transform={`rotate(${simMoonAngle}, 170, 110)`}
                      />

                      <circle cx="170" cy="110" r="70" fill="none" stroke="#334155" strokeDasharray="3 3" />

                      {(() => {
                        const rad = (simMoonAngle * Math.PI) / 180;
                        const mx = 170 + 70 * Math.cos(rad);
                        const my = 110 + 70 * Math.sin(rad);
                        return (
                          <g>
                            <circle cx={mx} cy={my} r="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                            <text x={mx} y={my + 3} fill="#0f172a" fontSize="6" textAnchor="middle" fontWeight="bold">
                              🌕
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
              )}

              {/* LAB 4: TROPHIC ENERGY PYRAMID */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-300 font-bold">Input Net Primary Solar Energy (Joules):</span>
                    <input
                      type="number"
                      aria-label="Input Net Primary Solar Energy in Joules"
                      value={simSunEnergy}
                      onChange={(e) => setSimSunEnergy(Math.max(1000, Number(e.target.value)))}
                      className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-xl text-xs text-amber-400 font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-2 max-w-lg mx-auto pt-2">
                    {[
                      { level: 'Apex Carnivore (Tiger / Eagle)', factor: 0.001, color: 'bg-rose-900/80 border-rose-500' },
                      { level: 'Secondary Consumer (Frogs / Small Fish)', factor: 0.01, color: 'bg-amber-900/80 border-amber-500' },
                      { level: 'Primary Consumer (Herbivores / Zooplankton)', factor: 0.1, color: 'bg-sky-900/80 border-sky-500' },
                      { level: 'Primary Producer (Forest Trees / Phytoplankton)', factor: 1.0, color: 'bg-emerald-900/80 border-emerald-500' }
                    ].map((t, idx) => {
                      const energy = (simSunEnergy * t.factor).toLocaleString();
                      const widthPct = Math.max(25, 100 - idx * 24);
                      return (
                        <motion.div
                          key={t.level}
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          className={`mx-auto p-3 rounded-2xl border text-center shadow-lg transition-all ${t.color}`}
                          style={{ width: `${widthPct}%` }}
                        >
                          <div className="text-xs font-bold text-white">{t.level}</div>
                          <div className="text-xs font-mono text-amber-200 mt-0.5">
                            ⚡ {energy} Joules <span className="text-[10px] text-slate-400 font-sans">({t.factor * 100}%)</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* LAB 5: BIODIVERSITY HOTSPOTS */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 space-y-2">
                    {[
                      { id: 'western_ghats', name: 'Western Ghats', endemics: 'Nilgiri Tahr, Lion-tailed Macaque, Purple Frog' },
                      { id: 'himalayas', name: 'Himalayan Arc', endemics: 'Snow Leopard, Himalayan Musk Deer' },
                      { id: 'indo_burma', name: 'Indo-Burma (NE India)', endemics: 'Hoolock Gibbon, Rare Orchids' },
                      { id: 'sundaland', name: 'Sundaland (Nicobars)', endemics: 'Nicobar Megapode, Coral Reef Fauna' }
                    ].map((h) => (
                      <motion.button
                        key={h.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Explore hotspot ${h.name}`}
                        onClick={() => setSelectedHotspotId(h.id)}
                        className={`w-full p-3 rounded-2xl text-left border transition-all ${
                          selectedHotspotId === h.id
                            ? 'bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-900/30'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{h.name}</div>
                        <div className="text-[10px] text-emerald-300/80 mt-1">Endemics: {h.endemics}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="md:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🌿</span>
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Conservation Strategy Framework
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs mt-3">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="font-bold text-sky-300 block mb-1">✓ IN-SITU (On-Site)</span>
                          <p className="text-[11px] text-slate-400">
                            Protects species within wild ecosystems (e.g., Silent Valley National Park, Nilgiri Biosphere Reserve).
                          </p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="font-bold text-amber-300 block mb-1">✓ EX-SITU (Off-Site)</span>
                          <p className="text-[11px] text-slate-400">
                            Safeguards genetic material in gene banks, botanical gardens, and cryogenic seed vaults.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-2 bg-emerald-950/40 rounded-xl border border-emerald-900/60 text-[10px] text-emerald-200">
                      Biological Diversity Act (2002): Empowers National & State Biodiversity Boards to halt biopiracy and protect indigenous rights.
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-sky-300">Free Physical Geography Sandbox</h2>
              <p className="text-xs text-slate-400">No grading, no timers. Manipulate all variables and verify hypotheses freely.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Start Graded Challenges"
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-600/30"
            >
              Start Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-sky-400">Ocean Salinity (ppt): {simSalinity}</span>
              <input
                type="range"
                min={10}
                max={45}
                aria-label="Ocean salinity sandbox slider in ppt"
                value={simSalinity}
                onChange={(e) => setSimSalinity(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-rose-400">Ocean Temp (°C): {simTemperature}</span>
              <input
                type="range"
                min={-2}
                max={32}
                aria-label="Ocean temperature sandbox slider in degrees Celsius"
                value={simTemperature}
                onChange={(e) => setSimTemperature(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400">Moon Phase Angle: {simMoonAngle}°</span>
              <input
                type="range"
                min={0}
                max={360}
                aria-label="Moon orbital phase angle sandbox slider"
                value={simMoonAngle}
                onChange={(e) => setSimMoonAngle(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-800">
            <canvas ref={canvasRef} width={900} height={120} className="w-full h-28 block" />
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-400 uppercase">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {activeChallenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mt-0.5">{activeChallenge.question}</h3>
            </div>
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-xs px-3 py-1 rounded-xl font-bold uppercase ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                  : difficulty === 'standard'
                  ? 'bg-sky-950 text-sky-400 border border-sky-700'
                  : 'bg-rose-950 text-rose-400 border border-rose-700'
              }`}
            >
              {difficulty}
            </motion.span>
          </div>

          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-900/50'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* MCQ Options */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-3">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`w-full p-4 text-left rounded-2xl text-sm font-medium border transition-all flex items-center justify-between ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-mono text-sky-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                        {opt}
                      </div>
                      {showExplanation && (
                        <span className="font-bold font-mono">
                          {i === activeChallenge.correctIndex ? '✓ Correct' : '✗'}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable geographical label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-sky-700 hover:bg-sky-600 rounded-xl text-xs font-bold text-white cursor-grab shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetKey) => (
                    <div
                      key={targetKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-mono mb-1">
                        Target Location: {targetKey.replace('loc_', '').replace('_', ' ')}
                      </span>
                      <span className="text-xs font-bold text-sky-300">
                        {droppedLabels[targetKey] ? `✓ ${droppedLabels[targetKey]}` : '⬇ Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify Target Placements"
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="mt-2 px-6 py-2.5 bg-sky-600 text-white rounded-2xl text-xs font-bold"
                >
                  Verify Target Placements
                </motion.button>
              </div>
            )}

            {/* Drag Sort */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length > 0
                  ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Reorderable trophic level item: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-medium text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span>
                      {displayIdx + 1}. {item}
                    </span>
                    <span className="text-slate-600">☰</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify Trophic Sequence"
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-sky-600 text-white rounded-2xl text-xs font-bold mt-2"
                >
                  Verify Trophic Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Enter calculated numerical value"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-2xl text-sm text-white font-mono"
                  />
                  <span className="text-xs text-slate-400 font-bold">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Submit numeric answer"
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl text-xs font-bold"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Add factor ${part}`}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-sky-300 rounded-xl text-xs font-semibold border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-sky-900/60 border border-sky-600 rounded-xl text-xs text-sky-200 flex items-center gap-1"
                    >
                      {part}
                      <button
                        aria-label={`Remove factor ${part}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 ml-1 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble state...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify Constructed Combination"
                  onClick={() => handleAnswer(constructParts.join(' + '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-sky-600 text-white rounded-2xl text-xs font-bold"
                >
                  Verify Constructed Combination
                </motion.button>
              </div>
            )}

            {/* Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-amber-950/40 border border-amber-700/80 rounded-2xl space-y-3"
              >
                <div className="text-xs font-bold text-amber-300 uppercase">
                  Geographical Breakdown & Step-by-Step Rationale:
                </div>
                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-amber-100/90 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">({sIdx + 1})</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Reveal Next Step of Explanation"
                      onClick={() => setRevealedSteps((r) => r + 1)}
                      className="px-3 py-1.5 bg-amber-800 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Proceed to Next Challenge or Finish"
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Expedition →'
                        : 'Next Challenge →'}
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-sky-950 rounded-3xl border border-emerald-600 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">Expedition Completed with Distinction!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="inline-block px-4 py-1.5 bg-sky-900/60 border border-sky-400 rounded-full text-sm font-bold text-sky-200">
              {motivationalFeedback}
            </div>

            <div className="flex justify-center gap-6 text-sm font-mono mt-2">
              <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-xs block">Final Score</span>
                <span className="text-xl font-black text-emerald-400">
                  {Math.max(0, 100 - errors * 5)}%
                </span>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-xs block">BKT Mastery Level</span>
                <span className="text-xl font-black text-sky-400">{masteryLevel.toUpperCase()}</span>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
                <span className="text-slate-400 text-xs block">Total Errors</span>
                <span className="text-xl font-black text-amber-400">{errors}</span>
              </div>
            </div>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY CARD ─── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950/60 rounded-3xl border border-indigo-700/60 shadow-xl space-y-3 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
                  Spaced Repetition System (SM-2 SRS Schedule)
                </h3>
              </div>
              <span className={`text-xs px-3 py-1 rounded-xl font-bold border ${srsScheduleInfo.badgeColor}`}>
                Review in {srsScheduleInfo.days} {srsScheduleInfo.days === 1 ? 'day' : 'days'}
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {srsScheduleInfo.recommendation}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
              <div className={`p-2.5 rounded-xl border ${errors === 0 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <span>0 Errors: Review in 7 days</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-sky-950/80 border-sky-500 text-sky-200 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <span>1–3 Errors: Review in 3 days</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${errors >= 4 ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <span>4+ Errors: Review in 1 day</span>
              </div>
            </div>
          </motion.div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">
                Post-Expedition Reflection & Synthesis
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-sky-200">
                  1. What was the most surprising thing you learned?
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Consider why high subtropical evaporation produces saltier oceans than the Equator, or how cold deep ocean water forms.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-emerald-200">
                  2. How would you explain this to a friend?
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Explain the 10% ecological energy law or how syzygy spring tides create maximum oceanic amplitudes.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-amber-200">
                  3. Where in real life might you use this?
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Think about commercial fisheries forecasting, coastal storm-surge barriers, and biodiversity conservation under the 2002 Act.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-3xl border border-rose-900/60 space-y-3 text-left">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Targeted Concept Remediation:
              </h3>
              {hitMisconceptions.map((mIdx) => {
                const item = misconceptions[mIdx];
                if (!item) return null;
                return (
                  <div key={mIdx} className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs">
                    <p className="text-rose-300 font-semibold">✗ Misconception: {item.misconception}</p>
                    <p className="text-emerald-300 mt-1 font-medium">✓ Reality: {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Practicum Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3 text-left">
            <h3 className="text-sm font-bold text-sky-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 pl-4 list-disc">
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
      {showSuccess && <SuccessBanner message="Expedition Milestone Cleared!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_GeographyOceanWaterSalinitySim;
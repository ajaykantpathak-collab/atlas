'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Node IDs as string literals
const NODE_C9_GEO_021 = 'c9_geo_021';
const NODE_C9_GEO_022 = 'c9_geo_022';
const NODE_C9_GEO_023 = 'c9_geo_023';
const NODE_C9_GEO_024 = 'c9_geo_024';
const NODE_C9_GEO_025 = 'c9_geo_025';
const NODE_C9_GEO_026 = 'c9_geo_026';
const NODE_C9_GEO_027 = 'c9_geo_027';
const NODE_C9_GEO_028 = 'c9_geo_028';
const NODE_C9_GEO_029 = 'c9_geo_029';
const NODE_C9_GEO_030 = 'c9_geo_030';

const ALL_NODE_IDS = [
  NODE_C9_GEO_021,
  NODE_C9_GEO_022,
  NODE_C9_GEO_023,
  NODE_C9_GEO_024,
  NODE_C9_GEO_025,
  NODE_C9_GEO_026,
  NODE_C9_GEO_027,
  NODE_C9_GEO_028,
  NODE_C9_GEO_029,
  NODE_C9_GEO_030,
];

// Narrative Scenario
const SCENARIO = {
  title: 'The Great Planetary Geographer Expedition',
  intro: 'Welcome to the Earth Systems Dynamics Expedition. As chief scientific analyst for the International Geoscience Survey, your mission is to investigate how solar insolation, atmospheric pressure belts, oceanic conveyor gyres, and abrasive aeolian denudation sculpt landscapes from the Thar Desert to the Grand Banks and the Siberian Taiga.',
  context: 'Observe real-time simulations of sand abrasion, tidal gravitational bulges, Coriolis deflection, orographic rainfall, and global natural biomes to solve real-world geographical crises.',
};

// Discovery Question
const DISCOVERY_QUESTION = {
  question: 'In the Thar Desert, why do mushroom rocks have a narrow stem near the ground and a broad heavy top, rather than wearing down evenly?',
  options: [
    'The upper rock layer is softer and erodes much faster',
    'Wind carries heavy abrasive sand grains only within 1–2 metres of the ground',
    'Rainfall dissolves the base while the top stays completely dry',
    'Deflation hollows only sweep away rock tops from high altitude',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Wind uses sand grains as cutting tools (abrasion), and gravity keeps heavy sand grains close to the desert floor!',
};

// Challenge Interface
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

// 22 Challenges across nodes
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_geo_01',
    nodeId: NODE_C9_GEO_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which process describes the direct lifting and sweeping away of loose, dry silt and dust particles by wind without cutting tools?',
    options: ['Abrasion', 'Deflation', 'Attrition', 'Saltation'],
    correctIndex: 1,
    explanation: 'Deflation is the sweeping away and removal of loose, dry particles by the wind itself, forming deflation hollows like those in the Gobi Desert.',
    hints: [
      'Think of "deflating" or blowing away loose dust without rock tools.',
      'Abrasion uses sandblasting tools; this process is simple sweeping.',
      'The term is deflation, which lowers the surface to form hollows.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_geo_02',
    nodeId: NODE_C9_GEO_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct aeolian denudation landforms to their proper formation positions.',
    dragItems: [
      { label: 'Hard Resistant Cap', targetId: 'part_top' },
      { label: 'Abraded Narrow Stem', targetId: 'part_base' },
      { label: 'Deflation Hollow / Oasis', targetId: 'part_hollow' },
      { label: 'Barchan Dune Horns', targetId: 'part_horns' },
    ],
    correctMapping: {
      part_top: 'Hard Resistant Cap',
      part_base: 'Abraded Narrow Stem',
      part_hollow: 'Deflation Hollow / Oasis',
      part_horns: 'Barchan Dune Horns',
    },
    explanation: 'Mushroom rocks feature a hard protective cap on top and an abraded narrow stem at the base where saltating sand cuts fastest. Deflation hollows form where wind scoops out dry basins, and crescent barchans point horns downwind.',
    hints: [
      'The top of the mushroom rock is protected by the hard cap.',
      'Sand abrasive blasting occurs near the ground at the base.',
      'Deep basins scooped to the water table form oases; curved dunes have horns pointing downwind.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_geo_03',
    nodeId: NODE_C9_GEO_022,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are Spring Tides the highest tides while Neap Tides have the lowest tidal range?',
    options: [
      'Spring tides occur only in March, while neap tides occur in December',
      'During spring tides (Full & New Moon), Sun, Moon, and Earth align in a straight line so gravity combines',
      'The Sun is much closer to Earth than the Moon during spring tides',
      'Centrifugal force stops completely during neap tides at quarter moons',
    ],
    correctIndex: 1,
    explanation: 'Spring tides occur at Full Moon and New Moon when the Sun, Moon, and Earth align (syzygy), combining their gravitational pulls to create the maximum tidal bulge. Neap tides occur at right angles (quadrature).',
    hints: [
      'The word "spring" means to leap up, not the spring season.',
      'Look for the alignment of gravitational pulls of Moon and Sun.',
      'Alignment at full and new moons creates combined gravitational force.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_geo_04',
    nodeId: NODE_C9_GEO_023,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why is the Grand Banks off Newfoundland one of the richest commercial fishing grounds on Earth?',
    options: [
      'The cold Peru Current creates calm weather for trawlers',
      'The warm Gulf Stream meets the cold Labrador Current, causing upwelling of mineral nutrients and plankton blooms',
      'Heavy tropical rainfall dilutes the salinity and attracts fresh-water fish',
      'Strong tidal bores trap large shoals of fish in shallow harbours',
    ],
    correctIndex: 1,
    explanation: 'The meeting of the warm Gulf Stream and the cold Labrador Current at the Grand Banks causes vertical mixing and upwelling of rich benthic nutrients, fostering vast plankton growth that feeds large fish shoals (like cod), accompanied by dense sea fogs.',
    hints: [
      'Identify the two North Atlantic currents meeting off eastern Canada.',
      'One is warm from the equator, one is cold from the Arctic.',
      'Their mixing churns up mineral nutrients supporting plankton.',
    ],
  },
  {
    id: 'ch_geo_05',
    nodeId: NODE_C9_GEO_024,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the atmospheric layers in order starting from the Earth surface upwards to outer space.',
    sortItems: [
      'Troposphere (0–18 km: all weather, clouds, normal lapse rate)',
      'Stratosphere (18–50 km: ozone layer, temperature inversion, jet flight)',
      'Mesosphere (50–80 km: coldest layer, meteors burn up)',
      'Thermosphere / Ionosphere (80–400 km: charged ions, radio reflection, auroras)',
      'Exosphere (>400 km: sparse gases fading into space)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The vertical structure from ground up is Troposphere (weather), Stratosphere (ozone shield), Mesosphere (meteor ablation, coldest), Thermosphere/Ionosphere (radio wave bounce), and Exosphere.',
    hints: [
      'Remember the mnemonic: The Sun Melts Tiny Eggs (T-S-M-T-E).',
      'Troposphere is where we live and weather occurs.',
      'Exosphere is outermost fading into outer space.',
    ],
  },
  {
    id: 'ch_geo_06',
    nodeId: NODE_C9_GEO_025,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Station Shimla lies at altitude 2,200 m (temperature 15°C). Delhi lies at 200 m altitude. With a normal lapse rate of 6.5°C per 1,000 m (1 km), what is the calculated sea-level/plain temperature at Delhi? (Enter temperature in °C)',
    correctAnswer: 28,
    tolerance: 0.5,
    unit: '°C',
    explanation: 'Altitude difference = 2,200 m - 200 m = 2,000 m (2 km). Temperature drop = 2 km × 6.5°C/km = 13°C. Therefore, Delhi temperature = 15°C + 13°C = 28°C.',
    hints: [
      'Find the difference in altitude: 2200 m - 200 m = 2000 m = 2 km.',
      'Multiply the altitude difference by the normal lapse rate: 2 km × 6.5°C = 13°C.',
      'Since Delhi is lower in the troposphere, add 13°C to Shimla\'s 15°C.',
    ],
  },
  {
    id: 'ch_geo_07',
    nodeId: NODE_C9_GEO_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In the Northern Hemisphere, how does the Coriolis effect alter the path of the Trade Winds blowing towards the Equatorial Low?',
    options: [
      'Deflects them to the left, creating South-East Trade Winds',
      'Deflects them to the right, turning them into North-East Trade Winds',
      'Accelerates them directly south without angular deflection',
      'Reverses their direction to blow from west to east',
    ],
    correctIndex: 1,
    explanation: 'Due to Earth\'s eastward rotation, moving air in the Northern Hemisphere is deflected to its right. Winds moving from the Subtropical High (30°N) toward the Equator are bent westward, becoming the North-East Trade Winds.',
    hints: [
      'Ferrel\'s Law states: Northern Hemisphere winds deflect to the RIGHT.',
      'Air moving south towards the equator bent right moves towards the south-west.',
      'Winds are named from where they blow: hence North-East Trade Winds.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_geo_08',
    nodeId: NODE_C9_GEO_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does Mumbai receive over 200 cm of rainfall during the monsoon while Pune, located just 150 km inland across the Western Ghats, receives only around 70 cm?',
    options: [
      'Pune has higher atmospheric pressure preventing all cloud formation',
      'Mumbai lies on the windward slope with orographic ascent, while Pune lies in the leeward rain shadow where descending air warms and dries',
      'Mumbai experiences convectional rainfall while Pune only receives cyclonic depressions',
      'The Western Ghats block all oceanic winds and reflect moisture into the Arabian Sea',
    ],
    correctIndex: 1,
    explanation: 'Moist south-west monsoon winds hit the Western Ghats, rise, cool adiabatically, and dump torrential orographic rainfall on windward Mumbai. As air crosses the crest and descends down the leeward slope to Pune, it compresses, warms, relative humidity drops, creating a rain shadow.',
    hints: [
      'Think of the physical mountain barrier of the Western Ghats.',
      'Rising air on the coast cools and condenses (windward).',
      'Descending air on the inland side warms and dries (leeward rain shadow).',
    ],
  },
  {
    id: 'ch_geo_09',
    nodeId: NODE_C9_GEO_028,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct the precise chain of eutrophication caused by agricultural fertiliser runoff.',
    availableParts: [
      'Nitrate/Phosphate runoff',
      'Algal bloom on surface',
      'Sunlight blocked to deep plants',
      'Algae & plants die',
      'Bacterial decomposition consumes Dissolved Oxygen',
      'Fish suffocate and die',
    ],
    targetState: 'Nitrate/Phosphate runoff Algal bloom on surface Sunlight blocked to deep plants Algae & plants die Bacterial decomposition consumes Dissolved Oxygen Fish suffocate and die',
    validationHint: 'Click each step in exact chronological sequence from fertilizer runoff to fish asphyxiation.',
    explanation: 'Eutrophication is an indirect multi-step process: synthetic fertilisers leach into lakes → algae multiply rapidly into blooms → subsurface light is blocked → biomass dies → aerobic bacteria decompose matter consuming dissolved oxygen (BOD surges) → aquatic fauna dies from anoxia.',
    hints: [
      'Start with fertilizer nutrients entering the water body.',
      'Follow with the surface plant/algae explosion and light blockage.',
      'Decomposition consumes oxygen, leading to fish death.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_geo_10',
    nodeId: NODE_C9_GEO_029,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which natural region is uniquely characterised by dry, drought-prone summers and mild, rainy winters with sclerophyllous chaparral scrub vegetation?',
    options: ['Tropical Savanna', 'Mediterranean Region', 'Taiga Coniferous Forest', 'Tropical Monsoon'],
    correctIndex: 1,
    explanation: 'The Mediterranean region (30°–45° western continental margins) is the ONLY natural region where winters are wet (due to shifted Westerlies) and summers are dry (due to Subtropical Highs). It is renowned for olives, citrus fruits, and grapes.',
    hints: [
      'Look for the region famous for citrus, olives, and wet winters.',
      'The name is identical to the sea bordering Southern Europe and North Africa.',
      'It has dry summers and wet winters — the Mediterranean biome.',
    ],
  },
  {
    id: 'ch_geo_11',
    nodeId: NODE_C9_GEO_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On a world outline map with a Representative Fraction (R.F.) scale of 1:100,000,000, two cities measure 4.5 cm apart. What is the actual ground distance in kilometres? (Enter value in km)',
    correctAnswer: 4500,
    tolerance: 10,
    unit: 'km',
    explanation: '1 km = 100,000 cm. Thus 100,000,000 cm ÷ 100,000 = 1,000 km per cm. Actual distance = 4.5 cm × 1,000 km/cm = 4,500 km.',
    hints: [
      'Convert 100,000,000 cm to km by dividing by 100,000.',
      '1 cm on map = 1,000 km on the ground.',
      'Multiply 4.5 cm by 1,000 km/cm.',
    ],
  },
  {
    id: 'ch_geo_12',
    nodeId: NODE_C9_GEO_021,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare Barchans and Seif Dunes. Which statement accurately differentiates their morphology and wind regime?',
    options: [
      'Barchans are crescent-shaped with horns pointing downwind from unidirectional wind; Seif dunes are sword-like longitudinal ridges parallel to converging winds',
      'Barchans are made of fine silt like loess; Seif dunes are giant rock pedestals',
      'Barchans form at right angles to wind in cold deserts; Seif dunes form only on coastlines',
      'Barchans are erosional deflation hollows; Seif dunes are depositional alluvial fans',
    ],
    correctIndex: 0,
    explanation: 'Barchans are crescent-shaped sand dunes with horns pointing in the direction the wind blows (downwind), occurring under unidirectional winds with limited sand. Seif (Arabic for sword) dunes are sharp-crested linear ridges aligned parallel to the resultant of converging winds.',
    hints: [
      'Barchans have crescent horns pointing downwind.',
      'Seif means "sword" in Arabic — long sharp ridges parallel to wind.',
      'Unidirectional vs converging multi-directional winds.',
    ],
  },
  {
    id: 'ch_geo_13',
    nodeId: NODE_C9_GEO_022,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A large cargo container ship with a 14-metre draft must enter a shallow tidal harbour with a baseline chart depth of 4 metres. The harbour experiences a semi-diurnal tidal range of 12 metres at Spring Tide and 6 metres at Neap Tide. What advice should the navigation pilot give?',
    options: [
      'The ship can enter at any time during Neap Tide low water',
      'The ship can safely enter only during High Tide of Spring Tide when water depth reaches 4m + 12m = 16m',
      'The ship must wait until low tide so bottom suction is reduced',
      'Tides do not affect navigation depth; dredging is the only factor',
    ],
    correctIndex: 1,
    explanation: 'Baseline depth = 4 m. At Spring high tide: total water depth = 4 m + 12 m = 16 m > 14 m required draft (safe passage). At Neap high tide: total depth = 4 m + 6 m = 10 m < 14 m draft (risk of grounding). The ship must enter at Spring High Tide.',
    hints: [
      'Add the tidal range to baseline depth: 4 m + 12 m = 16 m.',
      'Compare 16 m with the ship draft requirement of 14 m.',
      'Neap tide provides only 4 + 6 = 10 m, which is insufficient.',
    ],
  },
  {
    id: 'ch_geo_14',
    nodeId: NODE_C9_GEO_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'The Peru (Humboldt) Current and Benguela Current flow along western continental margins. What impact do they have on adjacent coastal lands?',
    options: [
      'They cause torrential daily thunderstorms and dense equatorial rainforests',
      'They chill coastal air, suppress atmospheric convection, and create hyper-arid coastal deserts (Atacama and Namib)',
      'They increase ocean surface evaporation and cause frequent inland cyclones',
      'They melt polar ice caps and flood coastal river estuaries',
    ],
    correctIndex: 1,
    explanation: 'Cold currents cool the overlying air, increasing atmospheric stability and inhibiting vertical convection and evaporation. This desiccation effect is the primary cause of coastal tropical deserts like the Atacama (Peru Current) and Namib (Benguela Current).',
    hints: [
      'Cold water cools the air above it, preventing moist air from rising.',
      'No rising air means no rain clouds.',
      'This creates arid coastal deserts like the Atacama and Namib.',
    ],
  },
  {
    id: 'ch_geo_15',
    nodeId: NODE_C9_GEO_024,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An environmental activist claims: "Phasing out CFC refrigerants will solve global warming in the troposphere." Evaluate this statement according to atmospheric science.',
    options: [
      'Completely true because ozone and CO2 are identical molecules',
      'Flawed: Ozone depletion is the destruction of stratospheric O3 by CFC chlorine radicals allowing UV rays; Global warming is tropospheric heat trapping by CO2 and CH4',
      'Completely false because CFCs only exist in the mesosphere above 50 km',
      'Flawed because global warming occurs only in the ionosphere',
    ],
    correctIndex: 1,
    explanation: 'CISCE examiner reports stress distinguishing ozone depletion (stratospheric shield destruction by CFCs permitting harmful UV-B radiation) from global warming (tropospheric infrared trapping by greenhouse gases like CO2 and methane). Phasing out CFCs heals the ozone layer but does not halt CO2-driven global warming.',
    hints: [
      'Identify the distinct atmospheric layers: Stratosphere vs Troposphere.',
      'Identify the mechanisms: UV penetration vs infrared heat trapping.',
      'Ozone protects against UV; greenhouse gases trap heat.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_geo_16',
    nodeId: NODE_C9_GEO_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During clear, calm winter nights in the Doon Valley, ground heat rapidly radiates into space, making air touching the valley floor colder than the air above. What is this phenomenon called?',
    options: ['Normal Lapse Rate', 'Temperature Inversion', 'Greenhouse Convection', 'Adiabatic Expansion'],
    correctIndex: 1,
    explanation: 'Temperature inversion is the reversal of the normal lapse rate, where temperature increases with altitude. On clear, calm winter nights, rapid terrestrial radiation chills the valley floor, trapping cold, dense air and pollutants beneath a warmer upper layer.',
    hints: [
      'Normally, temperature decreases with height; here it reverses.',
      'It happens on clear, calm nights with rapid radiative cooling.',
      'The term is Temperature Inversion.',
    ],
  },
  {
    id: 'ch_geo_17',
    nodeId: NODE_C9_GEO_026,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Contrast a Cyclone and an Anticyclone in terms of central pressure and wind spiral direction in the Northern Hemisphere.',
    options: [
      'Cyclone: Low central pressure, anticlockwise inward spiral; Anticyclone: High central pressure, clockwise outward spiral',
      'Cyclone: High pressure, clockwise spiral; Anticyclone: Low pressure, anticlockwise spiral',
      'Both have identical low pressure but differ in rotational velocity',
      'Cyclones occur only over land, while anticyclones exist exclusively over oceans',
    ],
    correctIndex: 0,
    explanation: 'In the Northern Hemisphere, a Cyclone has low pressure at its centre with winds spiralling inward in an anticlockwise direction (bringing storms). An Anticyclone has high central pressure with winds spiralling outward in a clockwise direction (bringing fair, clear weather).',
    hints: [
      'Cyclones are low pressure centres with stormy inward winds.',
      'Coriolis deflection turns inward Northern Hemisphere winds anticlockwise.',
      'Anticyclones have high pressure and clockwise outward divergence.',
    ],
  },
  {
    id: 'ch_geo_18',
    nodeId: NODE_C9_GEO_027,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'At 25°C, a cubic metre of air holds 12 grams of water vapour. The maximum water vapour capacity of air at 25°C is 24 g/m³. Calculate the Relative Humidity (RH) as a percentage. (Enter numeric value %)',
    correctAnswer: 50,
    tolerance: 0,
    unit: '%',
    explanation: 'Relative Humidity = (Actual Water Vapour / Maximum Saturation Capacity) × 100 = (12 g/m³ / 24 g/m³) × 100 = 50%.',
    hints: [
      'Formula: RH = (Actual / Maximum) × 100.',
      'Divide 12 by 24.',
      'Multiply 0.5 by 100 = 50%.',
    ],
  },
  {
    id: 'ch_geo_19',
    nodeId: NODE_C9_GEO_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Every November, Delhi experiences severe winter smog caused by agricultural stubble burning, vehicular emissions, and temperature inversion. Which combined strategy offers the most sustainable scientific solution?',
    options: [
      'Install industrial air conditioners to blow warm air into the sky and burn stubble at night',
      'Subsidise in-situ happy seeders/bio-decomposers for stubble, mandate BS-VI/EV public transport, and utilize smog towers and green belts',
      'Increase chemical pesticide spraying across agricultural fields to suppress dust',
      'Drain local lakes and rivers to prevent moisture fog formation',
    ],
    correctIndex: 1,
    explanation: 'Comprehensive pollution mitigation requires addressing the root sources: bio-enzymatic decomposition of crop residues to avoid burning, electrification of transit, afforestation buffer zones to absorb particulate matter, and emission controls.',
    hints: [
      'Identify root causes: crop residue combustion and vehicular exhaust.',
      'Look for eco-friendly agronomic tools and clean energy solutions.',
      'Sustainable solutions combine agricultural alternatives with green transport.',
    ],
  },
  {
    id: 'ch_geo_20',
    nodeId: NODE_C9_GEO_029,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the global grassland region with its correct continental location: Steppes, Prairies, Pampas, and Veldts.',
    options: [
      'Steppes (Eurasia/Russia), Prairies (North America), Pampas (South America), Veldts (South Africa)',
      'Steppes (Australia), Prairies (Africa), Pampas (Eurasia), Veldts (North America)',
      'Steppes (South America), Prairies (Eurasia), Pampas (South Africa), Veldts (Australia)',
      'Steppes (North America), Prairies (South America), Pampas (Eurasia), Veldts (Asia)',
    ],
    correctIndex: 0,
    explanation: 'Temperate mid-latitude continental grasslands are known regionally as Steppes in Russia/Eurasia, Prairies in North America, Pampas in South America (Argentina), and Veldts in South Africa (and Downs in Australia).',
    hints: [
      'Prairies are in the USA/Canada (North America).',
      'Pampas are in Argentina (South America).',
      'Steppes are in Russia/Central Asia and Veldts in South Africa.',
    ],
  },
  {
    id: 'ch_geo_21',
    nodeId: NODE_C9_GEO_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why do the Himalayas act as a profound climatic divide for the Indian subcontinent, and what is their spatial relationship to the Tibetan Plateau and Ganga River?',
    options: [
      'They lie south of the Ganga and prevent ocean currents from reaching Tibet',
      'They lie north of the Ganga and south of the Tibetan Plateau, blocking freezing winter blizzards from Central Asia and trapping summer monsoon rains',
      'They represent an artificial political boundary without any influence on regional precipitation or temperature',
      'They are low plateaus that allow dry polar winds to blow freely over the Deccan',
    ],
    correctIndex: 1,
    explanation: 'The Himalayas form an immense orographic barrier north of the fertile Indo-Gangetic plains and south of the high Tibetan Plateau. They prevent bitter polar winds from desiccating North India during winter and intercept the SW monsoon, forcing copious rain over India.',
    hints: [
      'Sequence from South to North: Ganga Plains → Himalayas → Tibetan Plateau.',
      'Consider their dual barrier role: blocking cold Siberian winds and trapping monsoon moisture.',
      'They act as a giant wall protecting the subcontinent.',
    ],
  },
  {
    id: 'ch_geo_22',
    nodeId: NODE_C9_GEO_021,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Assemble the correct three stages of the aeolian denudation cycle in arid regions.',
    availableParts: [
      'Deflation & Abrasion (Erosion)',
      'Saltation & Suspension (Transportation)',
      'Dunes & Loess (Deposition)',
    ],
    targetState: 'Deflation & Abrasion (Erosion) Saltation & Suspension (Transportation) Dunes & Loess (Deposition)',
    validationHint: 'Select Erosion first, Transportation second, and Deposition third.',
    explanation: 'Like all denudation agents, wind follows the immutable cycle: Erosion (deflation hollows, mushroom rocks) → Transportation (saltation of sand 0.1–0.5 mm, suspension of dust <0.1 mm) → Deposition (barchans, seif dunes, loess plateaus).',
    hints: [
      'Stage 1: Wearing away (Erosion).',
      'Stage 2: Carrying the load (Transportation).',
      'Stage 3: Dropping the load (Deposition).',
    ],
  },
  // ─── Class 10 board-depth additions: resources-and-development diagnostics ───
  {
    id: 'ch_depth_den_resource_definition',
    nodeId: 'c10_geo_cbse_01_001',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Define "resource" as CBSE Geography does, classify coal as biotic or abiotic, and use the Ganga-water example to explain utility and functionality.',
    options: [
      'A resource is any substance/technology/thing that is TECHNOLOGICALLY accessible, ECONOMICALLY feasible and CULTURALLY acceptable -- and which satisfies a need. Coal is ABIOTIC: formed from fossil plants (once biotic) but a non-living physical substance when extracted. Ganga water: same substance, different functionality -- a resource for irrigation in Bihar, NOT a drinking resource in a polluted Kanpur stretch, because utility depends on human judgement and technology',
      'A resource is anything found in nature; coal is biotic because trees made it; polluted water is never a resource of any kind',
      'Resources must be living; technology is never a resource',
      'Cultural acceptability plays no role in defining resources'
    ],
    correctIndex: 0,
    explanation:
      'The three criteria (accessible + feasible + acceptable) turn "stuff" into "resource" -- the definition evolves with technology (uranium became a resource only after the reactor; hydrogen may become one next). Classification grids: biotic/abiotic, renewable/non-renewable, individual/community/national/international ownership.',
    hints: [
      'Recite the three criteria -- each is a filter.',
      'Ask: is it LIVING now? (Coal is not.)',
      'Utility = substance x human context.'
    ],
  },
  {
    id: 'ch_depth_den_nonrenewable_futures',
    nodeId: 'c10_geo_cbse_01_002',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Compare the long-term availability of aluminium (from bauxite) and coal: both finite -- so why do their futures differ? Then design a 5-point sustainable groundwater plan for a Rajasthan block.',
    options: [
      'Aluminium is recyclable almost indefinitely (remelting costs ~5% of virgin smelting energy), so its stock CIRCULATES; coal is burnt and converted to CO2/ash -- destroyed on first use, only reusable via efficiency. Groundwater plan: (1) aquifer mapping and metering, (2) crop diversification away from borewell-guzzlers, (3) rainwater harvesting structures (kunds, check dams), (4) drip irrigation subsidy tied to water-table data, (5) community water-budgeting by the panchayat with legal penalties for deepening borewells',
      'Both resources are infinite in practice; plans are unnecessary',
      'Aluminium cannot be recycled; coal regrows naturally',
      'Groundwater plans need no community participation'
    ],
    correctIndex: 0,
    explanation:
      'Non-renewable ≠ uniform fate: metallic minerals live in a circle (reduce-reuse-recycle), fossil fuels live on a line (use-once). Sustainable development is Rio-style "growth without harming future generations" -- the groundwater plan is its applied form: measure, price, recharge, substitute, govern.',
    hints: [
      'Burnt coal cannot be reclaimed; melted aluminium can.',
      'Reuse-recycle changes a stock into a loop.',
      'Five plan points: name each and its enforcement.'
    ],
  },
  {
    id: 'ch_depth_den_ownership_forest',
    nodeId: 'c10_geo_cbse_01_003',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Classify ownership: (a) a farmer\'s private well in Punjab, (b) grazing land used by all villagers in Rajasthan, (c) the Chennai port. A company wants bauxite under a Reserved Forest -- what legal and ethical tests apply, and evaluate "declaring all forests Reserved automatically protects them"?',
    options: [
      '(a) individual, (b) community, (c) national. The bauxite case needs: Forest (Conservation) Act 1980 clearance, FRA 2006 gram-sabha consent of forest-dwellers, EIA and compensatory afforestation -- ethical test: who bears the cost vs who reaps the benefit. Evaluation: FALSE -- Sariska (2005) lost its tigers UNDER reserved status; protection depends on enforcement, funding and community participation, not notification paper',
      'All three are national resources; reserved status needs no consent; notification alone guarantees protection',
      'A farmer\'s well is a community resource; ports are international resources',
      'Gram sabhas have no say in forest diversion'
    ],
    correctIndex: 0,
    explanation:
      'Ownership ladder: individual -> community -> national -> international (oceanic resources beyond EEZ, celestial bodies under treaties). Community resources (charagah, ponds, sacred groves) are the most over-used and least governed -- management challenge: open access vs regulation. The Sariska case is the board\'s favourite proof that legal status ≠ ecological safety.',
    hints: [
      'Who owns, who uses, who pays -- three different questions.',
      'FRA 2006 made consent a RIGHT, not a courtesy.',
      'Notification ≠ protection: name the counter-example.'
    ],
  },
  {
    id: 'ch_depth_den_soil_landuse',
    nodeId: 'c10_geo_cbse_01_007',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why is black soil called "self-ploughing" and how does it form? Then choose conservation measures: (a) contour ploughing vs terracing on a >20% slope, (b) a plan for 5 ha of laterite in the Western Ghats foothills with 3000 mm rain, (c) the tea slope in the Palani Hills.',
    options: [
      'Black soil (regur) is basalt-weathered, clay-rich: it swells when wet and shrinks-cracks when dry, ploughing itself -- formed from Deccan lava weathering. On steep slopes terracing works where contour ploughing fails because benches cut the slope into flat steps that hold water physically; contour furrows alone overflow when runoff exceeds infiltration. Laterite plan: cover crops + organic mulch (laterite leaches fast), agroforestry with cashew/arecanut, gully-plugging check dams; Palani tea: plant along contour with shade trees and drainage channels to stop sheet wash',
      'Black soil is self-ploughing because farmers plough it thrice; terraces are decorative; laterite needs only more chemical fertiliser',
      'Black soil forms in deserts; contour ploughing suits cliffs',
      'Tea slopes need no conservation because roots hold everything'
    ],
    correctIndex: 0,
    explanation:
      'Soil conservation toolkit matched to gradient: contour ploughing (<3% slope), terrace farming (steep), strip cropping (wind areas), shelter belts (deserts), check dams (gullies). Land-use arithmetic (01_009): if reporting area 100 units with culturable waste 12 and fallow 8, waste+ fallow = 20% -- the recoverable buffer; Deccan 100-ha plan: 40 ha black soil for cotton/sugarcane, 30 ha laterite for horticulture + agroforestry, 30 ha rocky for pasture and harvesting structures.',
    hints: [
      'Crack-fill, crack-shrink -- the soil ploughs ITSELF.',
      'Match measure to slope: flat furrows vs stepped benches.',
      'Laterite + heavy rain = leaching: feed the soil organically.'
    ],
  }
];

// Props Interface
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

// Default Props
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_GEO_021,
  title: 'Comprehensive Physical Geography: Denudation, Hydrosphere, Atmosphere & World Maps',
  definition: 'Denudation, atmospheric circulation, oceanic conveyor gyres, and insolation dynamics work together as coupled Earth systems, driving weather, shaping natural biomes, and sculpting continental landforms.',
  eli5: 'Earth is a giant engine: sunlight heats the air and oceans, winds sculpt desert rocks and blow storms against mountains, while ocean currents and tides redistribute heat and marine life across the globe.',
  misconceptions: [
    {
      misconception: 'Deflation and abrasion are identical wind erosion processes.',
      correction: 'Deflation is the lifting/sweeping away of loose dry particles (forming hollows), while abrasion is sandblasting solid rock with abrasive grains (forming mushroom rocks).',
    },
    {
      misconception: 'Mushroom rocks form because the top layer is softer.',
      correction: 'The top cap is actually made of harder, resistant rock. The base is worn down narrower because sand grains bounce (saltate) mostly within 1–2 metres of the ground.',
    },
    {
      misconception: 'The Coriolis effect is caused by winds blowing across the oceans.',
      correction: 'The Coriolis effect is generated by Earth\'s eastward rotation on its axis, deflecting moving fluids right in the Northern Hemisphere and left in the Southern Hemisphere.',
    },
    {
      misconception: 'Spring tides occur only during the spring season.',
      correction: 'Spring tides occur twice every month at New Moon and Full Moon when Sun, Moon, and Earth align in a straight line, irrespective of season.',
    },
    {
      misconception: 'Eutrophication poisons fish directly with chemical fertilizer toxins.',
      correction: 'Eutrophication is an oxygen-depletion process: fertilizer nutrients spur algal blooms; when algae die, aerobic bacteria consume dissolved oxygen during decomposition, suffocating aquatic organisms.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the standard sea-level atmospheric pressure?', options: ['760 mb', '1013.25 mb / hPa', '500 mb', '100 mb'], correctIndex: 1 },
    { question: 'Which cold current flows along the west coast of South America?', options: ['Gulf Stream', 'Kuro Shio', 'Peru (Humboldt) Current', 'Labrador Current'], correctIndex: 2 },
    { question: 'What is the dry leeward side of a mountain range called in orographic rainfall?', options: ['Windward crest', 'Rain shadow area', 'Deflation basin', 'Thermal inversion'], correctIndex: 1 },
    { question: 'What instrument is used to measure atmospheric humidity using dry and wet bulbs?', options: ['Aneroid barometer', 'Psychrometer', 'Anemometer', 'Wind vane'], correctIndex: 1 },
    { question: 'What is permanently frozen subsoil in the Arctic Tundra called?', options: ['Loess', 'Permafrost', 'Chaparral', 'Savanna'], correctIndex: 1 },
    { question: 'At what altitude does the Ozone Layer reside in the atmosphere?', options: ['Troposphere (0-10 km)', 'Stratosphere (18-50 km)', 'Mesosphere (50-80 km)', 'Exosphere (>400 km)'], correctIndex: 1 },
    { question: 'Which ocean current warms the climate of Western Europe?', options: ['Labrador Current', 'Oyashio Current', 'Gulf Stream / North Atlantic Drift', 'Benguela Current'], correctIndex: 2 },
    { question: 'What is the ratio of actual water vapour in air to saturation capacity at a given temperature?', options: ['Absolute Humidity', 'Specific Humidity', 'Relative Humidity', 'Dew point'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student demonstrates deep conceptual mastery of aeolian denudation, tides, oceanic gyres, atmospheric layers, insolation lapse rates, planetary wind belts, orographic precipitation, pollution cascades, and world map cartography.',
};

// Interactive Exploration Steps
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Aeolian Denudation & Mushroom Rock Sandblaster',
    instruction: 'Adjust the Wind Velocity and Sand Load sliders to observe real-time abrasion sculpting the base of a rock pillar while saltating grains bounce near the desert floor.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_GEO_021,
  },
  {
    title: 'Lab 2: Earth-Moon-Sun Gravitational Tides Simulator',
    instruction: 'Rotate the Moon orbital angle to align with the Sun (Spring Tide) or position at 90° quadrature (Neap Tide) and watch ocean tidal bulges expand or contract.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C9_GEO_022,
  },
  {
    title: 'Lab 3: Global Wind Belts & Coriolis Deflection Engine',
    instruction: 'Select Earth Hemisphere and toggle Rotation Speed to observe planetary wind deflection (NE Trades, Westerlies, Polar Easterlies) governed by Ferrel\'s Law.',
    interactionType: 'drag-position',
    nodeId: NODE_C9_GEO_026,
  },
  {
    title: 'Lab 4: Orographic Precipitation & Rain Shadow Cross-Section',
    instruction: 'Adjust mountain barrier elevation and coastal ocean humidity to observe adiabatic cooling, cloud condensation, and the arid leeward rain shadow effect.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_GEO_027,
  },
  {
    title: 'Lab 5: Global Biome Explorer & Insolation Heat Budget',
    instruction: 'Click on different latitude zones (Equator to Poles) to inspect insolation angle, temperature profiles, precipitation, and biome flora/fauna.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C9_GEO_029,
  },
];

// Prediction Questions
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If wind velocity increases from 15 km/h to 65 km/h during a Thar desert sandstorm, what will happen to the rate of rock base abrasion?',
    options: [
      'Abrasion stops because sand grains fly into outer space',
      'Abrasion rate increases exponentially at the 0–1.5m basal zone due to high kinetic energy sand saltation',
      'The top of the rock erodes 10 times faster than the base',
      'No change; wind erosion only happens with water droplets',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Wind Velocity slider to >60 km/h in Lab 1 and watch the lower rock stem abrade in real-time!',
    nodeId: NODE_C9_GEO_021,
  },
  {
    question: 'Predict: During a New Moon alignment, what tidal condition will occur along coastal ports like Kandla and the Bay of Fundy?',
    options: [
      'Neap tide with the smallest tidal range of the month',
      'Spring tide with exceptionally high high-tides and very low low-tides',
      'Tides disappear completely because the Moon is dark',
      'Water level remains static for 24 hours',
    ],
    correctIndex: 1,
    verifyInstruction: 'Rotate the Moon orbital slider to 0° (New Moon) in Lab 2 to verify maximum tidal amplitude!',
    nodeId: NODE_C9_GEO_022,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the trajectory of sand grains when wind speed is moderate (25–40 km/h)?',
    observableOptions: [
      'They bounce along the surface in short leaping arcs (saltation)',
      'They float permanently in the stratosphere without falling',
      'They form stationary solid boulders instantly',
      'They sink deep into underground aquifers',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_GEO_021,
  },
  {
    question: 'What happens to the temperature and humidity of the air mass as it descends down the leeward mountain slope in the Orographic simulation?',
    observableOptions: [
      'Air cools down and condenses into torrential rain',
      'Air compresses, warms adiabatically, and relative humidity drops, creating dry conditions',
      'Air freezes into a permanent glacier',
      'Air loses all pressure and dissipates into space',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_GEO_027,
  },
];

// Real World Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Field Geographer Investigation: Local Microclimate & Denudation Audit',
  description: 'Act as a professional environmental consultant. Audit your local district by collecting weather data, identifying soil erosion features, mapping regional water bodies, and recommending sustainable land-management interventions.',
  steps: [
    'Record morning (07:00) and afternoon (14:00) temperatures over 5 days to compute your district\'s Diurnal Temperature Range.',
    'Identify one local example of physical denudation or soil erosion (windblown soil, gully erosion, or wave cut) and photograph or sketch it.',
    'Map your location relative to the nearest mountain barrier or ocean body and identify if your town lies on a windward or leeward rain shadow.',
    'Draft a 3-point action plan to mitigate local air or water pollution (e.g. bio-composting, urban tree belts, rainwater harvesting).',
  ],
};

// Sample Climate Data for Recharts Graph
const CLIMATE_GRAPH_DATA = [
  { month: 'Jan', insolation: 130, tempMumbai: 24, tempDelhi: 14, rainfallMumbai: 2, rainfallDelhi: 25 },
  { month: 'Feb', insolation: 165, tempMumbai: 25, tempDelhi: 18, rainfallMumbai: 1, rainfallDelhi: 20 },
  { month: 'Mar', insolation: 210, tempMumbai: 28, tempDelhi: 24, rainfallMumbai: 0, rainfallDelhi: 15 },
  { month: 'Apr', insolation: 245, tempMumbai: 30, tempDelhi: 31, rainfallMumbai: 2, rainfallDelhi: 10 },
  { month: 'May', insolation: 260, tempMumbai: 32, tempDelhi: 36, rainfallMumbai: 12, rainfallDelhi: 30 },
  { month: 'Jun', insolation: 220, tempMumbai: 30, tempDelhi: 34, rainfallMumbai: 520, rainfallDelhi: 80 },
  { month: 'Jul', insolation: 180, tempMumbai: 28, tempDelhi: 31, rainfallMumbai: 750, rainfallDelhi: 210 },
  { month: 'Aug', insolation: 175, tempMumbai: 28, tempDelhi: 30, rainfallMumbai: 500, rainfallDelhi: 230 },
  { month: 'Sep', insolation: 195, tempMumbai: 28, tempDelhi: 29, rainfallMumbai: 320, rainfallDelhi: 120 },
  { month: 'Oct', insolation: 190, tempMumbai: 29, tempDelhi: 26, rainfallMumbai: 60, rainfallDelhi: 15 },
  { month: 'Nov', insolation: 150, tempMumbai: 28, tempDelhi: 20, rainfallMumbai: 10, rainfallDelhi: 5 },
  { month: 'Dec', insolation: 125, tempMumbai: 26, tempDelhi: 15, rainfallMumbai: 2, rainfallDelhi: 10 },
];

function C9_GeographyDenudationWindWorkSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌍', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Interactive Lab State: Wind Work
  const [windSpeed, setWindSpeed] = useState(35); // km/h
  const [sandLoad, setSandLoad] = useState(60); // %
  const [rockBaseWidth, setRockBaseWidth] = useState(45); // px width of stem

  // Interactive Lab State: Tides
  const [moonAngle, setMoonAngle] = useState(0); // 0 = New Moon, 90 = Neap, 180 = Full, 270 = Neap
  const [selectedTidePort, setSelectedTidePort] = useState<'fundy' | 'kutch' | 'mumbai'>('kutch');

  // Interactive Lab State: Coriolis & Atmosphere
  const [selectedHemisphere, setSelectedHemisphere] = useState<'north' | 'south'>('north');

  // Interactive Lab State: Orographic Rain
  const [mountainHeight, setMountainHeight] = useState(1800); // metres
  const [coastalHumidity, setCoastalHumidity] = useState(85); // %

  // Interactive Lab State: Biome Explorer
  const [selectedBiomeLat, setSelectedBiomeLat] = useState(5);
  const [activeTabVisual, setActiveTabVisual] = useState<'diagram' | 'chart'>('diagram');

  // Predict-then-check state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & sorting state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C9_GEO_021);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT-based adaptive difficulty update
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

  // Real-time Rock Abrasion Calculation
  useEffect(() => {
    const abrasionFactor = (windSpeed / 100) * (sandLoad / 100);
    const calculatedBase = Math.max(16, Math.min(50, 50 - abrasionFactor * 32));
    setRockBaseWidth(calculatedBase);
  }, [windSpeed, sandLoad]);

  // Canvas Animation for Atmospheric Wind / Particle Flow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; speed: number; size: number; alpha: number }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: (windSpeed / 20) * (0.8 + Math.random() * 0.8),
        size: 1 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.7,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speed;
        if (p.x > canvas.width) {
          p.x = 0;
          p.y = Math.random() * canvas.height;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [windSpeed, phase]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent scientific insight! Sand saltation is highest near the ground.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Earth Systems Lab. Manipulate the physical models.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play sandbox mode unlocked. Test any combination without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering ICSE Challenge Arena. Prove your geographic mastery.');
  }, []);

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
      speechManager.speak('Here is the step-by-step ICSE geographic explanation.');
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis registered! Now verify using the interactive simulation controls.');
  }, []);

  const handleWindSliderChange = useCallback((val: number) => {
    setWindSpeed(val);
    audioManager.play('count');
    if (val > 50 && predictionMade && !predictionVerified) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleMoonAngleChange = useCallback((val: number) => {
    setMoonAngle(val);
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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const order = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    const isCorrect = JSON.stringify(order) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Flawless order! The Earth systems sequence is correct.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Geographic mission complete! Exceptional mastery achieved.');
  }, [errors, onComplete]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const parsed = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (ans as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Accurate geographical reasoning!');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete geographical principle.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

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

  // Derived Values for Dynamic Render
  const tidalBulgeHeight = useMemo(() => {
    const isSpringAlignment = Math.abs(Math.cos((moonAngle * Math.PI) / 180));
    return 15 + isSpringAlignment * 25;
  }, [moonAngle]);

  const coriolisDeflectionText = useMemo(() => {
    if (selectedHemisphere === 'north') {
      return 'Northern Hemisphere: Deflection is to the RIGHT (Ferrel\'s Law) → NE Trades & SW Westerlies.';
    }
    return 'Southern Hemisphere: Deflection is to the LEFT (Ferrel\'s Law) → SE Trades & NW Westerlies.';
  }, [selectedHemisphere]);

  const orographicRainfallMM = useMemo(() => {
    return Math.round((mountainHeight / 100) * (coastalHumidity / 10) * 1.6);
  }, [mountainHeight, coastalHumidity]);

  const leewardRainfallMM = useMemo(() => {
    return Math.max(150, Math.round(orographicRainfallMM * 0.28));
  }, [orographicRainfallMM]);

  // Spaced Repetition Calculated Values
  const srsIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  const nextReviewDateString = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + srsIntervalDays);
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }, [srsIntervalDays]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* Top Header Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950/50"
            aria-label="Simulation icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">ICSE Class 9 Geography</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">NEP 2020 Aligned</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty Level */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
              <motion.button
                key={p}
                aria-label={`Switch to ${p} phase`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase(p);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                  phase === p
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </motion.button>
            ))}
          </div>

          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600/40'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-600/40'
                : 'bg-indigo-950/60 text-indigo-400 border-indigo-600/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-2">
              <span>🏜️</span>
              <span>SCENARIO INVESTIGATION: ARID DENUDATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              💡 <span className="text-slate-200 font-semibold">Geographer&apos;s Note:</span> {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-semibold text-amber-300 flex items-center gap-2">
              <span>❓</span>
              <span>Discovery Probe: {DISCOVERY_QUESTION.question}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium border transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="font-bold mr-2 text-emerald-400">
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : ''}
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Gravity binds heavy abrasive grains close to the soil floor.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="flex justify-end">
                  <motion.button
                    aria-label="Launch interactive labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-700/40 flex items-center gap-2"
                  >
                    <span>Launch Interactive Labs</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (Interactive Step-by-Step Labs) ─── */}
      {phase === 'explore' && (
        <div className="space-y-6">
          {/* Exploration Header & Nav */}
          <div className="flex flex-wrap items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 gap-3">
            <div>
              <span className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                aria-label="Previous lab slide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 text-xs font-semibold rounded-lg disabled:opacity-40 border border-slate-700 hover:bg-slate-700"
              >
                ← Prev Lab
              </motion.button>
              <span className="text-xs text-slate-400 font-mono">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Next lab slide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white rounded-lg shadow-md"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Advance to free sandbox"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-xs font-bold text-white rounded-lg shadow-md"
                >
                  Free Sandbox →
                </motion.button>
              )}
            </div>
          </div>

          <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-600/30 text-xs text-amber-300 flex items-center gap-2">
            <span>🔬</span>
            <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
          </div>

          {/* Interactive Visualizations Per Slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-6 min-h-[420px]"
            >
              {/* SLIDE 0: Aeolian Denudation & Mushroom Rock Sandbox */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Controls & Predict Area */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Aeolian Wind Controls</h4>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Wind Velocity:</span>
                        <span className="font-mono text-amber-400 font-bold">{windSpeed} km/h</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Wind velocity slider"
                        min={10}
                        max={100}
                        value={windSpeed}
                        onChange={e => handleWindSliderChange(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                      <span className="text-[10px] text-slate-400">Low (&lt;25 km/h: light dust) → Extreme (&gt;75 km/h: heavy sandblasting)</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Sand Sediment Concentration:</span>
                        <span className="font-mono text-amber-400 font-bold">{sandLoad}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Sand sediment concentration slider"
                        min={10}
                        max={100}
                        value={sandLoad}
                        onChange={e => setSandLoad(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    {/* Predict-then-check block */}
                    {!predictionMade && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <p className="text-xs text-amber-300 font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction choice ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {predictionMade && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs text-emerald-400 font-bold">✓ Hypothesis Verified!</span>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Notice how as wind speed rises above 50 km/h, the abrasive sand blast gouges the basal stem (0–1.5m) while leaving the hard upper cap intact.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* SVG Diagram Canvas */}
                  <div className="lg:col-span-2 relative bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center overflow-hidden">
                    <canvas ref={canvasRef} width={500} height={260} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
                    <svg viewBox="0 0 500 280" className="w-full max-h-[260px] relative z-10" aria-label="Mushroom rock cross section diagram">
                      {/* Desert Ground */}
                      <rect x="0" y="240" width="500" height="40" fill="#78350f" />
                      <line x1="0" y1="240" x2="500" y2="240" stroke="#f59e0b" strokeWidth="3" />

                      {/* Mushroom Rock: Protective Hard Cap */}
                      <path
                        d="M 170 100 Q 250 40 330 100 Q 300 130 200 130 Z"
                        fill="#b45309"
                        stroke="#d97706"
                        strokeWidth="2"
                      />
                      <text x="250" y="90" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="bold">
                        Hard Resistant Cap Rock
                      </text>

                      {/* Abraded Stem */}
                      <path
                        d={`M 220 130 Q ${250 - rockBaseWidth / 2} 185 225 240 L 275 240 Q ${250 + rockBaseWidth / 2} 185 280 130 Z`}
                        fill="#7c2d12"
                        stroke="#ea580c"
                        strokeWidth="2"
                      />
                      <text x="250" y="190" textAnchor="middle" fill="#fed7aa" fontSize="10">
                        Stem Base ({Math.round(rockBaseWidth)}px)
                      </text>

                      {/* Saltation Zone Indicator */}
                      <rect x="370" y="160" width="115" height="75" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" opacity="0.85" />
                      <text x="427" y="180" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">
                        SALTATION ZONE
                      </text>
                      <text x="427" y="195" textAnchor="middle" fill="#c7d2fe" fontSize="8">
                        Height: 0 – 1.8 m
                      </text>
                      <text x="427" y="210" textAnchor="middle" fill="#fcd34d" fontSize="8">
                        Max Sandblasting
                      </text>

                      {/* Wind Vector Arrows */}
                      <g opacity="0.85">
                        <path d="M 20 180 L 120 180 M 110 175 L 120 180 L 110 185" stroke="#38bdf8" strokeWidth="2.5" />
                        <text x="70" y="172" fill="#38bdf8" fontSize="9" textAnchor="middle">
                          Wind {windSpeed} km/h
                        </text>

                        <path d="M 30 220 L 140 220 M 130 215 L 140 220 L 130 225" stroke="#f59e0b" strokeWidth="3" />
                        <text x="85" y="212" fill="#f59e0b" fontSize="9" textAnchor="middle">
                          Bouncing Sand (Saltation)
                        </text>
                      </g>
                    </svg>

                    <div className="w-full mt-2 flex justify-between text-[11px] text-slate-400">
                      <span>Landform: Mushroom Rock (Sahara / Thar)</span>
                      <span>Erosive Agent: Aeolian Abrasion</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Hydrosphere & Tides Simulator */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Gravitational Tide Simulator</h4>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Moon Orbital Position:</span>
                        <span className="font-mono text-cyan-400 font-bold">{moonAngle}°</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Moon orbital angle slider"
                        min={0}
                        max={360}
                        step={15}
                        value={moonAngle}
                        onChange={e => handleMoonAngleChange(Number(e.target.value))}
                        className="w-full accent-cyan-500"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>0° (New Moon)</span>
                        <span>90° (Quarter)</span>
                        <span>180° (Full)</span>
                        <span>270° (Quarter)</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-semibold text-slate-300">Tidal Regime Analysis:</div>
                      <div className="text-xs text-emerald-400 font-bold">
                        {moonAngle === 0 || moonAngle === 180 || moonAngle === 360
                          ? '🌊 SPRING TIDE (Syzygy Alignment — Maximum Range)'
                          : moonAngle === 90 || moonAngle === 270
                          ? '💧 NEAP TIDE (Quadrature 90° — Minimum Range)'
                          : 'Intermediate Tidal Transition Range'}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Notice how both the side facing the Moon (direct gravity) and the side opposite (centrifugal force) create twin water bulges!
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-slate-300">Select Global Port Test:</span>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        {(
                          [
                            { id: 'fundy', label: 'Bay of Fundy (16m)' },
                            { id: 'kutch', label: 'Gulf of Kutch (6m)' },
                            { id: 'mumbai', label: 'Mumbai Port (4m)' },
                          ] as const
                        ).map(port => (
                          <button
                            key={port.id}
                            aria-label={`Select ${port.label}`}
                            onClick={() => setSelectedTidePort(port.id)}
                            className={`p-2 rounded text-[10px] font-semibold border ${
                              selectedTidePort === port.id
                                ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                                : 'bg-slate-800 border-slate-700 text-slate-400'
                            }`}
                          >
                            {port.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SVG Tide Orbit Diagram */}
                  <div className="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 500 260" className="w-full max-h-[260px]" aria-label="Earth Sun Moon gravitational tide diagram">
                      {/* Sun Representation */}
                      <circle cx="40" cy="130" r="30" fill="#f59e0b" filter="drop-shadow(0 0 15px rgba(245,158,11,0.6))" />
                      <text x="40" y="134" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">SUN</text>

                      {/* Gravitational Rays */}
                      <line x1="75" y1="130" x2="200" y2="130" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />

                      {/* Earth Center */}
                      <circle cx="260" cy="130" r="45" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="2" />
                      <text x="260" y="134" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">EARTH</text>

                      {/* Tidal Water Bulge Ellipse */}
                      <ellipse
                        cx="260"
                        cy="130"
                        rx={48 + tidalBulgeHeight * 0.4}
                        ry={46}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        strokeDasharray="6 3"
                        transform={`rotate(${moonAngle}, 260, 130)`}
                      />

                      {/* Moon Orbit Path */}
                      <circle cx="260" cy="130" r="100" fill="none" stroke="#334155" strokeDasharray="3 3" />

                      {/* Moon in Orbit */}
                      {(() => {
                        const rad = (moonAngle * Math.PI) / 180;
                        const mx = 260 + 100 * Math.cos(rad);
                        const my = 130 + 100 * Math.sin(rad);
                        return (
                          <g>
                            <circle cx={mx} cy={my} r="14" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
                            <text x={mx} y={my + 4} textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">MOON</text>
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="w-full flex justify-between text-[11px] text-slate-400 mt-2">
                      <span>Alignment: {moonAngle}° ({moonAngle % 180 === 0 ? 'Syzygy' : 'Quadrature'})</span>
                      <span>World Record: Bay of Fundy (Canada) — 16 Metres</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Atmospheric Pressure & Coriolis Wind Engine */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Planetary Winds & Coriolis</h4>

                    <div>
                      <span className="text-xs text-slate-300">Select Hemisphere:</span>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <button
                          aria-label="Select Northern Hemisphere"
                          onClick={() => setSelectedHemisphere('north')}
                          className={`p-2 rounded text-xs font-semibold border ${
                            selectedHemisphere === 'north'
                              ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          Northern Hemisphere
                        </button>
                        <button
                          aria-label="Select Southern Hemisphere"
                          onClick={() => setSelectedHemisphere('south')}
                          className={`p-2 rounded text-xs font-semibold border ${
                            selectedHemisphere === 'south'
                              ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          Southern Hemisphere
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-semibold text-emerald-400">Ferrel&apos;s Law Application:</span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{coriolisDeflectionText}</p>
                    </div>

                    <div>
                      <span className="text-xs text-slate-300">Standard Sea-Level Pressure:</span>
                      <div className="mt-1 p-2.5 bg-slate-800/80 rounded-lg text-xs font-mono text-emerald-400 border border-slate-700 flex justify-between">
                        <span>1013.25 mb / hPa</span>
                        <span>760 mm Hg (Torricelli)</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Pressure Belts & Wind Arrows */}
                  <div className="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 460 260" className="w-full max-h-[260px]" aria-label="Global planetary pressure belts and wind circulation">
                      {/* Globe Base */}
                      <circle cx="230" cy="130" r="115" fill="#0f172a" stroke="#475569" strokeWidth="2" />

                      {/* Pressure Belts */}
                      <path d="M 180 30 Q 230 40 280 30" stroke="#38bdf8" strokeWidth="6" fill="none" />
                      <text x="230" y="24" textAnchor="middle" fill="#38bdf8" fontSize="8">Polar High (90°N)</text>

                      <path d="M 140 68 Q 230 85 320 68" stroke="#f43f5e" strokeWidth="6" fill="none" />
                      <text x="230" y="64" textAnchor="middle" fill="#f43f5e" fontSize="8">Subpolar Low (60°N)</text>

                      <path d="M 120 100 Q 230 115 340 100" stroke="#38bdf8" strokeWidth="6" fill="none" />
                      <text x="230" y="96" textAnchor="middle" fill="#38bdf8" fontSize="8">Subtropical High (30°N - Horse Latitudes)</text>

                      <line x1="115" y1="130" x2="345" y2="130" stroke="#ec4899" strokeWidth="7" />
                      <text x="230" y="126" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Equatorial Low (Doldrums 0°)</text>

                      <path d="M 120 160 Q 230 145 340 160" stroke="#38bdf8" strokeWidth="6" fill="none" />
                      <text x="230" y="172" textAnchor="middle" fill="#38bdf8" fontSize="8">Subtropical High (30°S)</text>

                      <path d="M 140 192 Q 230 175 320 192" stroke="#f43f5e" strokeWidth="6" fill="none" />
                      <text x="230" y="204" textAnchor="middle" fill="#f43f5e" fontSize="8">Subpolar Low (60°S)</text>

                      <path d="M 180 230 Q 230 220 280 230" stroke="#38bdf8" strokeWidth="6" fill="none" />
                      <text x="230" y="242" textAnchor="middle" fill="#38bdf8" fontSize="8">Polar High (90°S)</text>

                      {/* Planetary Wind Deflected Arrows */}
                      {selectedHemisphere === 'north' ? (
                        <g stroke="#f59e0b" strokeWidth="2.5" fill="none">
                          <path d="M 270 105 L 240 125" />
                          <path d="M 210 105 L 180 125" />
                          <text x="285" y="118" fill="#f59e0b" fontSize="8">NE Trades</text>

                          <path d="M 190 95 L 220 75" />
                          <path d="M 240 95 L 270 75" />
                          <text x="290" y="85" fill="#38bdf8" fontSize="8">Westerlies</text>
                        </g>
                      ) : (
                        <g stroke="#f59e0b" strokeWidth="2.5" fill="none">
                          <path d="M 270 155 L 240 135" />
                          <path d="M 210 155 L 180 135" />
                          <text x="285" y="148" fill="#f59e0b" fontSize="8">SE Trades</text>
                        </g>
                      )}
                    </svg>

                    <div className="w-full flex justify-between text-[11px] text-slate-400 mt-2">
                      <span>Planetary Wind Systems: Trade Winds | Westerlies | Polar Easterlies</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Orographic Precipitation & Rain Shadow Cross-Section */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Orographic Rainfall Lab</h4>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Mountain Barrier Relief:</span>
                        <span className="font-mono text-blue-400 font-bold">{mountainHeight} m</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Mountain barrier height slider"
                        min={600}
                        max={3000}
                        step={100}
                        value={mountainHeight}
                        onChange={e => setMountainHeight(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Oceanic Vapour Humidity:</span>
                        <span className="font-mono text-blue-400 font-bold">{coastalHumidity}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Oceanic humidity slider"
                        min={40}
                        max={100}
                        value={coastalHumidity}
                        onChange={e => setCoastalHumidity(Number(e.target.value))}
                        className="w-full accent-cyan-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-semibold text-emerald-400">Calculated Rainfall Yield:</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-slate-900 rounded border border-blue-900/60">
                          <span className="text-slate-400">Windward (Mumbai):</span>
                          <p className="text-sm font-bold text-blue-400">{orographicRainfallMM} cm</p>
                        </div>
                        <div className="p-2 bg-slate-900 rounded border border-amber-900/60">
                          <span className="text-slate-400">Leeward (Pune):</span>
                          <p className="text-sm font-bold text-amber-400">{leewardRainfallMM} cm</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SVG Orographic Cross Section */}
                  <div className="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 500 260" className="w-full max-h-[260px]" aria-label="Orographic mountain relief rainfall diagram">
                      {/* Ocean Body */}
                      <rect x="0" y="210" width="120" height="50" fill="#0369a1" />
                      <text x="60" y="240" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="bold">Arabian Sea</text>

                      {/* Mountain Profile (Western Ghats) */}
                      <path
                        d={`M 120 210 Q 180 180 250 ${240 - mountainHeight * 0.05} Q 320 180 440 210 L 500 210 L 500 260 L 120 260 Z`}
                        fill="#15803d"
                        stroke="#22c55e"
                        strokeWidth="2"
                      />

                      {/* Windward Moist Ascending Air */}
                      <g stroke="#38bdf8" strokeWidth="2" fill="none">
                        <path d="M 70 190 Q 140 170 200 130" />
                        <path d="M 90 170 Q 160 150 220 110" />
                      </g>

                      {/* Windward Rain Cloud */}
                      <ellipse cx="210" cy="90" rx="35" ry="18" fill="#475569" opacity="0.9" />
                      <ellipse cx="235" cy="80" rx="25" ry="16" fill="#64748b" opacity="0.9" />
                      <text x="220" y="90" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Condensation</text>

                      {/* Rain Drops Windward */}
                      <line x1="180" y1="120" x2="175" y2="150" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="2" />
                      <line x1="200" y1="120" x2="195" y2="150" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="2" />
                      <line x1="220" y1="120" x2="215" y2="150" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="2" />

                      {/* Leeward Dry Descending Air */}
                      <g stroke="#f59e0b" strokeWidth="2" fill="none">
                        <path d="M 280 110 Q 340 150 420 190" />
                      </g>
                      <text x="360" y="140" fill="#f59e0b" fontSize="9" fontWeight="bold">
                        Descending Air Warms
                      </text>

                      {/* Labels */}
                      <rect x="130" y="225" width="85" height="22" rx="4" fill="#0f172a" stroke="#38bdf8" />
                      <text x="172" y="240" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Mumbai Coast</text>

                      <rect x="360" y="225" width="110" height="22" rx="4" fill="#0f172a" stroke="#f59e0b" />
                      <text x="415" y="240" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Deccan Rain Shadow</text>
                    </svg>

                    <div className="w-full flex justify-between text-[11px] text-slate-400 mt-2">
                      <span>Windward: Adiabatic Cooling & Condensation</span>
                      <span>Leeward: Adiabatic Compression & Dry Rain Shadow</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Biome Explorer & Insolation Heat Balance */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* Visual Subtabs */}
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <div className="flex gap-2">
                      {(['diagram', 'chart'] as const).map(tab => (
                        <button
                          key={tab}
                          aria-label={`Switch to ${tab} view`}
                          onClick={() => setActiveTabVisual(tab)}
                          className={`px-3 py-1 rounded text-xs font-semibold capitalize ${
                            activeTabVisual === tab
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {tab} View
                        </button>
                      ))}
                    </div>

                    <span className="text-xs text-slate-400 font-mono">8 Natural World Regions</span>
                  </div>

                  {activeTabVisual === 'diagram' ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Biome Selection Buttons */}
                      <div className="space-y-2">
                        {[
                          { lat: 5, name: 'Equatorial Rainforest (0-10°)' },
                          { lat: 15, name: 'Tropical Savanna (10-20°)' },
                          { lat: 25, name: 'Tropical Desert (20-30°)' },
                          { lat: 35, name: 'Mediterranean (30-45°)' },
                          { lat: 50, name: 'Temperate Grassland' },
                          { lat: 60, name: 'Taiga Coniferous' },
                          { lat: 75, name: 'Arctic Tundra (>70°)' },
                        ].map(b => (
                          <button
                            key={b.lat}
                            aria-label={`Select ${b.name}`}
                            onClick={() => setSelectedBiomeLat(b.lat)}
                            className={`w-full text-left p-2 rounded text-xs border transition-all ${
                              selectedBiomeLat === b.lat
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                            }`}
                          >
                            {b.name}
                          </button>
                        ))}
                      </div>

                      {/* Selected Biome Detailed Dashboard */}
                      <div className="md:col-span-3 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-base font-bold text-white">
                              {selectedBiomeLat === 5 && '🌴 Equatorial Biome (Amazon & Congo Basins)'}
                              {selectedBiomeLat === 15 && '🦁 Tropical Savanna Grasslands (Sudan & Llanos)'}
                              {selectedBiomeLat === 25 && '🏜️ Tropical Arid Desert (Sahara, Thar, Atacama)'}
                              {selectedBiomeLat === 35 && '🍇 Mediterranean Region (California & S. Europe)'}
                              {selectedBiomeLat === 50 && '🌾 Temperate Grasslands (Steppes, Prairies, Pampas)'}
                              {selectedBiomeLat === 60 && '🌲 Taiga Coniferous Forest (Siberia & Canada)'}
                              {selectedBiomeLat === 75 && '❄️ Arctic Tundra & Permafrost Zone'}
                            </h3>
                            <span className="text-xs text-emerald-400 font-mono">
                              Latitude Position: ~{selectedBiomeLat}° North/South
                            </span>
                          </div>
                          <span className="px-2.5 py-1 bg-emerald-900/40 text-emerald-300 border border-emerald-600/40 text-xs rounded-full">
                            ICSE Core Biome
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block mb-1">Mean Temp / Solar Angle:</span>
                            <span className="font-bold text-amber-400">
                              {selectedBiomeLat === 5 && '27°C (Vertical Rays)'}
                              {selectedBiomeLat === 15 && '24°C (Hot wet/dry season)'}
                              {selectedBiomeLat === 25 && '>40°C (High Diurnal Range)'}
                              {selectedBiomeLat === 35 && 'Dry Summer (22°C) / Wet Winter (10°C)'}
                              {selectedBiomeLat === 50 && 'Continental (-10°C to 25°C)'}
                              {selectedBiomeLat === 60 && 'Long Cold Winter (-30°C)'}
                              {selectedBiomeLat === 75 && '<0°C Most of Year'}
                            </span>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block mb-1">Precipitation Pattern:</span>
                            <span className="font-bold text-blue-400">
                              {selectedBiomeLat === 5 && 'Heavy Daily 4 o\'Clock Convection (>200cm)'}
                              {selectedBiomeLat === 15 && 'Distinct Summer Wet / Winter Dry'}
                              {selectedBiomeLat === 25 && 'Hyper-Arid (<25 cm)'}
                              {selectedBiomeLat === 35 && 'WET WINTERS / Dry Summers (Unique!)'}
                              {selectedBiomeLat === 50 && 'Moderate Summer Showers'}
                              {selectedBiomeLat === 60 && 'Snowfall in Winter'}
                              {selectedBiomeLat === 75 && 'Scant Snow (<15 cm)'}
                            </span>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                            <span className="text-slate-400 block mb-1">Vegetation & Fauna:</span>
                            <span className="font-bold text-emerald-400">
                              {selectedBiomeLat === 5 && 'Dense Canopy, Mahogany, Jaguar, Toucan'}
                              {selectedBiomeLat === 15 && 'Baobab, Acacia, Giraffe, Zebra, Lion'}
                              {selectedBiomeLat === 25 && 'Xerophytes, Date Palm, Camels, Fennec'}
                              {selectedBiomeLat === 35 && 'Chaparral, Cork Oak, Olives, Vineyards'}
                              {selectedBiomeLat === 50 && 'Nutritious Grasses, Bison, Wild Horses'}
                              {selectedBiomeLat === 60 && 'Pine, Spruce, Fir, Wolves, Reindeer'}
                              {selectedBiomeLat === 75 && 'Mosses, Lichens, Arctic Fox, Polar Bear'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[280px] bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={CLIMATE_GRAPH_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="month" stroke="#94a3b8" />
                          <YAxis yAxisId="left" stroke="#38bdf8" label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', fill: '#38bdf8' }} />
                          <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" label={{ value: 'Temp (°C)', angle: 90, position: 'insideRight', fill: '#f59e0b' }} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                          <Legend />
                          <Bar yAxisId="left" dataKey="rainfallMumbai" name="Mumbai Rainfall (mm)" fill="#38bdf8" />
                          <Bar yAxisId="left" dataKey="rainfallDelhi" name="Delhi Rainfall (mm)" fill="#6366f1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─── 3. SANDBOX PHASE (Free Play & Variable Manipulation) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎮</span>
                <span>Earth Systems Free Simulation Sandbox</span>
              </h2>
              <p className="text-xs text-slate-400">
                Freely experiment with all atmospheric, oceanic, and denudation variables without grading constraints.
              </p>
            </div>
            <motion.button
              aria-label="Advance to graded challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/40"
            >
              Ready for Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Box 1: Aeolian Denudation */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase">1. Aeolian Abrasion Engine</span>
              <div>
                <label className="text-[11px] text-slate-300 flex justify-between">
                  <span>Wind Speed:</span>
                  <span className="font-mono text-amber-400">{windSpeed} km/h</span>
                </label>
                <input
                  type="range"
                  aria-label="Sandbox wind velocity slider"
                  min={10}
                  max={100}
                  value={windSpeed}
                  onChange={e => setWindSpeed(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div className="p-2.5 bg-slate-950 rounded text-[11px] text-slate-400">
                Stem Diameter: <span className="text-white font-bold">{Math.round(rockBaseWidth)} mm</span> | Saltation Kinetic Energy:{' '}
                <span className="text-emerald-400 font-bold">{Math.round(windSpeed * 1.8)} Joules</span>
              </div>
            </div>

            {/* Box 2: Tides & Moon Quadrature */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase">2. Lunar Syzygy / Quadrature</span>
              <div>
                <label className="text-[11px] text-slate-300 flex justify-between">
                  <span>Moon Angle:</span>
                  <span className="font-mono text-cyan-400">{moonAngle}°</span>
                </label>
                <input
                  type="range"
                  aria-label="Sandbox moon angle slider"
                  min={0}
                  max={360}
                  step={15}
                  value={moonAngle}
                  onChange={e => setMoonAngle(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
              <div className="p-2.5 bg-slate-950 rounded text-[11px] text-slate-400">
                Tidal Amplitude: <span className="text-white font-bold">{Math.round(tidalBulgeHeight * 0.4)} m</span> | Status:{' '}
                <span className="text-cyan-400 font-bold">{moonAngle % 180 === 0 ? 'Spring Tide' : 'Neap Tide'}</span>
              </div>
            </div>

            {/* Box 3: Relief Precipitation */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase">3. Mountain Orographic Barrier</span>
              <div>
                <label className="text-[11px] text-slate-300 flex justify-between">
                  <span>Relief Height:</span>
                  <span className="font-mono text-blue-400">{mountainHeight} m</span>
                </label>
                <input
                  type="range"
                  aria-label="Sandbox mountain height slider"
                  min={500}
                  max={3000}
                  step={100}
                  value={mountainHeight}
                  onChange={e => setMountainHeight(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
              <div className="p-2.5 bg-slate-950 rounded text-[11px] text-slate-400">
                Windward Rain: <span className="text-blue-400 font-bold">{orographicRainfallMM} cm</span> | Rain Shadow:{' '}
                <span className="text-amber-400 font-bold">{leewardRainfallMM} cm</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (Adaptive ICSE Examination Arena) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress */}
          <div className="flex flex-wrap items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Node: {challenge.nodeId}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40 capitalize">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">{challenge.question}</h3>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600/40'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/60 text-rose-400 border-rose-600/40'
                  : 'bg-indigo-950/60 text-indigo-400 border-indigo-600/40'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Render Challenge by Type */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            {/* Type: Classify, Distinguish, Match (MCQ) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition-all ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50'
                          : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-2 text-emerald-400">
                        {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Type: Drag-Label onto Diagram */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items into the diagram slots:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <svg viewBox="0 0 500 240" className="w-full bg-slate-950 rounded-xl border border-slate-800" aria-label="Drop target diagram for aeolian landforms">
                  {/* Top Target */}
                  <rect x="150" y="20" width="200" height="40" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="250" y="45" textAnchor="middle" fill="#94a3b8" fontSize="11">
                    {droppedLabels.part_top || '[ Drop: Hard Resistant Cap ]'}
                  </text>
                  <rect
                    x="150"
                    y="20"
                    width="200"
                    height="40"
                    fill="transparent"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_top')}
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Base Target */}
                  <rect x="150" y="80" width="200" height="40" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="250" y="105" textAnchor="middle" fill="#94a3b8" fontSize="11">
                    {droppedLabels.part_base || '[ Drop: Abraded Narrow Stem ]'}
                  </text>
                  <rect
                    x="150"
                    y="80"
                    width="200"
                    height="40"
                    fill="transparent"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_base')}
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Hollow Target */}
                  <rect x="50" y="150" width="180" height="40" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="140" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    {droppedLabels.part_hollow || '[ Drop: Deflation Hollow ]'}
                  </text>
                  <rect
                    x="50"
                    y="150"
                    width="180"
                    height="40"
                    fill="transparent"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_hollow')}
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Horns Target */}
                  <rect x="270" y="150" width="180" height="40" rx="6" fill="#1e293b" stroke="#475569" />
                  <text x="360" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10">
                    {droppedLabels.part_horns || '[ Drop: Barchan Dune Horns ]'}
                  </text>
                  <rect
                    x="270"
                    y="150"
                    width="180"
                    height="40"
                    fill="transparent"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('part_horns')}
                    style={{ cursor: 'pointer' }}
                  />
                </svg>

                <motion.button
                  aria-label="Verify diagram label placement"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Type: Drag-Sort Items */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or rearrange items into the correct chronological or vertical sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      role="button"
                      aria-label={`Sortable layer ${displayIndex + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-emerald-400 mr-2">{displayIndex + 1}.</strong>
                        {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Submit sorted sequence"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Sequence
                </motion.button>
              </div>
            )}

            {/* Type: Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Numerical answer input"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-sm font-bold text-slate-300">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check numerical value"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* Type: Construct Part Sequence */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add step: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[90px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 text-emerald-200 border border-emerald-600/50 rounded-lg text-xs flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        aria-label={`Remove step ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click parts above to construct the chain</span>
                  )}
                </div>

                <motion.button
                  aria-label="Validate construct sequence chain"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Validate Chain
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-700/50 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    📘 ICSE Board Scientific Walkthrough
                  </span>
                  <span className="text-[10px] text-slate-400">Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-emerald-400 mr-1.5">{i + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Reveal next explanation step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg"
                    >
                      Next Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Advance to next challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-800/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Expedition →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE (Performance Audit & Reflection) ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-3xl border border-emerald-600/40 shadow-2xl text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30"
            >
              🎓
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">Geographic Systems Expedition Mastered!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully completed the comprehensive ICSE Class 9 physical geography simulation covering denudation, tides, oceanic currents, atmospheric lapse rates, planetary wind belts, and biomes.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block mb-1">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</span>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block mb-1">Mastery Status</span>
                <span className="text-2xl font-black text-cyan-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-800/40 text-xs text-emerald-200 leading-relaxed">
            {errors === 0
              ? '🌟 FLAWLESS EXPEDITION! You demonstrated complete conceptual accuracy across all 10 ICSE geography nodes!'
              : errors <= 3
              ? '✨ OUTSTANDING WORK! You possess strong analytical capabilities in Earth systems and physical geography.'
              : '🌱 GOOD EFFORT! Review the specific misconception corrections below to solidify your geographic understanding.'}
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/40 space-y-3">
              <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span>
                <span>Personalised Misconception Diagnostics</span>
              </h4>
              <p className="text-xs text-slate-400">Review these specific concepts to prevent errors on the ICSE board paper:</p>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Enhanced Spaced Repetition Visibility Card */}
          <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 rounded-2xl border-2 border-amber-500/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-700/30 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl p-2 bg-amber-500/20 rounded-xl border border-amber-500/40">📅</span>
                <div>
                  <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wide">
                    Spaced Repetition Schedule (SM-2 SRS Algorithm)
                  </h4>
                  <p className="text-xs text-slate-300">
                    Targeted revision timeline designed for long-term memory consolidation
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-full">
                {errors === 0 ? 'Optimal Retention' : errors <= 3 ? 'Reinforcement Needed' : 'Immediate Remediation'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Challenge Errors</span>
                <span className="text-xl font-black text-white">{errors}</span>
                <span className="text-[10px] text-slate-400 mt-1">{errors === 0 ? '0 mistakes' : `${errors} mistake(s)`}</span>
              </div>

              <div className="p-3.5 bg-amber-950/40 rounded-xl border-2 border-amber-500/60 flex flex-col items-center text-center shadow-inner">
                <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider mb-1">Next Review In</span>
                <span className="text-2xl font-black text-amber-400">
                  {srsIntervalDays} {srsIntervalDays === 1 ? 'Day' : 'Days'}
                </span>
                <span className="text-[10px] text-amber-200/80 mt-1 font-semibold">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </div>

              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Scheduled Date</span>
                <span className="text-base font-bold text-emerald-400">{nextReviewDateString}</span>
                <span className="text-[10px] text-slate-400 mt-1">Calendar Notification Set</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
              💡 <strong className="text-amber-300">SRS Rule:</strong> Students with 0 errors review in <strong>7 days</strong>, 1–3 errors review in <strong>3 days</strong>, and 4+ errors review in <strong>1 day</strong>. Spaced testing strengthens neural pathways and ensures permanent mastery for board exams.
            </p>
          </div>

          {/* Real-World Field Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🧭</span>
              <span>{REAL_WORLD_ACTIVITY.title}</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 flex gap-2">
                  <span className="font-bold text-emerald-400">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Auxiliary Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ICSE Simulation Objective Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_GeographyDenudationWindWorkSim;
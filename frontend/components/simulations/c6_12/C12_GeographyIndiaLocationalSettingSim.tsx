'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  Legend
} from 'recharts';

// ─── NODE IDS (String Literals for System Verification) ───
const NODE_C12_GEO_001 = 'c12_geo_001';
const NODE_C12_GEO_002 = 'c12_geo_002';
const NODE_C12_GEO_003 = 'c12_geo_003';
const NODE_C12_GEO_004 = 'c12_geo_004';
const NODE_C12_GEO_005 = 'c12_geo_005';
const NODE_C12_GEO_006 = 'c12_geo_006';
const NODE_C12_GEO_007 = 'c12_geo_007';
const NODE_C12_GEO_008 = 'c12_geo_008';
const NODE_C12_GEO_009 = 'c12_geo_009';
const NODE_C12_GEO_010 = 'c12_geo_010';

const ALL_NODE_IDS = [
  NODE_C12_GEO_001,
  NODE_C12_GEO_002,
  NODE_C12_GEO_003,
  NODE_C12_GEO_004,
  NODE_C12_GEO_005,
  NODE_C12_GEO_006,
  NODE_C12_GEO_007,
  NODE_C12_GEO_008,
  NODE_C12_GEO_009,
  NODE_C12_GEO_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Monsoon & the Physical Geography of the Subcontinent',
  intro: 'You are appointed as the Chief Geospatial Analyst for the National Geographic Planning Commission of India. A major meteorological and territorial briefing is underway.',
  context: 'From the tectonics of the Himalayas and the ancient basalt of the Deccan to the seasonal reversal of the ITCZ and monsoon sea-lanes, you must analyse and master India\'s physical setting, drainage basins, and climate dynamics.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Observe India\'s peninsular shape projecting into the Indian Ocean. What is the fundamental strategic & climatic advantage of this position?',
  options: [
    'It acts as a natural pivot commanding East-West maritime sea lanes and divides the incoming monsoon into two distinct moisture-bearing branches.',
    'It isolates India completely from trade with Central Asia and Africa.',
    'It ensures that both northern and southern India have identical temperate climates.',
    'It causes all major rivers to flow strictly into the Arabian Sea.',
  ],
  correctIndex: 0,
  hintAfter: 'Notice how India splits the northern Indian Ocean into the Arabian Sea and Bay of Bengal, shaping both global maritime traffic and the dual-branch monsoon engine!',
};

// ─── CLIMATIC GRAPH DATA (Five Contrasting Indian Stations) ───
interface StationClimateData {
  month: string;
  temp: number; // in °C
  rainfall: number; // in mm
}

const CLIMATE_STATIONS: Record<string, { name: string; state: string; desc: string; data: StationClimateData[] }> = {
  mumbai: {
    name: 'Mumbai (Coastal Tropical Maritime)',
    state: 'Maharashtra',
    desc: 'Equable temperatures (modest annual range ~5-6°C) with an explosive June-September SW Monsoon rainfall spike exceeding 2000 mm.',
    data: [
      { month: 'Jan', temp: 24, rainfall: 2 },
      { month: 'Feb', temp: 25, rainfall: 1 },
      { month: 'Mar', temp: 27, rainfall: 1 },
      { month: 'Apr', temp: 29, rainfall: 2 },
      { month: 'May', temp: 31, rainfall: 15 },
      { month: 'Jun', temp: 30, rainfall: 520 },
      { month: 'Jul', temp: 28, rainfall: 710 },
      { month: 'Aug', temp: 28, rainfall: 490 },
      { month: 'Sep', temp: 28, rainfall: 310 },
      { month: 'Oct', temp: 29, rainfall: 60 },
      { month: 'Nov', temp: 28, rainfall: 15 },
      { month: 'Dec', temp: 26, rainfall: 3 },
    ],
  },
  delhi: {
    name: 'Delhi (Subtropical Continental / Semi-Arid)',
    state: 'National Capital Territory',
    desc: 'Extreme continental range (7°C winter min to >42°C summer max), with moderate monsoon rainfall in July-Aug and light winter rain from Western Disturbances.',
    data: [
      { month: 'Jan', temp: 14, rainfall: 19 },
      { month: 'Feb', temp: 17, rainfall: 20 },
      { month: 'Mar', temp: 23, rainfall: 15 },
      { month: 'Apr', temp: 29, rainfall: 10 },
      { month: 'May', temp: 34, rainfall: 25 },
      { month: 'Jun', temp: 34, rainfall: 75 },
      { month: 'Jul', temp: 31, rainfall: 240 },
      { month: 'Aug', temp: 30, rainfall: 235 },
      { month: 'Sep', temp: 29, rainfall: 120 },
      { month: 'Oct', temp: 26, rainfall: 15 },
      { month: 'Nov', temp: 20, rainfall: 5 },
      { month: 'Dec', temp: 15, rainfall: 10 },
    ],
  },
  chennai: {
    name: 'Chennai (Coromandel Coast - Tropical Wet & Dry)',
    state: 'Tamil Nadu',
    desc: 'Warm year-round. Stays in the rain shadow during the SW Monsoon (June-Sept), receiving ~60% of annual rainfall from the Retreating / NE Monsoon in Oct-Nov.',
    data: [
      { month: 'Jan', temp: 25, rainfall: 25 },
      { month: 'Feb', temp: 26, rainfall: 10 },
      { month: 'Mar', temp: 28, rainfall: 10 },
      { month: 'Apr', temp: 31, rainfall: 15 },
      { month: 'May', temp: 33, rainfall: 40 },
      { month: 'Jun', temp: 33, rainfall: 55 },
      { month: 'Jul', temp: 31, rainfall: 100 },
      { month: 'Aug', temp: 30, rainfall: 140 },
      { month: 'Sep', temp: 30, rainfall: 130 },
      { month: 'Oct', temp: 28, rainfall: 310 },
      { month: 'Nov', temp: 26, rainfall: 380 },
      { month: 'Dec', temp: 25, rainfall: 140 },
    ],
  },
  jaisalmer: {
    name: 'Jaisalmer (Thar Desert - Arid Continental)',
    state: 'Rajasthan',
    desc: 'Scorching summer temperatures (>45°C), high diurnal range, and negligible annual precipitation (<200 mm).',
    data: [
      { month: 'Jan', temp: 15, rainfall: 3 },
      { month: 'Feb', temp: 19, rainfall: 4 },
      { month: 'Mar', temp: 25, rainfall: 3 },
      { month: 'Apr', temp: 31, rainfall: 2 },
      { month: 'May', temp: 36, rainfall: 7 },
      { month: 'Jun', temp: 37, rainfall: 25 },
      { month: 'Jul', temp: 34, rainfall: 65 },
      { month: 'Aug', temp: 32, rainfall: 55 },
      { month: 'Sep', temp: 32, rainfall: 18 },
      { month: 'Oct', temp: 28, rainfall: 2 },
      { month: 'Nov', temp: 22, rainfall: 1 },
      { month: 'Dec', temp: 16, rainfall: 2 },
    ],
  },
  leh: {
    name: 'Leh (Trans-Himalayan Cold High-Altitude Desert)',
    state: 'Ladakh',
    desc: 'Situated at 3,500m elevation in the rain shadow of the Great Himalayas. Severe sub-zero winters (-14°C) with scant precipitation (~100 mm/year).',
    data: [
      { month: 'Jan', temp: -8, rainfall: 10 },
      { month: 'Feb', temp: -5, rainfall: 8 },
      { month: 'Mar', temp: 0, rainfall: 12 },
      { month: 'Apr', temp: 6, rainfall: 6 },
      { month: 'May', temp: 10, rainfall: 7 },
      { month: 'Jun', temp: 15, rainfall: 5 },
      { month: 'Jul', temp: 18, rainfall: 15 },
      { month: 'Aug', temp: 17, rainfall: 16 },
      { month: 'Sep', temp: 13, rainfall: 9 },
      { month: 'Oct', temp: 6, rainfall: 4 },
      { month: 'Nov', temp: 0, rainfall: 3 },
      { month: 'Dec', temp: -5, rainfall: 8 },
    ],
  },
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation Recall - Locational Extent
  {
    id: 'ch_geo_001',
    nodeId: NODE_C12_GEO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the precise mainland latitudinal and longitudinal extent of India (including minutes and directions)?',
    options: [
      '8°4\'N to 37°6\'N latitude and 68°7\'E to 97°25\'E longitude',
      '8°N to 37°N latitude and 68°E to 97°E longitude',
      '6°45\'N to 35°8\'N latitude and 65°5\'E to 95°20\'E longitude',
      '8°4\'S to 37°6\'N latitude and 68°7\'W to 97°25\'E longitude',
    ],
    correctIndex: 0,
    explanation: 'India\'s mainland extends between 8°4\'N (Kanyakumari) and 37°6\'N (Indira Col in the Karakoram), spanning ~3,214 km N-S, and 68°7\'E (Gujarat) to 97°25\'E (Arunachal Pradesh), spanning ~2,933 km W-E. The CISCE board strictly demands exact angular values with minutes and N/E designations.',
    hints: [
      'Recall that India lies entirely in the Northern and Eastern Hemispheres.',
      'Look for the exact minutes: 4 minutes in the south, 6 in the north; 7 in the west, 25 in the east.',
      'The southern tip is 8°4\'N and the easternmost point is 97°25\'E.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation Numeric - Coastline & Frontiers
  {
    id: 'ch_geo_002',
    nodeId: NODE_C12_GEO_001,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the total length of India\'s coastline including the Andaman & Nicobar and Lakshadweep Island territories?',
    correctAnswer: 7516,
    tolerance: 10,
    unit: 'km',
    explanation: 'While the mainland coastline is ~6,100 km, the total coastline including the island territories measures approximately 7,516.6 km (~7,516 km). India\'s land frontier is ~15,200 km.',
    hints: [
      'The mainland alone is 6,100 km.',
      'Adding the island groups adds over 1,400 km.',
      'The total figure rounded to nearest integer is 7,516 km.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Foundation Drag-Label - Relief Belts of Northern Plains
  {
    id: 'ch_geo_003',
    nodeId: NODE_C12_GEO_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each characteristic description to the correct foothill relief belt of the Indo-Gangetic Plains from North to South.',
    dragItems: [
      { label: 'Bhabar (Porous Gravel Belt)', targetId: 'belt_1' },
      { label: 'Tarai (Marshy Spring Zone)', targetId: 'belt_2' },
      { label: 'Bhangar (Older Floodplain Alluvium)', targetId: 'belt_3' },
      { label: 'Khadar (New Fertile Silt Belt)', targetId: 'belt_4' },
    ],
    correctMapping: {
      belt_1: 'Bhabar (Porous Gravel Belt)',
      belt_2: 'Tarai (Marshy Spring Zone)',
      belt_3: 'Bhangar (Older Floodplain Alluvium)',
      belt_4: 'Khadar (New Fertile Silt Belt)',
    },
    explanation: 'From the foot of the Shiwaliks southward, the succession is: (1) Bhabar (pebbles/gravel where streams sink underground), (2) Tarai (marshy belt where subterranean streams re-emerge), (3) Bhangar (older, higher alluvium with kankar), and (4) Khadar (fresh annual river silt renewed during monsoons).',
    hints: [
      'The northernmost strip right beneath the Shiwaliks is where streams disappear into coarse boulders.',
      'Directly south of the boulder belt lies the swampy, waterlogged re-emergence zone.',
      'Khadar is the lowest, annually inundated fresh alluvial strip.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation Classify - Tropic of Cancer
  {
    id: 'ch_geo_004',
    nodeId: NODE_C12_GEO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Tropic of Cancer (23°30\'N) passes through how many Indian states, and into what two climatic zones does it divide India?',
    options: [
      '8 states; dividing India into a Tropical south and Subtropical (Temperate) north',
      '6 states; dividing India into an Arid west and Humid east',
      '10 states; dividing India into Monsoon and Equatorial zones',
      '8 states; dividing India into Alpine north and Marine south',
    ],
    correctIndex: 0,
    explanation: 'The Tropic of Cancer (23°30\'N) passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram. It bisects the country into the tropical zone south of 23°30\'N (year-round warm temperatures) and the subtropical zone north of it (marked seasonal thermal variations).',
    hints: [
      'Count: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram.',
      'The southern half is near the equator, while the northern half experiences cooler winters.',
      'It creates Tropical (south) and Subtropical (north) zones across 8 states.',
    ],
  },
  // 5. Standard Application - Western Disturbances
  {
    id: 'ch_geo_005',
    nodeId: NODE_C12_GEO_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A farmer in Punjab experiences light winter showers and cloudy skies in January that significantly boost the Rabi wheat crop. What meteorological phenomenon is directly responsible?',
    options: [
      'Western Disturbances (extra-tropical temperate cyclones steered by the Subtropical Westerly Jet Stream)',
      'Tropical cyclones originating in the Bay of Bengal',
      'The Arabian Sea branch of the South-West Monsoon',
      'Convectional thunderstorms known locally as Kalbaisakhi',
    ],
    correctIndex: 0,
    explanation: 'Western Disturbances are shallow extra-tropical (temperate) cyclonic depressions that originate over the Mediterranean Sea and are steered eastward across Iran and Pakistan by the Subtropical Westerly Jet Stream, bringing vital winter rainfall (10-25 mm) to Punjab, Haryana, and western UP for Rabi wheat cultivation.',
    hints: [
      'These storms originate in the Mediterranean region and travel eastward during winter.',
      'They are temperate (extra-tropical) cyclones, NOT tropical Bay of Bengal storms.',
      'They are steered by high-altitude westerly jet streams south of the Himalayas.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Standard Drag-Sort - Himalayan Geological Evolution
  {
    id: 'ch_geo_006',
    nodeId: NODE_C12_GEO_002,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the chronological sequence of tectonic events in the geological formation of the Himalayas from earliest to most recent.',
    sortItems: [
      'Tethys Geosyncline lies between Angaraland (north) and Gondwanaland (south)',
      'Rivers deposit thick layers of marine sediments into the Tethys trough over millions of years',
      'Indian Plate breaks from Gondwanaland and drifts northward in the Tertiary Era',
      'Compressional collision with Eurasian Plate crumples Tethys sediments into fold mountains',
      'Deposition of alluvium in the foredeep by Indus-Ganga-Brahmaputra creating the Great Plains',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The geosynclinal and plate-tectonic chain: (1) Tethys Sea geosyncline, (2) Marine sediment accumulation, (3) Northward drift of the Indian shield in the Tertiary era, (4) Collision buckling sediments into the Himadri, Himachal, and Shiwalik fold ranges, and (5) Quaternary foredeep filling creating the Great Plains.',
    hints: [
      'Start with the ancient Tethys Sea and its sediment deposition.',
      'Next comes the northward continental drift of the Indian plate during the Tertiary era.',
      'The formation of the fertile northern plains by alluvium filling the foredeep is the youngest Quaternary event.',
    ],
  },
  // 7. Standard Match - River Sources & Systems
  {
    id: 'ch_geo_007',
    nodeId: NODE_C12_GEO_007,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following river-to-exact-geographical-source pairings is strictly CORRECT according to CISCE Class 12 specifications?',
    options: [
      'Godavari: Trimbakeshwar near Nashik; Narmada: Amarkantak Plateau; Kaveri: Talakaveri in Brahmagiri Hills',
      'Godavari: Mahabaleshwar; Narmada: Multai; Kaveri: Amarkantak',
      'Godavari: Western Ghats general ridge; Narmada: Vindhyan scarps; Kaveri: Nilgiri peak',
      'Godavari: Rakas Lake; Narmada: Gangotri; Kaveri: Mansarovar',
    ],
    correctIndex: 0,
    explanation: 'Examiners penalise vague answers like "Western Ghats". The exact sources are: Godavari -> Trimbakeshwar (near Nashik); Krishna -> Mahabaleshwar; Kaveri -> Brahmagiri Hills (Talakaveri); Narmada -> Amarkantak; Tapi -> Multai (Betul district).',
    hints: [
      'The Godavari originates specifically at Trimbakeshwar.',
      'The Narmada rises at the holy springs of Amarkantak in Madhya Pradesh.',
      'The Kaveri rises in the Brahmagiri Hills of Karnataka.',
    ],
  },
  // 8. Standard Analysis - Mumbai vs Pune Rain Shadow
  {
    id: 'ch_geo_008',
    nodeId: NODE_C12_GEO_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Mumbai receives over 2,200 mm of rainfall during June-September, while Pune (only ~150 km inland east of the Western Ghats) receives barely 650 mm. Why?',
    options: [
      'The Western Ghats act as an orographic wall: windward slopes (Mumbai/Konkan) force moisture-laden air to rise and condense, while leeward slopes (Pune) experience descending, warming, desiccated air (rain shadow effect).',
      'Pune is located in the Subtropical High Pressure belt while Mumbai is on the Equator.',
      'The Arabian Sea branch loses all its moisture due to cold ocean currents before reaching Pune.',
      'Dense urban heat islands in Mumbai attract cyclonic depressions that repel clouds from Pune.',
    ],
    correctIndex: 0,
    explanation: 'The Western Ghats form an unbroken escarpment perpendicular to the SW Monsoon. On the windward side, moisture ascends, expands adiabatically, cools, and yields torrential orographic rainfall. Descending on the eastern leeward flank, the air compresses and warms, lowering its relative humidity and creating a semi-arid rain-shadow over the Deccan interior (Pune, Ahmednagar, Solapur).',
    hints: [
      'Think about what happens to air as it is forced UP a mountain vs when it travels DOWN the other side.',
      'Rising air cools and condenses (rain); sinking air warms and dries out.',
      'Pune lies on the leeward (rain-shadow) side of the Sahyadri range.',
    ],
  },
  // 9. Standard Distinguish - SW Monsoon vs Retreating Monsoon
  {
    id: 'ch_geo_009',
    nodeId: NODE_C12_GEO_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do the South-West Monsoon and the Retreating (North-East) Monsoon fundamentally differ in wind direction, active season, and primary rainfall zone?',
    options: [
      'SW Monsoon: June-Sept, blows Sea-to-Land (South-Westerly), waters most of India; Retreating/NE Monsoon: Oct-Nov, blows Land-to-Sea across the Bay of Bengal, waters the Coromandel (Tamil Nadu) Coast.',
      'SW Monsoon: Dec-Feb, blows North-East; Retreating Monsoon: May-July, blows South-West across Rajasthan.',
      'SW Monsoon brings dry continental winds; Retreating Monsoon brings all of India\'s 80% annual rainfall.',
      'SW Monsoon is confined to the Himalayas; Retreating Monsoon is confined to the Thar Desert.',
    ],
    correctIndex: 0,
    explanation: 'The SW Monsoon (June–Sept) is driven by intense low pressure over North India, drawing sea-to-land SW winds (~75-80% of national rainfall). During the Retreating Monsoon (Oct–Nov), the monsoon trough weakens and shifts south; north-easterly winds blowing from the cooling landmass cross the Bay of Bengal, absorb moisture, and cause heavy precipitation along the Coromandel coast of Tamil Nadu.',
    hints: [
      'SW Monsoon blows from the ocean towards the heated subcontinent.',
      'Retreating/NE Monsoon withdraws from the land and picks up moisture over the Bay of Bengal.',
      'Tamil Nadu receives its peak annual rains during October–November from the NE/retreating winds.',
    ],
  },
  // 10. Advanced Application - Climograph Identification
  {
    id: 'ch_geo_010',
    nodeId: NODE_C12_GEO_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A climograph reveals: January mean temperature of 25°C, May mean of 33°C, very low rainfall in July-August (<100 mm total), and a massive rainfall peak of 380 mm in November. Which Indian city does this represent?',
    options: [
      'Chennai (Tamil Nadu)',
      'Mumbai (Maharashtra)',
      'Kolkata (West Bengal)',
      'Bhopal (Madhya Pradesh)',
    ],
    correctIndex: 0,
    explanation: 'Chennai exhibits a tropical maritime temperature regime (no cold winter) and its unique rainfall distribution peaks sharply during October and November (~310-380 mm/month) due to the Retreating/North-East Monsoon, while remaining dry during the SW Monsoon peak because it sits in the rain shadow of the Western Ghats.',
    hints: [
      'Notice that the station is warm in winter (25°C), ruling out North Indian cities.',
      'The peak rainfall is in October-November, NOT June-July.',
      'This rainfall pattern is characteristic of the Coromandel Coast.',
    ],
  },
  // 11. Advanced Evaluation - Peninsular vs Himalayan Drainage
  {
    id: 'ch_geo_011',
    nodeId: NODE_C12_GEO_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why Himalayan rivers (Ganga, Brahmaputra) are perennial and suitable for year-round canal irrigation, whereas Peninsular rivers (Godavari, Krishna, Mahanadi) are seasonal sprinters requiring massive storage reservoirs.',
    options: [
      'Himalayan rivers are glacier-fed (snowmelt in summer) + monsoon-fed (rain in July-Sept), maintaining continuous discharge in graded valleys; Peninsular rivers originate in non-glaciated plateaus and depend purely on seasonal monsoon precipitation.',
      'Peninsular rivers have their water drained into underground magma chambers during summer.',
      'Himalayan rivers do not receive monsoon rainfall and depend solely on artificial dam releases.',
      'Peninsular rivers flow through porous limestone karst that absorbs 95% of river water permanently.',
    ],
    correctIndex: 0,
    explanation: 'Himalayan rivers originate in high-altitude Himadri glaciers (e.g., Gangotri, Yamunotri, Siachen), ensuring steady snowmelt flow during hot, dry pre-monsoon months, supplemented by heavy monsoon rains. Peninsular rivers originate in rain-fed crystalline plateaus without permanent snowfields; thus, their hydrographs show torrential monsoon discharge followed by severe dry-season depletion.',
    hints: [
      'Think about the water sources: glaciers vs rain only.',
      'Snowmelt happens in the hot summer months before the rains arrive.',
      'Peninsular rivers have no snowfields at their sources in the Western Ghats.',
    ],
  },
  // 12. Advanced Application - Rift Valley West-Flowing Rivers
  {
    id: 'ch_geo_012',
    nodeId: NODE_C12_GEO_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'While the general slope of the Peninsular Plateau is eastward into the Bay of Bengal, the Narmada and Tapi rivers flow westward into the Arabian Sea without forming deltas. Why?',
    options: [
      'They flow through fault-guided structural rift valleys (graben) bounded by the Vindhyas and Satpuras, and their high gradient prevents delta deposition, forming estuaries instead.',
      'They are diverted by the Coriolis deflection force to the west.',
      'The Indian Plate tilts northward, reversing their natural flow towards Gujarat.',
      'They were artificially carved by ancient Harappan engineering canals.',
    ],
    correctIndex: 0,
    explanation: 'The Narmada and Tapi flow through linear tectonic rift valleys (fault grabens) formed during the Gondwana breakup and Deccan volcanic episode. The fault trough slopes westward between the Vindhyan and Satpura horsts. Because the rivers flow swiftly through hard rock gorges directly into the sea, they form tidal estuaries rather than sediment-fan deltas.',
    hints: [
      'Look for the geological structure: faulting and rift valleys.',
      'They flow between the Vindhya and Satpura ranges.',
      'Short swift courses through rocky trenches prevent large delta deposition, creating estuaries.',
    ],
  },
  // 13. Advanced Construct - Monsoon Driving Engine
  {
    id: 'ch_geo_013',
    nodeId: NODE_C12_GEO_009,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the comprehensive causal mechanism that triggers the sudden burst of the South-West Monsoon over the Indian subcontinent.',
    availableParts: [
      'Intense summer heating of Tibetan Plateau',
      'Formation of low-pressure trough over Ganga Plain',
      'Northward shift of ITCZ to 25°N',
      'Subtropical Westerly Jet shifts north of Himalayas',
      'Tropical Easterly Jet sets in over Peninsula',
      'Cross-equatorial SW winds rush from high-pressure Indian Ocean',
    ],
    targetState: 'Intense summer heating of Tibetan Plateau Formation of low-pressure trough over Ganga Plain Northward shift of ITCZ to 25°N Subtropical Westerly Jet shifts north of Himalayas Tropical Easterly Jet sets in over Peninsula Cross-equatorial SW winds rush from high-pressure Indian Ocean',
    validationHint: 'Add all 6 interrelated atmospheric and thermal components to complete the monsoon engine!',
    explanation: 'The South-West Monsoon burst is an integrated synoptic event: Intense insolation heats Tibet and the northern plains -> ITCZ migrates to ~25°N creating the monsoon trough -> Westerly Jet abruptly shifts north of the Tibetan massif -> Tropical Easterly Jet establishes over peninsular India -> drawing moisture-rich cross-equatorial south-westerly maritime winds.',
    hints: [
      'Select every key thermal and upper-air trigger in the palette.',
      'Include the Tibetan plateau heating, ITCZ shift, both jet streams, and the oceanic wind surge.',
      'Click all parts in sequence to assemble the complete monsoon mechanism.',
    ],
  },
  // 14. Foundation Recall - Local Winds of Summer
  {
    id: 'ch_geo_014',
    nodeId: NODE_C12_GEO_010,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the three distinct Indian pre-monsoon / summer local weather phenomena with their correct region and characteristics:',
    options: [
      'Loo: Hot dry afternoon winds in Northern Plains; Kalbaisakhi: Norwesters/violent thunderstorms in Bengal/Assam aiding tea & jute; Mango Showers: Pre-monsoon showers in Kerala/Karnataka aiding mango ripening',
      'Loo: Cold blizzard in Kashmir; Kalbaisakhi: Dust storms in Thar; Mango Showers: Hailstorms in Punjab',
      'Loo: Marine breeze in Goa; Kalbaisakhi: Winter fog in Delhi; Mango Showers: Heavy snow in Himachal',
      'Loo: Cyclonic surge in Odisha; Kalbaisakhi: Heatwaves in Gujarat; Mango Showers: Floods in Bihar',
    ],
    correctIndex: 0,
    explanation: 'During March-May (summer): (1) Loo = searing hot, dry daytime winds (>45°C) across Punjab, Haryana, UP, and Rajasthan; (2) Kalbaisakhi (Norwesters) = violent evening thunderstorms with torrential rain in West Bengal/Assam, crucial for tea, jute, and rice; (3) Mango Showers = light pre-monsoon coastal rains in Kerala/Karnataka preventing premature drop of mangoes.',
    hints: [
      'Loo is the notorious scorching dry wind of Delhi/UP/Rajasthan.',
      'Kalbaisakhi refers to the April-May storms of Bengal ("calamity of Baisakh").',
      'Mango showers occur in the southern peninsula along Kerala/Karnataka.',
    ],
  },
  // 15. Standard Application - Coastal Plains & Islands Contrast
  {
    id: 'ch_geo_015',
    nodeId: NODE_C12_GEO_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the Andaman & Nicobar archipelago with the Lakshadweep archipelago on geological origin, topography, and sea location.',
    options: [
      'Andaman & Nicobar: Bay of Bengal, volcanic & submerged Tertiary mountain peaks (Barren Island active volcano), large & hilly; Lakshadweep: Arabian Sea, coral atolls built by polyps around lagoons, small & flat.',
      'Andaman & Nicobar: Coral atolls in Arabian Sea; Lakshadweep: Volcanic mountains in Bay of Bengal.',
      'Both are alluvial sandbars deposited by the Ganga and Indus deltas respectively.',
      'Andaman & Nicobar are granitic continental fragments; Lakshadweep are ice-carved fiords.',
    ],
    correctIndex: 0,
    explanation: 'Andaman & Nicobar (Bay of Bengal) represent the subaerial summits of an extension of the Arakan Yoma fold mountain chain, featuring volcanic islands like Barren Island (India\'s only active volcano) and Narcondam. Lakshadweep (Arabian Sea) consists of 36 low-lying coral atolls (<5m above sea level) formed by reef-building coral polyps.',
    hints: [
      'Andaman and Nicobar are in the Bay of Bengal and have volcanic origin (Barren Island).',
      'Lakshadweep islands are in the Arabian Sea and are made of coral reefs/atolls.',
      'Remember: Andaman = Mountainous/Volcanic; Lakshadweep = Flat/Coral Atolls.',
    ],
  },
  // 16. Advanced Analysis - ENSO and the Indian Monsoon
  {
    id: 'ch_geo_016',
    nodeId: NODE_C12_GEO_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze why an El Niño event in the equatorial Pacific Ocean is statistically linked to weak Indian monsoons, while noting why it does NOT guarantee a drought.',
    options: [
      'El Niño warms the eastern Pacific, displacing the Walker circulation eastward and suppressing convective ascent over the Indian Ocean; however, positive Indian Ocean Dipole (IOD) or favorable Eurasian snow cover can compensate.',
      'El Niño physically freezes the Indian Ocean, stopping all oceanic evaporation completely.',
      'El Niño causes the Himalayas to lose 50% of their elevation via rapid tectonic subduction.',
      'El Niño forces the ITCZ to stay permanently at the South Pole throughout July.',
    ],
    correctIndex: 0,
    explanation: 'During El Niño, abnormal warming of the eastern equatorial Pacific weakens the trans-Pacific pressure gradient and disrupts the Walker Circulation, inducing descending dry air over the Indian subcontinent. However, it is a probabilistic relationship (~60% correlation), as counteracting factors like a positive Indian Ocean Dipole (+IOD) can deliver normal or surplus rainfall.',
    hints: [
      'Connect Pacific sea surface temperatures to the global Walker atmospheric cell.',
      'Descending air over India reduces cloud formation and monsoon rainfall.',
      'Positive Indian Ocean Dipole (+IOD) acts as a compensating regional factor.',
    ],
  },
  // 17. Standard Drag-Label - Longitudinal Zones of the Himalayas
  {
    id: 'ch_geo_017',
    nodeId: NODE_C12_GEO_003,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Place the three parallel Himalayan ranges in their correct North-to-South structural positions alongside their average elevations.',
    dragItems: [
      { label: 'Himadri / Great Himalayas (~6,000m)', targetId: 'range_north' },
      { label: 'Himachal / Lesser Himalayas (~3,700-4,500m)', targetId: 'range_mid' },
      { label: 'Shiwalik / Outer Himalayas (~900-1,200m)', targetId: 'range_south' },
    ],
    correctMapping: {
      range_north: 'Himadri / Great Himalayas (~6,000m)',
      range_mid: 'Himachal / Lesser Himalayas (~3,700-4,500m)',
      range_south: 'Shiwalik / Outer Himalayas (~900-1,200m)',
    },
    explanation: 'From north to south: (1) Himadri (Great/Inner Himalayas, >6,000 m avg, snow-bound peaks like Everest and Kanchenjunga), (2) Himachal (Lesser Himalayas, 3,700–4,500 m, carrying Shimla, Mussoorie, Darjeeling), and (3) Shiwalik (Outer Himalayas, 900–1,200 m, composed of loose riverine gravel forming duns like Dehra Dun).',
    hints: [
      'The highest, oldest, northernmost backbone containing glaciers is the Himadri.',
      'The middle range housing the famous hill stations is the Himachal.',
      'The outermost, youngest foothill range forming duns is the Shiwalik.',
    ],
  },
  // 18. Standard Application - Regional Himalayan River Boundaries
  {
    id: 'ch_geo_018',
    nodeId: NODE_C12_GEO_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A trekker travels between the Sutlej River in the west and the Kali River in the east. In which regional division of the Himalayas is the trekker located?',
    options: [
      'Himachal / Uttaranchal / Kumaon Himalayas',
      'Kashmir / Punjab Himalayas (Indus to Sutlej)',
      'Nepal Himalayas (Kali to Tista)',
      'Assam Himalayas (Tista to Brahmaputra)',
    ],
    correctIndex: 0,
    explanation: 'The regional divisions defined by river boundaries are: (1) Punjab/Kashmir Himalayas (between Indus & Sutlej), (2) Kumaon/Himachal/Uttaranchal Himalayas (between Sutlej & Kali), (3) Nepal Himalayas (between Kali & Tista), and (4) Assam Himalayas (between Tista & Brahmaputra).',
    hints: [
      'Indus to Sutlej is Kashmir/Punjab.',
      'Sutlej to Kali covers Himachal and Uttarakhand (Kumaon/Garhwal).',
      'Kali to Tista is the Nepal Himalayas.',
    ],
  },
  // 19. Advanced Evaluation - Peninsular Plateau Stability vs Himalayas
  {
    id: 'ch_geo_019',
    nodeId: NODE_C12_GEO_002,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Contrast the Peninsular Plateau and the Himalayan Mountain Complex across rock composition, structural stability, and dominant geomorphic processes.',
    options: [
      'Peninsula: Ancient Archaean/Dharwar igneous-metamorphic craton, rigid & seismically stable, senile rounded topography; Himalayas: Young Tertiary marine sedimentary folds, tectonically active & earthquake-prone, juvenile sharp relief with deep gorges.',
      'Peninsula: Formed in Quaternary era from river silt; Himalayas: Ancient granite block unperturbed for 3 billion years.',
      'Both were simultaneously uplifted during the Pleistocene ice ages by volcanic eruptions.',
      'Peninsula is made of loose unconsolidated alluvium; Himalayas are solid basalt sheets.',
    ],
    correctIndex: 0,
    explanation: 'The Peninsula is an ancient, rigid Gondwanic shield composed of Archaean granites, gneisses, and Cretaceous Deccan basalt, exhibiting relict rolling hills worn down by millions of years of denudation. The Himalayas are young fold mountains formed by active continental collision, characterized by V-shaped gorges, seismic instability, and ongoing tectonic uplift.',
    hints: [
      'The Peninsula is one of Earth\'s oldest, most stable shields (Archaean/Dharwar).',
      'The Himalayas are young, unstable fold mountains formed in the Tertiary era.',
      'Think about seismic risk: Himalayas have frequent earthquakes, Peninsula is a stable shield.',
    ],
  },
  // 20. Advanced Analysis - Chambal Badland Topography
  {
    id: 'ch_geo_020',
    nodeId: NODE_C12_GEO_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How is the infamous "Badland Topography" (ravines) of the Chambal Basin formed geomorphologically, and why is it unsuitable for agriculture?',
    options: [
      'Accelerated gully erosion by flash runoff carving deep, steep-sided dendritic trenches into thick semi-arid alluvial deposits, destroying soil horizons and preventing mechanized ploughing.',
      'Glacial gouging during the last ice age leaving moraine boulder trains.',
      'Karst sinkholes formed by underground limestone dissolution by carbonic acid.',
      'Deposition of toxic volcanic ash during Deccan trap basalt fissure eruptions.',
    ],
    correctIndex: 0,
    explanation: 'The Chambal ravines (badlands) are the result of severe gully erosion in the soft, deep alluvial tracts of Madhya Pradesh and Rajasthan. Heavy monsoon rain on sparse vegetation cuts rills into deep gullies and ravines, carving an intricate maze of dissected landforms that makes cultivation and irrigation impossible.',
    hints: [
      'The driving force is running water and severe gully erosion.',
      'It cuts through soft alluvial soil, forming deep ravines and trenches.',
      'The rugged, dissected terrain cannot be ploughed or irrigated.',
    ],
  },
  // 21. Standard Numeric - Longitudinal Extent & Time Difference
  {
    id: 'ch_geo_021',
    nodeId: NODE_C12_GEO_001,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'India spans ~29° of longitude (68°7\'E to 97°25\'E). Given that Earth rotates 1° of longitude in 4 minutes, calculate the approximate local solar time difference between western Gujarat and eastern Arunachal Pradesh in hours (to nearest integer).',
    correctAnswer: 2,
    tolerance: 0.2,
    unit: 'hours',
    explanation: '29° longitudinal spread × 4 minutes per degree = 116 minutes ≈ 1 hour and 56 minutes (roughly 2 hours). This is why the Standard Meridian of India is fixed at 82°30\'E (passing through Mirzapur, UP), giving a single Indian Standard Time (IST = UTC + 5:30) for the whole nation.',
    hints: [
      'Multiply 29 degrees by 4 minutes per degree.',
      '29 × 4 = 116 minutes.',
      '116 minutes is approximately 2 hours.',
    ],
  },
  // 22. Standard Application - Western vs Eastern Coastal Plains
  {
    id: 'ch_geo_022',
    nodeId: NODE_C12_GEO_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which sequence correctly lists the four sub-divisions of the Western Coastal Plain in correct North-to-South geographical order?',
    options: [
      'Kutch-Kathiawar Coast (Gujarat) -> Konkan Coast (Maharashtra/Goa) -> Kanara Coast (Karnataka) -> Malabar Coast (Kerala)',
      'Malabar Coast -> Kanara Coast -> Konkan Coast -> Kutch-Kathiawar Coast',
      'Coromandel Coast -> Northern Circars -> Utkal Coast -> Malabar Coast',
      'Konkan Coast -> Malabar Coast -> Kanara Coast -> Kathiawar Coast',
    ],
    correctIndex: 0,
    explanation: 'The Western Coastal Plain sequence from north to south is strictly: (1) Kutch and Kathiawar (Gujarat), (2) Konkan (Maharashtra and Goa), (3) Kanara (Karnataka), and (4) Malabar (Kerala with its Vembanad backwaters/kayals). The Eastern Coastal Plain comprises Utkal (Odisha), Northern Circars (Andhra), and Coromandel (Tamil Nadu).',
    hints: [
      'Start in Gujarat in the north and end in Kerala in the south.',
      'Konkan is Maharashtra/Goa; Kanara is Karnataka; Malabar is Kerala.',
      'Never confuse Konkan (north) with Kanara (south of Konkan).',
    ],
  },
];

// ─── INTERACTIVE EXPLORATION STEPS (Brilliant.org Learn-by-Doing) ───
const EXPLORATION_STEPS = [
  {
    title: '1. India\'s Locational Grid & Maritime Pivot',
    instruction: 'Drag the latitude and longitude sliders to inspect India\'s 29° angular span, the Tropic of Cancer divide, and the Indian Ocean trade pivot.',
    interactionType: 'slider-grid',
    nodeId: NODE_C12_GEO_001,
  },
  {
    title: '2. Continental Collision & Geological Evolution',
    instruction: 'Drag the Tectonic Epoch slider to watch the Indian Plate break from Gondwanaland, drift across the Tethys Sea, and buckle into the Himalayas.',
    interactionType: 'slider-tectonics',
    nodeId: NODE_C12_GEO_002,
  },
  {
    title: '3. Physiographic Transect & Relief Profile',
    instruction: 'Click each physiographic realm on the North-South cross-section to reveal its elevation, rock composition, and drainage character.',
    interactionType: 'click-physiography',
    nodeId: NODE_C12_GEO_003,
  },
  {
    title: '4. Drainage Systems & River Origins',
    instruction: 'Toggle between Himalayan (perennial/glacial) and Peninsular (seasonal/plateau) river regimes and click their exact geographic birthplaces.',
    interactionType: 'click-drainage',
    nodeId: NODE_C12_GEO_007,
  },
  {
    title: '5. The Monsoon Engine & Climate Visualiser',
    instruction: 'Adjust the seasonal pressure slider between January (Winter High) and July (Summer Low) to watch the wind reversal, ITCZ shift, and station climographs.',
    interactionType: 'slider-monsoon',
    nodeId: NODE_C12_GEO_009,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you move the pressure slider from January (Winter High) to July (Summer Low), what happens to the Intertropical Convergence Zone (ITCZ) and the prevailing winds over India?',
    options: [
      'The ITCZ shifts north to ~25°N over the Ganga Plain, reversing winds from dry NE trades to moisture-laden SW winds from the ocean.',
      'The ITCZ moves south to the equator, causing winds to blow from China to the Arabian Sea.',
      'No change occurs because pressure belts remain static across all months.',
      'Winds blow directly downwards from the upper stratosphere to create a high-pressure drought.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now slide the Seasonal Pressure slider to July and observe the northward migration of the ITCZ line and the dynamic south-west wind vectors!',
    nodeId: NODE_C12_GEO_009,
  },
  {
    question: 'Predict: Looking at the topographic barrier of the Western Ghats, what will happen to precipitation as the SW Monsoon strikes Mumbai versus Pune?',
    options: [
      'Mumbai (windward) receives torrential orographic rain (>2000 mm), while Pune (leeward) experiences a dry rain-shadow (~650 mm).',
      'Both cities receive identical precipitation because they are only 150 km apart.',
      'Pune receives heavy rain while Mumbai remains a bone-dry desert.',
      'Rainfall occurs only in winter during snowfall on the Konkan coast.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Inspect the Physiographic cross-section and observe the condensation clouds on the western coastal slope and rain shadow on the Deccan side!',
    nodeId: NODE_C12_GEO_005,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the climograph explorer, what distinct pattern sets Chennai apart from Mumbai and Delhi?',
    observableOptions: [
      'Chennai receives its maximum precipitation in October–November (Retreating/NE Monsoon) rather than June–July.',
      'Chennai has sub-zero temperatures in January.',
      'Chennai receives 100% of its rainfall in March from Western Disturbances.',
      'Chennai has the largest temperature range in India (>35°C).',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_GEO_010,
  },
  {
    question: 'Observation: What happens to Himalayan streams as they flow off the steep Shiwaliks into the Bhabar belt?',
    observableOptions: [
      'They sink into coarse, porous gravel beds and flow underground, re-emerging in the marshy Tarai.',
      'They instantly turn into massive delta distributaries with mangrove swamps.',
      'They evaporate completely into dry hot air.',
      'They reverse their flow back to the Himadri peaks.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_GEO_004,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'District Geospatial & Climate Master Plan',
  description: 'Apply your understanding of India\'s physical setting, drainage systems, and monsoon mechanics to assess real-world infrastructure and agricultural strategy.',
  steps: [
    'Select your home district or an assigned Indian state (e.g., Punjab, Maharashtra, Tamil Nadu, or Assam).',
    'Identify its physiographic division (Himalayan, Northern Plain, Deccan Plateau, or Coastal Plain) and the underlying rock era.',
    'Map the nearest major river basin, identifying whether its drainage is perennial (Himalayan) or seasonal (Peninsular), and find its exact source.',
    'Formulate a cropping and rainwater harvesting calendar based on the onset, peak, and retreat of the monsoon in your region.',
  ],
};

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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_GEO_001,
  title: 'India: Locational Setting, Physical Geography & Climate Dynamics',
  definition: 'India\'s physical geography is defined by its strategic subcontinental location at the head of the Indian Ocean (8°4\'N-37°6\'N, 68°7\'E-97°25\'E), its triple geological foundation (ancient Peninsular shield, young Himalayan fold mountains, and Quaternary Indo-Gangetic foredeep), and its seasonal monsoon climate driven by differential heating, ITCZ migration, and jet streams.',
  eli5: 'Think of India as a giant three-tiered landmass: an ancient solid rock table in the south, a soaring snowy fold mountain wall in the north, and a vast fertile mud plain in between. Its peninsular kite shape splits the ocean winds, creating a massive seasonal weather pump that drenches the subcontinent.',
  misconceptions: [
    { misconception: 'Candidates state latitude and longitude without minutes or directions (e.g. "8 to 37 degrees").', correction: 'Always write the exact angular values with minutes and cardinal directions: 8°4\'N to 37°6\'N latitude, and 68°7\'E to 97°25\'E longitude.' },
    { misconception: 'Bhabar is marshy and Tarai is gravelly.', correction: 'Bhabar is the porous pebble/gravel belt where streams disappear underground; Tarai is the marshy, waterlogged zone where streams re-emerge.' },
    { misconception: 'The total coastline is only 6,100 km.', correction: 'The mainland coastline is ~6,100 km, but including the Andaman & Nicobar and Lakshadweep islands, the total coastline is ~7,516 km.' },
    { misconception: 'Western Disturbances are tropical cyclones.', correction: 'Western Disturbances are extra-tropical (temperate) cyclonic depressions originating over the Mediterranean, steered by the Subtropical Westerly Jet Stream.' },
    { misconception: 'Retreating Monsoon and North-East Monsoon are two unrelated seasons.', correction: 'They are two aspects of the same seasonal phase (October–November): the withdrawal of the SW monsoon and the reversed NE winds bringing rain to Tamil Nadu.' },
  ],
  diagnosticQuestions: [
    { question: 'What is India\'s mainland latitudinal extent?', options: ['8°4\'N to 37°6\'N', '8°N to 37°N', '6°45\'N to 35°N', '10°N to 30°N'], correctIndex: 0 },
    { question: 'Which line of latitude bisects India into tropical and subtropical zones?', options: ['Tropic of Cancer (23°30\'N)', 'Equator (0°)', 'Tropic of Capricorn (23°30\'S)', 'Arctic Circle (66°30\'N)'], correctIndex: 0 },
    { question: 'The Himalayas were folded out of sediments of which ancient sea?', options: ['Tethys Sea', 'Arabian Sea', 'Red Sea', 'Baltic Sea'], correctIndex: 0 },
    { question: 'Which relief belt has streams disappearing underground?', options: ['Bhabar', 'Tarai', 'Bhangar', 'Khadar'], correctIndex: 0 },
    { question: 'What is the geological origin of the Deccan Plateau?', options: ['Basaltic lava flows', 'Limestone karst', 'Marine silt', 'Glacial moraine'], correctIndex: 0 },
    { question: 'Which river originates at Trimbakeshwar near Nashik?', options: ['Godavari', 'Krishna', 'Kaveri', 'Narmada'], correctIndex: 0 },
    { question: 'Why does Chennai receive its main rain in Oct-Nov?', options: ['Retreating / North-East Monsoon', 'South-West Monsoon', 'Western Disturbances', 'Kalbaisakhi'], correctIndex: 0 },
    { question: 'What is the origin of Lakshadweep Islands?', options: ['Coral atolls', 'Volcanic eruption', 'Submerged fold mountains', 'Alluvial delta'], correctIndex: 0 },
  ],
  masteryCriteria: 'Demonstrates comprehensive understanding of India\'s locational coordinates, geological history, physical divisions, drainage basins, and monsoon climographs.',
};

// ─── COMPONENT IMPLEMENTATION ───
export function C12_GeographyIndiaLocationalSettingSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌏', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org pattern states
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [selectedStation, setSelectedStation] = useState<string>('mumbai');
  const [activePhysioPart, setActivePhysioPart] = useState<string>('himalaya');
  const [activeDrainageGroup, setActiveDrainageGroup] = useState<'all' | 'himalayan' | 'peninsular'>('all');
  const [selectedRiver, setSelectedRiver] = useState<string | null>('ganga');

  // Interactive Exploration & Sandbox Sliders
  const [latPosition, setLatPosition] = useState<number>(23.5); // Tropic of Cancer default
  const [longPosition, setLongPosition] = useState<number>(82.5); // IST Standard Meridian
  const [tectonicEpoch, setTectonicEpoch] = useState<number>(70); // 70 Million Years Ago to 0 (Present)
  const [seasonMonthVal, setSeasonMonthVal] = useState<number>(7); // 1 = Jan (Winter), 7 = July (Monsoon)
  const [altitudeMeters, setAltitudeMeters] = useState<number>(0);
  const [selectedMapLayer, setSelectedMapLayer] = useState<'relief' | 'rivers' | 'monsoon' | 'grid'>('relief');

  // Adaptive & Scoring states
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

  // Challenge Drag & Numeric States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual & Feedback state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive challenges filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Dynamic calculations
  const calculatedTemperature = useMemo(() => {
    // Sea-level base is 30°C minus (lapse rate 1°C per 165m)
    const baseTemp = seasonMonthVal >= 5 && seasonMonthVal <= 8 ? 36 : seasonMonthVal === 1 || seasonMonthVal === 12 ? 20 : 28;
    const tempDrop = altitudeMeters / 165;
    return Math.round((baseTemp - tempDrop) * 10) / 10;
  }, [seasonMonthVal, altitudeMeters]);

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty on score change
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

  // Canvas atmospheric 2D particle simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; speed: number; length: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2.5,
        length: 5 + Math.random() * 8,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isMonsoon = seasonMonthVal >= 6 && seasonMonthVal <= 9;
      ctx.strokeStyle = isMonsoon ? 'rgba(56, 189, 248, 0.7)' : 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 1.5;

      particles.forEach(p => {
        ctx.beginPath();
        if (isMonsoon) {
          // South-West to North-East trajectory
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.length, p.y - p.length * 0.8);
          p.x += p.speed;
          p.y -= p.speed * 0.8;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
        } else {
          // North-East to South-West trajectory (Winter)
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.length, p.y + p.length * 0.8);
          p.x -= p.speed * 0.6;
          p.y += p.speed * 0.5;
          if (p.x < 0) p.x = canvas.width;
          if (p.y > canvas.height) p.y = 0;
        }
        ctx.stroke();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [seasonMonthVal]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Callbacks
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding geographic deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Geographic Exploration. Manipulate each visual component to discover core concepts.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Entering Free Sandbox Mode. Toggle layers, adjust climate variables, and examine physical patterns freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase started. Test your mastery across all ten geographic modules.');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test and verify by dragging the seasonal pressure slider.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Inspect the climograph peaks carefully.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mastery assessment finished! Review your performance metrics and spaced repetition schedule.');
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
        speechManager.speak('Correct! Brilliant deduction.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ score: 100, timestamp: Date.now() }));
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
          speechManager.speak('Examine the step-by-step geographic explanation below.');
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
    [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
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

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
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
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleRiverSelect = useCallback((riverKey: string) => {
    setSelectedRiver(riverKey);
    audioManager.play('tap');
    const riverDescriptions: Record<string, string> = {
      ganga: 'Ganga: Originates from Gangotri Glacier in Uttarakhand; perennial snowmelt and monsoon drainage.',
      indus: 'Indus: Originates near Mansarovar Lake in Tibet; flows through Ladakh into Pakistan.',
      brahmaputra: 'Brahmaputra: Rises at Angsi Glacier in Tibet as the Tsangpo; braided channel in Assam.',
      godavari: 'Godavari (Dakshin Ganga): Rises at Trimbakeshwar near Nashik; largest Peninsular river.',
      narmada: 'Narmada: Rises at Amarkantak; flows westward through a tectonic rift valley into Arabian Sea.',
      kaveri: 'Kaveri: Originates at Talakaveri in the Brahmagiri Hills; flows east into Bay of Bengal.',
    };
    speechManager.speak(riverDescriptions[riverKey] || '');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700/50 rounded-xl" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                ISC Class 12 • Physical Geography & Climatology
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                CISCE 2026 Core
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800" role="tablist">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
              <span aria-hidden="true">🚀</span> GEOSPATIAL BRIEFING MISSION
            </div>
            <h2 className="text-xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-300/80 mt-2 bg-emerald-950/40 p-3 rounded-lg border border-emerald-900/50">
              <span aria-hidden="true">💡</span> {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Visual Hook Canvas / SVG */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center justify-between">
              <span>Subcontinental Maritime Pivot & Dual-Branch Simulation</span>
              <span className="text-xs text-emerald-400 font-normal">Interactive Preview</span>
            </h3>

            <div className="relative w-full h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 500 300" className="w-full h-full" aria-label="India Maritime Pivot and Coordinate Grid Map">
                {/* Lat/Long Grid Lines */}
                <line x1="50" y1="50" x2="450" y2="50" stroke="#334155" strokeDasharray="4 4" />
                <text x="455" y="55" fill="#64748b" fontSize="9">37°6' N (Indira Col)</text>

                <line x1="50" y1="150" x2="450" y2="150" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 3" />
                <text x="455" y="154" fill="#fbbf24" fontSize="9" fontWeight="bold">23°30' N (Tropic of Cancer)</text>

                <line x1="50" y1="260" x2="450" y2="260" stroke="#334155" strokeDasharray="4 4" />
                <text x="455" y="265" fill="#64748b" fontSize="9">8°4' N (Kanyakumari)</text>

                <line x1="120" y1="30" x2="120" y2="270" stroke="#334155" strokeDasharray="4 4" />
                <text x="100" y="285" fill="#64748b" fontSize="9">68°7' E</text>

                <line x1="250" y1="30" x2="250" y2="270" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="230" y="285" fill="#38bdf8" fontSize="9">82°30' E (IST)</text>

                <line x1="380" y1="30" x2="380" y2="270" stroke="#334155" strokeDasharray="4 4" />
                <text x="360" y="285" fill="#64748b" fontSize="9">97°25' E</text>

                {/* Peninsular Polygon */}
                <polygon
                  points="250,55 350,90 320,160 250,250 180,160 140,110 180,70"
                  fill="rgba(16, 185, 129, 0.15)"
                  stroke="#10b981"
                  strokeWidth="2"
                />

                {/* Ocean labels & Arrows */}
                <text x="90" y="210" fill="#38bdf8" fontSize="11" fontWeight="bold">Arabian Sea</text>
                <text x="310" y="210" fill="#38bdf8" fontSize="11" fontWeight="bold">Bay of Bengal</text>
                <text x="210" y="280" fill="#94a3b8" fontSize="10">Indian Ocean</text>

                {/* Monsoon splits */}
                <motion.path
                  d="M 210,270 Q 150,220 160,170"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                />
                <motion.path
                  d="M 290,270 Q 350,220 330,160"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                />
              </svg>
            </div>

            {/* Discovery Question Box */}
            <div className="mt-6 p-5 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-amber-400 font-bold">Q.</span> {DISCOVERY_QUESTION.question}
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : discoveryAnswered ? '✗ ' : ''}
                      {String.fromCharCode(65 + i)}.
                    </span>{' '}
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <p className={`text-xs ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect
                      ? '✓ Excellent intuition! The peninsular pivot is fundamental to both maritime trade and monsoon meteorology.'
                      : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    aria-label="Start Guided Interactive Exploration"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/40"
                  >
                    Start Guided Interactive Exploration →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION (Brilliant Style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">
              Interactive Lab <strong className="text-emerald-400">{currentSlide + 1}</strong> of{' '}
              {EXPLORATION_STEPS.length}
            </span>
            <span className="text-slate-400">Node Ref: <code className="text-emerald-300">{EXPLORATION_STEPS[currentSlide].nodeId}</code></span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400" aria-hidden="true">📍</span> {EXPLORATION_STEPS[currentSlide].title}
                </h2>
                <p className="text-amber-400 text-xs mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: LATITUDINAL & LONGITUDINAL GRID EXPLORER */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between" htmlFor="lat-slider">
                        <span>Latitude Probe: <strong>{latPosition.toFixed(1)}° N</strong></span>
                        <span className="text-emerald-400 font-mono">
                          {latPosition < 23.5 ? 'Tropical Zone (High Year-Round Temp)' : 'Subtropical Zone (Marked Seasonal Contrast)'}
                        </span>
                      </label>
                      <input
                        id="lat-slider"
                        aria-label="Latitude probe slider from 8.0°N to 37.6°N"
                        type="range"
                        min="8.0"
                        max="37.6"
                        step="0.1"
                        value={latPosition}
                        onChange={e => {
                          setLatPosition(parseFloat(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full mt-2 accent-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 flex justify-between" htmlFor="long-slider">
                        <span>Longitude Probe: <strong>{longPosition.toFixed(1)}° E</strong></span>
                        <span className="text-sky-400 font-mono">
                          Local Time Diff: {(((longPosition - 68.1) * 4) / 60).toFixed(1)} hrs from Gujarat
                        </span>
                      </label>
                      <input
                        id="long-slider"
                        aria-label="Longitude probe slider from 68.1°E to 97.4°E"
                        type="range"
                        min="68.1"
                        max="97.4"
                        step="0.1"
                        value={longPosition}
                        onChange={e => {
                          setLongPosition(parseFloat(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full mt-2 accent-sky-500"
                      />
                    </div>
                  </div>

                  <div className="relative h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-2">
                    <svg viewBox="0 0 500 240" className="w-full h-full" aria-label="Interactive Coordinate Extent Map">
                      <rect x="0" y="0" width="500" height="240" fill="#020617" />
                      <line x1="20" y1="120" x2="480" y2="120" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" />
                      <text x="400" y="115" fill="#f59e0b" fontSize="8">Tropic of Cancer (23°30'N)</text>

                      {(() => {
                        const y = 220 - ((latPosition - 8) / (37.6 - 8)) * 200;
                        return (
                          <g>
                            <line x1="20" y1={y} x2="480" y2={y} stroke="#10b981" strokeWidth="2" />
                            <circle cx="250" cy={y} r="5" fill="#10b981" />
                            <text x="260" y={y - 6} fill="#34d399" fontSize="10" fontWeight="bold">
                              {latPosition.toFixed(1)}° N
                            </text>
                          </g>
                        );
                      })()}

                      {(() => {
                        const x = 50 + ((longPosition - 68.1) / (97.4 - 68.1)) * 400;
                        return (
                          <g>
                            <line x1={x} y1="10" x2={x} y2="230" stroke="#38bdf8" strokeWidth="2" />
                            <circle cx={x} cy="120" r="5" fill="#38bdf8" />
                            <text x={x + 6} y={225} fill="#7dd3fc" fontSize="10" fontWeight="bold">
                              {longPosition.toFixed(1)}° E
                            </text>
                          </g>
                        );
                      })()}

                      <text x="30" y="230" fill="#94a3b8" fontSize="9">Southern Tip (8°4'N)</text>
                      <text x="30" y="30" fill="#94a3b8" fontSize="9">Northernmost Peak (37°6'N)</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 1: CONTINENTAL COLLISION & TECTONIC EVOLUTION */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-300 flex justify-between" htmlFor="tectonic-slider">
                      <span>Geological Time: <strong>{tectonicEpoch} Million Years Ago</strong></span>
                      <span className="text-amber-400 font-bold">
                        {tectonicEpoch > 50
                          ? 'Late Cretaceous: Indian Plate breaking from Gondwanaland'
                          : tectonicEpoch > 20
                          ? 'Tertiary Era: Tethys Sediments folding into Himalayas'
                          : 'Late Tertiary / Quaternary: Great Plains Foredeep filled with Alluvium'}
                      </span>
                    </label>
                    <input
                      id="tectonic-slider"
                      aria-label="Tectonic epoch slider in million years ago"
                      type="range"
                      min="0"
                      max="70"
                      step="5"
                      value={tectonicEpoch}
                      onChange={e => {
                        setTectonicEpoch(parseInt(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full mt-2 accent-amber-500"
                    />
                  </div>

                  <div className="h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative p-4 flex items-center justify-center">
                    <svg viewBox="0 0 500 240" className="w-full h-full" aria-label="Tectonic Collision Diagram">
                      <rect x="50" y="20" width="400" height="50" rx="6" fill="#1e293b" stroke="#475569" />
                      <text x="250" y="50" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold">
                        EURASIAN PLATE (Angaraland)
                      </text>

                      {tectonicEpoch > 30 && (
                        <g>
                          <rect x="100" y="75" width="300" height="40" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeDasharray="4 2" />
                          <text x="250" y="98" fill="#38bdf8" fontSize="10" textAnchor="middle">
                            Tethys Sea (Geosynclinal marine sediments accumulating)
                          </text>
                        </g>
                      )}

                      {tectonicEpoch <= 30 && (
                        <g>
                          <polygon points="120,75 160,35 200,75 250,30 300,75 350,32 390,75" fill="#ca8a04" stroke="#eab308" strokeWidth="2" />
                          <text x="250" y="70" fill="#fef08a" fontSize="10" textAnchor="middle" fontWeight="bold">
                            HIMALAYAN FOLD RANGES (Himadri, Himachal, Shiwalik)
                          </text>
                        </g>
                      )}

                      {(() => {
                        const yPos = 80 + (tectonicEpoch / 70) * 90;
                        return (
                          <g>
                            <rect x="120" y={yPos} width="260" height="50" rx="8" fill="#166534" stroke="#22c55e" strokeWidth="2" />
                            <text x="250" y={yPos + 30} fill="#86efac" fontSize="11" textAnchor="middle" fontWeight="bold">
                              INDIAN CRATON (Ancient Archaean-Dharwar Shield)
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 2: PHYSIOGRAPHIC CROSS SECTION */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'himalaya', label: '1. Himalayas (Himadri/Himachal/Shiwalik)' },
                      { id: 'plains', label: '2. Indo-Gangetic Plains (Bhabar/Tarai/Khadar)' },
                      { id: 'plateau', label: '3. Peninsular Plateau (Malwa/Chotanagpur/Deccan)' },
                      { id: 'coasts', label: '4. Coastal Plains & Ghats Barrier' },
                    ].map(p => (
                      <motion.button
                        key={p.id}
                        aria-label={`Physiographic region: ${p.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActivePhysioPart(p.id);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg ${
                          activePhysioPart === p.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {p.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 h-64 overflow-y-auto">
                    {activePhysioPart === 'himalaya' && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-amber-300">Himalayan Mountain Complex (Young Tertiary Folds)</h4>
                        <p className="text-xs text-slate-300">
                          Three parallel longitudinal ranges: <strong>Himadri</strong> (6,000m avg elevation, Siachen & Gangotri glaciers), <strong>Himachal</strong> (3,700–4,500m, hill stations like Shimla & Darjeeling), and <strong>Shiwalik</strong> (900–1,200m, gravel duns like Dehra Dun).
                        </p>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                          🌲 <strong>Eastern vs Western Himalayas:</strong> Eastern Himalayas receive heavy Bay of Bengal monsoon rains with dense evergreen forests; Western Himalayas are higher, colder, drier with conifers.
                        </div>
                      </div>
                    )}
                    {activePhysioPart === 'plains' && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-emerald-300">Indo-Ganga-Brahmaputra Plains (Quaternary Alluvium)</h4>
                        <p className="text-xs text-slate-300">
                          A 2,400 km long alluvium-filled foredeep. Four distinct North-to-South belts: <strong>Bhabar</strong> (porous gravel at foothills where rivers sink), <strong>Tarai</strong> (marshy zone where streams re-emerge), <strong>Bhangar</strong> (older alluvium with kankar), and <strong>Khadar</strong> (newer fertile silt refreshed every monsoon flood).
                        </p>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                          🌾 <strong>Doab:</strong> The fertile interfluvial land between two rivers (e.g. Ganga-Yamuna Doab).
                        </div>
                      </div>
                    )}
                    {activePhysioPart === 'plateau' && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-sky-300">Peninsular Plateau (Ancient Archaean-Dharwar Shield)</h4>
                        <p className="text-xs text-slate-300">
                          Earth's oldest stable block. Divided into: <strong>Malwa Plateau</strong> (Central Highlands), <strong>Chotanagpur Plateau</strong> (mineral treasure of Damodar rift, Ranchi & Hazaribagh), and <strong>Deccan Lava Plateau</strong> (thick Cretaceous basalt sheets weathered into moisture-retentive black regur cotton soil).
                        </p>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                          ⛏️ <strong>Chambal Badlands:</strong> Deep ravines carved into soft alluvium by severe gully erosion.
                        </div>
                      </div>
                    )}
                    {activePhysioPart === 'coasts' && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-rose-300">Coastal Plains, Ghats & Island Groups</h4>
                        <p className="text-xs text-slate-300">
                          <strong>Western Coastal Plain:</strong> Narrow (10–80 km), steep, short swift rivers forming estuaries (Kutch, Konkan, Kanara, Malabar with Vembanad backwaters).<br />
                          <strong>Eastern Coastal Plain:</strong> Broad (100–120 km), large delta fans (Mahanadi, Godavari, Krishna, Kaveri).<br />
                          <strong>Islands:</strong> Andaman & Nicobar (volcanic peaks in Bay of Bengal) vs Lakshadweep (coral atolls in Arabian Sea).
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 3: DRAINAGE SYSTEMS & RIVER BIRTHPLACES */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex gap-2">
                      {(['all', 'himalayan', 'peninsular'] as const).map(g => (
                        <motion.button
                          key={g}
                          aria-label={`Filter by ${g} drainage`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveDrainageGroup(g);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1 text-xs font-bold rounded-lg capitalize ${
                            activeDrainageGroup === g ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {g} Drainage
                        </motion.button>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">Click a river to inspect its exact source:</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { key: 'ganga', name: 'Ganga', source: 'Gangotri Glacier (Uttarakhand)', type: 'himalayan' },
                      { key: 'indus', name: 'Indus', source: 'Mansarovar Lake (Tibet)', type: 'himalayan' },
                      { key: 'brahmaputra', name: 'Brahmaputra', source: 'Angsi Glacier (Tibet)', type: 'himalayan' },
                      { key: 'godavari', name: 'Godavari', source: 'Trimbakeshwar (Nashik, MH)', type: 'peninsular' },
                      { key: 'narmada', name: 'Narmada', source: 'Amarkantak Plateau (MP)', type: 'peninsular' },
                      { key: 'kaveri', name: 'Kaveri', source: 'Brahmagiri Hills (Talakaveri, KA)', type: 'peninsular' },
                    ]
                      .filter(r => activeDrainageGroup === 'all' || r.type === activeDrainageGroup)
                      .map(r => (
                        <motion.button
                          key={r.key}
                          aria-label={`Select river ${r.name}, ${r.type} system, source: ${r.source}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleRiverSelect(r.key)}
                          className={`p-3 text-left rounded-xl border text-xs ${
                            selectedRiver === r.key
                              ? 'bg-sky-950 border-sky-500 text-sky-200'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between">
                            <span>{r.name}</span>
                            <span className="text-[10px] uppercase font-mono text-slate-400">{r.type}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">Birthplace: {r.source}</div>
                        </motion.button>
                      ))}
                  </div>

                  {selectedRiver && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-sky-800/60 text-xs text-sky-300">
                      🌊 <strong>Source & Character:</strong>{' '}
                      {selectedRiver === 'ganga' && 'Perennial snowmelt river rising from Gangotri; builds massive dendritic alluvial plain and Sundarbans delta.'}
                      {selectedRiver === 'indus' && 'Rises near Mansarovar; feeds the 5 doabs of the Punjab plains (Jhelum, Chenab, Ravi, Beas, Sutlej).'}
                      {selectedRiver === 'brahmaputra' && 'Carries enormous silt volume from heavy Assam rainfall; famous for braided channels & Majuli island.'}
                      {selectedRiver === 'godavari' && 'Largest Peninsular river ("Dakshin Ganga") originating at Trimbakeshwar near Nashik.'}
                      {selectedRiver === 'narmada' && 'Flows westward through a tectonic rift valley between Vindhya and Satpura ranges without forming a delta.'}
                      {selectedRiver === 'kaveri' && 'Rises at Brahmagiri; unique among peninsular rivers as its lower basin receives winter retreat monsoon rainfall.'}
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 4: THE MONSOON ENGINE & CLIMATE CLIMOGRAPH */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* Predict then check section */}
                  {!predictionMade && (
                    <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/60">
                      <p className="text-xs font-bold text-emerald-300 mb-2">🤔 {PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction choice ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-slate-200 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-amber-400">
                        {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </span>
                      <span className="text-xs text-emerald-400 font-bold">✓ Prediction Active</span>
                    </div>
                  )}

                  {/* Seasonal Pressure & ITCZ Slider */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-300 flex justify-between" htmlFor="season-slider">
                      <span>
                        Current Season / Month:{' '}
                        <strong>
                          {seasonMonthVal === 1
                            ? 'January (Winter High Pressure / NE Outflow)'
                            : seasonMonthVal === 5
                            ? 'May (Intense Summer Heating / Pre-Monsoon Loo)'
                            : seasonMonthVal === 7
                            ? 'July (SW Monsoon Peak / Deep Low Pressure Trough)'
                            : 'October (Retreating Monsoon / Tamil Nadu Peak)'}
                        </strong>
                      </span>
                      <span className="text-sky-400 font-mono">Month: {seasonMonthVal}</span>
                    </label>
                    <input
                      id="season-slider"
                      aria-label="Seasonal month pressure and wind reversal slider from Month 1 to 12"
                      type="range"
                      min="1"
                      max="12"
                      value={seasonMonthVal}
                      onChange={e => {
                        setSeasonMonthVal(parseInt(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full mt-2 accent-sky-500"
                    />
                  </div>

                  {/* Climate Climograph Viewer */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {Object.keys(CLIMATE_STATIONS).map(stKey => (
                          <motion.button
                            key={stKey}
                            aria-label={`Select climatic station ${stKey}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedStation(stKey);
                              audioManager.play('tap');
                            }}
                            className={`px-2.5 py-1 text-xs font-bold rounded-lg capitalize ${
                              selectedStation === stKey ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
                            }`}
                          >
                            {stKey}
                          </motion.button>
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400">{CLIMATE_STATIONS[selectedStation].desc}</span>
                    </div>

                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={CLIMATE_STATIONS[selectedStation].data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                          <YAxis yAxisId="left" stroke="#38bdf8" fontSize={10} unit="mm" />
                          <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={10} unit="°C" />
                          <RechartsTooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', fontSize: '11px' }} />
                          <Legend wrapperStyle={{ fontSize: '10px' }} />
                          <Bar yAxisId="left" dataKey="rainfall" fill="#0284c7" name="Rainfall (mm)" />
                          <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} name="Temperature (°C)" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-white mb-2">🔎 {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation answer choice ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-slate-200 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation footer */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous interactive lab step"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next interactive lab step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Proceed to Free Sandbox exploration"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-green-900/40"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/60 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span aria-hidden="true">🎛️</span> Geospatial Simulation Sandbox (No Pressure / Free Play)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Toggle map layers, change altitude and latitude, and simulate atmospheric lapse rates in real-time.
              </p>
            </div>
            <motion.button
              aria-label="Proceed to Mastery Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/40"
            >
              Ready for Mastery Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Controls */}
            <div className="space-y-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Map Layer Controls</h3>
              <div className="grid grid-cols-2 gap-2">
                {(['relief', 'rivers', 'monsoon', 'grid'] as const).map(l => (
                  <motion.button
                    key={l}
                    aria-label={`Toggle ${l} map layer`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedMapLayer(l);
                      audioManager.play('tap');
                    }}
                    className={`p-2.5 text-xs font-bold rounded-xl capitalize ${
                      selectedMapLayer === l ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {l} Layer
                  </motion.button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Atmospheric Lapse Rate Lab</h3>
                <div>
                  <label className="text-xs text-slate-400 flex justify-between" htmlFor="altitude-slider">
                    <span>Altitude: <strong>{altitudeMeters} m</strong></span>
                    <span className="text-amber-400 font-bold">{calculatedTemperature}°C</span>
                  </label>
                  <input
                    id="altitude-slider"
                    aria-label="Altitude slider from 0 to 6000 meters"
                    type="range"
                    min="0"
                    max="6000"
                    step="50"
                    value={altitudeMeters}
                    onChange={e => setAltitudeMeters(parseInt(e.target.value))}
                    className="w-full mt-1 accent-sky-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Normal Lapse Rate: Temperature drops ~1°C for every 165 metres of elevation gain.
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Interactive Multi-Layer Canvas Map */}
            <div className="md:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative flex flex-col items-center justify-center">
              <canvas ref={canvasRef} width={450} height={260} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

              <svg viewBox="0 0 500 300" className="w-full h-64 z-10" aria-label="Interactive Multi-Layer Map Sandbox">
                {/* Lat/Long Grid overlay */}
                {selectedMapLayer === 'grid' && (
                  <g opacity="0.8">
                    <line x1="50" y1="50" x2="450" y2="50" stroke="#334155" strokeDasharray="3 3" />
                    <text x="455" y="53" fill="#64748b" fontSize="8">37°6' N</text>
                    <line x1="50" y1="150" x2="450" y2="150" stroke="#f59e0b" strokeDasharray="4 2" />
                    <text x="455" y="153" fill="#fbbf24" fontSize="8">23°30' N</text>
                    <line x1="50" y1="260" x2="450" y2="260" stroke="#334155" strokeDasharray="3 3" />
                    <text x="455" y="263" fill="#64748b" fontSize="8">8°4' N</text>
                  </g>
                )}

                {/* Relief Outlines */}
                <polygon
                  points="250,55 350,90 320,160 250,250 180,160 140,110 180,70"
                  fill="rgba(30, 41, 59, 0.4)"
                  stroke="#475569"
                  strokeWidth="1.5"
                />

                {/* Relief Layer Details */}
                {selectedMapLayer === 'relief' && (
                  <g>
                    {/* Himalayas Arc */}
                    <path d="M 170,70 Q 250,45 350,90" fill="none" stroke="#eab308" strokeWidth="4" />
                    <text x="250" y="45" fill="#fef08a" fontSize="9" textAnchor="middle">Himadri & Shiwaliks</text>
                    {/* Deccan Traps */}
                    <polygon points="190,160 270,160 230,220" fill="rgba(234, 88, 12, 0.3)" stroke="#ea580c" />
                    <text x="230" y="185" fill="#fdba74" fontSize="8" textAnchor="middle">Deccan Basalt</text>
                    {/* Western Ghats Wall */}
                    <path d="M 180,160 L 230,245" stroke="#ef4444" strokeWidth="3" />
                    <text x="165" y="205" fill="#fca5a5" fontSize="8">Western Ghats</text>
                  </g>
                )}

                {/* Rivers Layer */}
                {selectedMapLayer === 'rivers' && (
                  <g>
                    {/* Ganga */}
                    <path d="M 210,75 Q 260,105 330,140" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="280" y="105" fill="#7dd3fc" fontSize="8">Ganga</text>
                    {/* Godavari */}
                    <path d="M 200,165 Q 260,175 300,185" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <text x="260" y="170" fill="#7dd3fc" fontSize="8">Godavari</text>
                    {/* Narmada (West flowing) */}
                    <path d="M 240,145 L 175,145" fill="none" stroke="#f43f5e" strokeWidth="2" />
                    <text x="210" y="140" fill="#fda4af" fontSize="8">Narmada (Rift)</text>
                  </g>
                )}

                {/* Monsoon Layer */}
                {selectedMapLayer === 'monsoon' && (
                  <g>
                    <motion.path
                      d="M 150,270 Q 180,210 200,160"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="3"
                      strokeDasharray="6 3"
                      animate={{ strokeDashoffset: [0, -18] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    />
                    <text x="130" y="230" fill="#38bdf8" fontSize="8">Arabian Sea Branch</text>
                    <motion.path
                      d="M 320,270 Q 330,210 320,150"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="3"
                      strokeDasharray="6 3"
                      animate={{ strokeDashoffset: [0, -18] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    />
                    <text x="335" y="230" fill="#38bdf8" fontSize="8">Bay of Bengal Branch</text>
                  </g>
                )}
              </svg>

              <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mt-2 px-2">
                <span>Active Layer: <strong className="text-emerald-400 capitalize">{selectedMapLayer}</strong></span>
                <span>Subcontinental Bounds: <strong>8°4'N - 37°6'N</strong></span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ASSESSMENT PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Top Status & Adaptive Difficulty Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400">
                Challenge <strong>{currentChallenge + 1}</strong> of {filteredChallenges.length}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span aria-hidden="true">🎯</span> NEP Competency:{' '}
                <span className="text-emerald-400 uppercase text-xs font-mono">
                  {challenge.competencyLevel}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-green-950 text-green-400 border border-green-800'
                    : difficulty === 'advanced'
                    ? 'bg-red-950 text-red-400 border border-red-800'
                    : 'bg-blue-950 text-blue-400 border border-blue-800'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-xs text-slate-400 font-mono">
                BKT Mastery: <strong className="text-white">{masteryLevel}</strong>
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800" role="progressbar" aria-valuenow={Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card Container */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
              {challenge.question}
            </h3>

            {/* TYPE 1: MCQ & CLASSIFY / DISTINGUISH */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5 pt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all ${
                        wrongFlash
                          ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800'
                      }`}
                    >
                      <span className="font-bold mr-2 text-slate-400">
                        {showExplanation && i === challenge.correctIndex ? '✓ ' : ''}
                        {String.fromCharCode(65 + i)}.
                      </span>{' '}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* TYPE 2: DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-emerald-700 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target for ${targetId}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-3 bg-slate-900 rounded-xl border border-dashed border-slate-700 flex flex-col justify-between min-h-[70px]"
                    >
                      <span className="text-[11px] text-slate-400 uppercase font-mono">{targetId.replace('_', ' ')}:</span>
                      <span className="text-xs font-bold text-emerald-300 mt-1">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : '👉 Drop Matching Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Target Placements"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Target Placements
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable sequence item ${displayIndex + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded">
                      {displayIndex + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Verify Chronological Sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Chronological Sequence
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Numerical answer input"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-48"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit Calculation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 text-emerald-200 text-xs rounded-lg border border-emerald-800 flex items-center gap-2"
                    >
                      <span>✓ {part}</span>
                      <button
                        aria-label={`Remove component ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-bold hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above to assemble the engine components...</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Constructed Engine"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Constructed Engine
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-emerald-950/60 to-slate-950 rounded-2xl border border-emerald-700/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <span aria-hidden="true">📖</span> STEP-BY-STEP GEOGRAPHIC DECONSTRUCTION
                </div>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-emerald-400">✓ {i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Reveal Next Step of explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-bold rounded-xl border border-slate-700"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finish Assessment' : 'Next Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Assessment →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 rounded-2xl border border-emerald-600 text-center space-y-3 shadow-2xl">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl font-black text-white">Geographic Assessment Complete!</h2>
            <div className="flex justify-center gap-6 text-sm font-semibold text-slate-300">
              <span>
                Final Accuracy: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </span>
              <span>
                Mastery Achieved: <strong className="text-sky-400 capitalize">{masteryLevel}</strong>
              </span>
            </div>

            {/* Motivational feedback based on errors */}
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 max-w-2xl mx-auto space-y-1.5">
              <div className="text-base sm:text-lg font-black tracking-wide">
                {errors === 0 && <span className="text-emerald-400">✓ PERFECT SCORE! 🌟</span>}
                {errors >= 1 && errors <= 3 && <span className="text-teal-400">✓ Great work! 👏</span>}
                {errors >= 4 && errors <= 7 && <span className="text-amber-400">✓ Good effort! 💪</span>}
                {errors >= 8 && <span className="text-rose-400">✗ Do not give up — You WILL get this! 🚀</span>}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {errors === 0
                  ? 'Flawless Mastery! You have demonstrated exceptional precision in locational coordinates, geological epochs, drainage sources, and monsoon dynamics.'
                  : errors <= 3
                  ? 'Strong Performance! You have a solid grasp of India\'s physical setting. Review the flagged misconceptions below to reach perfection.'
                  : errors <= 7
                  ? 'Good foundation! Re-explore the labs and check your misconception profile below to solidify your understanding.'
                  : 'Keep practicing! Geography rewards spatial understanding. Re-explore the interactive labs, review the hints, and try again!'}
              </p>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span aria-hidden="true">💡</span> Reflection & Synthesis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  q: 'What was the most surprising thing you learned?',
                  icon: '🤯',
                  placeholder: 'e.g., The dual-branch monsoon engine, or the depth of the Chambal ravines...',
                },
                {
                  q: 'How would you explain this to a friend?',
                  icon: '🗣️',
                  placeholder: 'e.g., India acts like a giant physical pump splitting ocean moisture...',
                },
                {
                  q: 'Where in real life might you use this?',
                  icon: '🌍',
                  placeholder: 'e.g., Agricultural planning, climate resilience, or disaster preparedness...',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                  <p className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                    <span aria-hidden="true">{item.icon}</span> {item.q}
                  </p>
                  <textarea
                    aria-label={`Reflection answer for: ${item.q}`}
                    placeholder={item.placeholder}
                    rows={3}
                    className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MISCONCEPTION PROFILE TRACKER */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span aria-hidden="true">⚠️</span> Identified Misconception Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">✗ {m.misconception}</p>
                      <p className="text-emerald-400 font-medium">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SPACED REPETITION SCHEDULE VISIBILITY */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <span aria-hidden="true">📅</span> Spaced Repetition (SM-2 Algorithm)
            </h3>
            <p className="text-xs text-slate-300">
              Next scheduled review in{' '}
              <strong className="text-amber-300">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              . Repeated retrieval strengthens long-term memory for the CISCE Class 12 board examinations.
            </p>
          </div>

          {/* REAL WORLD PROJECT ACTIVITY */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span aria-hidden="true">🗺️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong className="text-emerald-400 mr-1.5">{idx + 1}.</strong> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* FEEDBACK OVERLAYS */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Registered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C12_GeographyIndiaLocationalSettingSim;
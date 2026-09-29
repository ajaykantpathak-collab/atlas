'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC GEOGRAPHY CLASS 11 NODE DECLARATIONS ───
const NODE_C11_GEO_011 = 'c11_geo_011'; // Aeolian processes and landforms
const NODE_C11_GEO_012 = 'c11_geo_012'; // Glacial processes and landforms
const NODE_C11_GEO_013 = 'c11_geo_013'; // Groundwater processes and karst landforms
const NODE_C11_GEO_014 = 'c11_geo_014'; // Marine processes and coastal landforms
const NODE_C11_GEO_015 = 'c11_geo_015'; // Atmosphere — composition and structure
const NODE_C11_GEO_016 = 'c11_geo_016'; // Atmospheric temperature
const NODE_C11_GEO_017 = 'c11_geo_017'; // Atmospheric pressure
const NODE_C11_GEO_018 = 'c11_geo_018'; // Atmospheric moisture
const NODE_C11_GEO_019 = 'c11_geo_019'; // Climate change
const NODE_C11_GEO_020 = 'c11_geo_020'; // Ocean relief

const ALL_NODE_IDS = [
  NODE_C11_GEO_011,
  NODE_C11_GEO_012,
  NODE_C11_GEO_013,
  NODE_C11_GEO_014,
  NODE_C11_GEO_015,
  NODE_C11_GEO_016,
  NODE_C11_GEO_017,
  NODE_C11_GEO_018,
  NODE_C11_GEO_019,
  NODE_C11_GEO_020,
];

// ─── NARRATIVE EXPEDITION SCENARIO ───
const SCENARIO = {
  title: 'The Great Thar & Global Geomorphic Expedition',
  intro: 'You are leading a geological survey across Jaisalmer (Thar Desert), the Gangotri Glacier in the Himalayas, the Borra Karst Caves in Andhra Pradesh, and the Konkan Coast. Along the way, your instruments will sample vertical atmospheric lapse rates, pressure belts, and deep oceanic trenches.',
  context: 'Agents of gradation (wind, ice, groundwater, and waves) and atmospheric dynamics sculpt the Earth. Test models, balance budgets, and predict geomorphic phenomena.',
};

// ─── DISCOVERY CURIOSITY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In the Thar Desert near Jaisalmer, why do classic "Mushroom Rocks" have an extremely narrow, slender base but a broad, intact top?',
  options: [
    'Upper desert winds are faster and blow the sand clean off the top without touching it.',
    'Saltating (bouncing) abrasive sand grains are concentrated heavily within 1 to 2 metres of the ground.',
    'Chemical rain dissolves the bottom limestone while leaving the top sandstone layer untouched.',
    'Desert camels rub against the rock bases over centuries, scouring the stone.',
  ],
  correctIndex: 1,
  hintAfter: 'Wind abrasion is a near-surface sandblasting phenomenon — most sand grains bounce in the lowest 1–2 metres!',
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

// ─── 22 COMPREHENSIVE CHALLENGES SPANNING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Aeolian (Foundation / Recall)
  {
    id: 'ch_geo_001',
    nodeId: NODE_C11_GEO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which aeolian process describes the direct lifting and mechanical removal of loose, fine dry silt and dust by turbulent wind eddies?',
    options: ['Abrasion', 'Deflation', 'Attrition', 'Carbonation'],
    correctIndex: 1,
    explanation: 'Deflation is the physical lifting and removal of unconsolidated dry sand and silt particles by wind. Abrasion, by contrast, is the sandblasting impact of saltating grains on solid bedrock.',
    hints: [
      'Think of "deflating" a tire or sweeping loose dust off a floor.',
      'This process creates hollows and depressions without grinding rock faces.',
      'The term is Deflation.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Aeolian - Drag Label (Foundation / Understanding)
  {
    id: 'ch_geo_002',
    nodeId: NODE_C11_GEO_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the desert landforms based on whether they are formed by wind EROSION (Abrasion/Deflation) or wind DEPOSITION.',
    dragItems: [
      { label: 'Mushroom Rock (Abrasion)', targetId: 't_ero1' },
      { label: 'Deflation Hollow (Deflation)', targetId: 't_ero2' },
      { label: 'Barchan Dune (Deposition)', targetId: 't_dep1' },
      { label: 'Loess Plateau (Deposition)', targetId: 't_dep2' },
    ],
    correctMapping: {
      t_ero1: 'Mushroom Rock (Abrasion)',
      t_ero2: 'Deflation Hollow (Deflation)',
      t_dep1: 'Barchan Dune (Deposition)',
      t_dep2: 'Loess Plateau (Deposition)',
    },
    explanation: 'Mushroom rocks and deflation hollows are carved by wind erosion. Barchans (crescent dunes) and loess deposits are constructed by sediment settling when wind decelerates.',
    hints: [
      'Mushroom rocks are carved by sandblasting at ground level.',
      'Barchans and loess are heaps of sand and silt accumulated by settling.',
      'Map erosional features to EROSION targets and depositional dunes to DEPOSITION targets.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Glacial (Foundation / Understanding)
  {
    id: 'ch_geo_003',
    nodeId: NODE_C11_GEO_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why do glacial valleys possess a broad, flat-floored "U-shape" while river valleys have a sharp "V-shape"?',
    options: [
      'Glaciers flow much faster than rushing mountain rivers.',
      'Glaciers are massive viscous ice solids that fill the entire valley width, eroding floors and valley walls simultaneously.',
      'Glacial ice only dissolves limestone chemically without mechanical scraping.',
      'Rivers have wider floodplains in mountain source tracts than glaciers.',
    ],
    correctIndex: 1,
    explanation: 'A river is a fluid concentrated along a narrow channel bed causing vertical downcutting (V-shape). A glacier is a solid ice mass occupying the entire valley profile, scouring floor and sidewalls together via plucking and abrasion into a U-shaped trough.',
    hints: [
      'Consider the difference between a liquid flowing at the base versus a solid filling the entire gorge.',
      'Glaciers erode the lateral walls and bed simultaneously.',
      'The solid ice mass fills the entire valley from wall to wall.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Glacial Moraines - Match (Standard / Analysis)
  {
    id: 'ch_geo_004',
    nodeId: NODE_C11_GEO_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When two tributary valley glaciers in the Himalayas converge into a single main ice stream, what distinct moraine feature forms along their central junction?',
    options: ['Terminal Moraine', 'Medial Moraine', 'Ground Moraine', 'Lateral Moraine'],
    correctIndex: 1,
    explanation: 'When two tributary glaciers merge, their adjacent lateral moraines coalesce in the middle of the combined ice flow to create a prominent dark central stripe known as a Medial Moraine.',
    hints: [
      'Lateral means side; what happens when two sides meet in the center?',
      'Think of two merging highways sharing an inner lane.',
      'It runs down the middle: Medial Moraine.',
    ],
    misconceptionIndex: 1,
  },
  // 5. Karst (Foundation / Recall)
  {
    id: 'ch_geo_005',
    nodeId: NODE_C11_GEO_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What chemical reaction allows percolating groundwater to dissolve massive limestone beds in regions like Slovenia or the Borra Caves of India?',
    options: [
      'Hydrochloric acid from volcanic dust attacks quartz crystals.',
      'Rainwater absorbs atmospheric and soil CO2 to form weak carbonic acid (H2CO3), converting insoluble CaCO3 into soluble calcium bicarbonate.',
      'Pure neutral H2O mechanically scrapes basalt grains through high hydraulic pressure.',
      'Sulphuric acid from ocean spray digests granite rock faces.',
    ],
    correctIndex: 1,
    explanation: 'Rainwater absorbs CO2 from the atmosphere and decaying soil humus, forming weak carbonic acid (H2CO3). This dissolves insoluble calcium carbonate (CaCO3) into soluble calcium bicarbonate [Ca(HCO3)2], creating vast subterranean karst caverns.',
    hints: [
      'Limestone is composed of calcium carbonate.',
      'Carbon dioxide + water creates weak carbonic acid.',
      'Groundwater acts primarily as a chemical solvent rather than a mechanical abrasive.',
    ],
    misconceptionIndex: 2,
  },
  // 6. Karst - Drag Sort Cave Formations (Standard / Analysis)
  {
    id: 'ch_geo_006',
    nodeId: NODE_C11_GEO_013,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of speleothem evolution in a subterranean karst cavern from initial seepage to complete structural column.',
    sortItems: [
      'Acidic groundwater percolates through limestone ceiling joints',
      'Water drips and loses CO2, precipitating downward icicle-like Stalactites',
      'Drips strike cave floor and mineral mounds build upward as Stalagmites',
      'Growing Stalactite and rising Stalagmite fuse together into a complete Pillar',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Water seeps through roof joints → drips precipitate hanging stalactites → floor splatter accumulates stalagmites → eventual vertical fusion creates a continuous cave pillar.',
    hints: [
      'Start with water entering the ceiling joints.',
      'Remember: Stalactites hang from the ceiling ("c" for ceiling); Stalagmites grow from the ground ("g" for ground).',
      'Pillars only form after ceiling and floor deposits meet.',
    ],
    misconceptionIndex: 2,
  },
  // 7. Marine - Sequence (Standard / Analysis)
  {
    id: 'ch_geo_007',
    nodeId: NODE_C11_GEO_014,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential evolutionary stages of coastal headland erosion under persistent hydraulic wave attack.',
    sortItems: [
      'Wave attack cuts a basal notch at high tide level',
      'Hydraulic action expands the notch into a deep Sea Cave',
      'Caves on opposing sides of a narrow headland breach through to form a Sea Arch',
      'Arch roof collapses under gravity, leaving an isolated rock pillar (Sea Stack)',
      'Wave attrition grinds the pillar down into a low, submerged Sea Stump',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The classic coastal erosional sequence is: Notch → Sea Cave → Sea Arch → Sea Stack (roof collapse) → Sea Stump (further marine attrition).',
    hints: [
      'Erosion starts small at the cliff base (notch).',
      'An arch must collapse before an isolated stack can stand.',
      'The stump is the final worn-down remnant.',
    ],
    misconceptionIndex: 3,
  },
  // 8. Marine Coastal Types (Standard / Application)
  {
    id: 'ch_geo_008',
    nodeId: NODE_C11_GEO_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Sundarbans delta in West Bengal is characterised by low-energy muddy tidal creeks stabilized by dense, salt-tolerant pneumatophore root systems. How is this coastline classified?',
    options: ['Highland Cliffed Coast', 'Coral Atoll Coast', 'Mangrove Coast', 'Fjord Coast'],
    correctIndex: 2,
    explanation: 'The Sundarbans represent a prime mangrove coastline: sheltered, depositional, low-energy muddy intertidal zones protected by halophytic mangrove forests.',
    hints: [
      'Look for the reference to salt-tolerant vegetation and root systems.',
      'This is an estuarine depositional setting.',
      'Mangrove forests dominate the Sundarbans.',
    ],
    misconceptionIndex: 3,
  },
  // 9. Atmosphere Composition (Foundation / Recall)
  {
    id: 'ch_geo_009',
    nodeId: NODE_C11_GEO_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the correct volumetric proportion of permanent gases in clean dry atmospheric air at sea level?',
    options: [
      'Oxygen ~78%, Nitrogen ~21%, Carbon Dioxide ~1%',
      'Nitrogen ~78.08%, Oxygen ~20.95%, Argon ~0.93%, Carbon Dioxide ~0.04%',
      'Nitrogen ~50%, Oxygen ~40%, Water Vapour ~10%',
      'Hydrogen ~75%, Helium ~23%, Oxygen ~2%',
    ],
    correctIndex: 1,
    explanation: 'Dry atmospheric air consists of approximately 78.08% Nitrogen, 20.95% Oxygen, 0.93% Argon, and trace variable gases including ~0.04% Carbon Dioxide.',
    hints: [
      'Nitrogen is by far the most abundant gas, not oxygen.',
      'Oxygen makes up just under 21%.',
      'Argon is the third most abundant permanent gas at ~0.93%.',
    ],
    misconceptionIndex: 4,
  },
  // 10. Atmospheric Structure - Numeric Lapse Rate (Standard / Application)
  {
    id: 'ch_geo_010',
    nodeId: NODE_C11_GEO_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If surface sea-level temperature at Mumbai is 30.0°C, calculate the theoretical temperature (°C) at an altitude of 4 km in the troposphere using the standard Environmental Lapse Rate of 6.5°C per 1,000 m.',
    correctAnswer: 4.0,
    tolerance: 0.5,
    unit: '°C',
    explanation: 'Temperature drop = 4 km × 6.5°C/km = 26.0°C drop. Altitude Temp = 30.0°C - 26.0°C = 4.0°C.',
    hints: [
      'Multiply the altitude (4 km) by the lapse rate (6.5°C/km).',
      '4 × 6.5 = 26.0°C total temperature decrease.',
      'Subtract 26.0°C from the sea-level temperature of 30.0°C.',
    ],
    misconceptionIndex: 4,
  },
  // 11. Temperature Inversion (Advanced / Analysis)
  {
    id: 'ch_geo_011',
    nodeId: NODE_C11_GEO_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During a clear, calm winter night in the Kashmir Valley, surface ground radiates heat rapidly into space, chilling the direct contact air layer below warmer air aloft. What is this phenomenon and its consequence?',
    options: [
      'Frontal uplifting producing cyclonic tornadoes',
      'Radiation Temperature Inversion, which creates atmospheric stability, dense surface fog, and traps urban pollutants close to the ground',
      'Adiabatic warming triggering intense convective thunderstorms',
      'Urban heat island dissipation resulting in zero humidity',
    ],
    correctIndex: 1,
    explanation: 'Radiation Inversion occurs on long, clear, calm winter nights when ground heat radiates out, leaving cold dense air trapped below warmer air. This caps vertical air motion, creating fog and severe pollutant smog.',
    hints: [
      'Normal lapse rate reverses: cold air sits at the bottom.',
      'The warm layer above acts as a lid trapping ground emissions.',
      'This is a Radiation Temperature Inversion.',
    ],
    misconceptionIndex: 4,
  },
  // 12. Atmospheric Pressure Units & Barometers (Foundation / Recall)
  {
    id: 'ch_geo_012',
    nodeId: NODE_C11_GEO_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard mean atmospheric pressure at sea level expressed in millibars (mb/hPa) and equivalent mercury column height (mm Hg)?',
    options: [
      '760 mb and 1013.25 mm Hg',
      '1013.25 mb (hPa) and 760 mm Hg (Torricelli height)',
      '100 mb and 76 mm Hg',
      '14.7 mb and 300 mm Hg',
    ],
    correctIndex: 1,
    explanation: 'Standard sea-level atmospheric pressure is 1013.25 millibars (equivalent to 1013.25 hectopascals), which supports a 760 mm column of liquid mercury in a Torricelli barometer.',
    hints: [
      'Do not reverse the numbers: 1013.25 is pressure in mb; 760 is height of mercury in mm.',
      'Millibars and hectopascals share the exact same numeric value.',
      '1013.25 mb = 760 mm Hg.',
    ],
    misconceptionIndex: 5,
  },
  // 13. Planetary Pressure Belts & Winds (Standard / Application)
  {
    id: 'ch_geo_013',
    nodeId: NODE_C11_GEO_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The great subtropical high-pressure belt at ~30°N & 30°S (Horse Latitudes) is characterised by descending dry air. Which planetary wind system blows from this belt towards the Equatorial Low (Doldrums)?',
    options: ['Westerlies', 'Polar Easterlies', 'Trade Winds (Hadley Cell)', 'Jet Streams'],
    correctIndex: 2,
    explanation: 'Trade winds blow from the subtropical high-pressure belts (30°N/S) towards the equatorial low-pressure trough, deflected by Coriolis force (NE trades in Northern Hemisphere, SE trades in Southern Hemisphere).',
    hints: [
      'These winds were historically used by merchant sailing vessels.',
      'They blow equatorward from 30° latitude.',
      'They are the Trade Winds.',
    ],
    misconceptionIndex: 5,
  },
  // 14. Atmospheric Moisture - Psychrometer & Relative Humidity (Standard / Application)
  {
    id: 'ch_geo_014',
    nodeId: NODE_C11_GEO_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A wet-and-dry bulb psychrometer at Pune displays Dry Bulb = 32°C and Wet Bulb = 32°C (Wet Bulb Depression = 0°C). What does this zero temperature difference signify?',
    options: [
      'Relative Humidity is 0% and evaporation is taking place at maximum speed.',
      'Relative Humidity is 100%; the air is fully saturated, so zero net evaporation occurs from the wet bulb.',
      'Atmospheric pressure has dropped to absolute vacuum.',
      'A radiation inversion has eliminated all water vapour.',
    ],
    correctIndex: 1,
    explanation: 'When wet bulb equals dry bulb temperature (depression = 0°C), no evaporative cooling can occur because the surrounding air is at 100% Relative Humidity (fully saturated).',
    hints: [
      'Evaporation causes cooling. If no cooling happens, how much evaporation occurred?',
      'If the air cannot hold any more water, evaporation ceases.',
      'Relative Humidity is 100%.',
    ],
    misconceptionIndex: 6,
  },
  // 15. Precipitation Types - Western Ghats (Standard / Understanding)
  {
    id: 'ch_geo_015',
    nodeId: NODE_C11_GEO_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'During the Southwest Monsoon, moisture-laden Arabian Sea winds strike the Western Ghats, dumping >300 cm rainfall on Mahabaleshwar (windward) while Pune (leeward) gets <70 cm. What precipitation mechanism is this?',
    options: ['Convectional Precipitation', 'Orographic (Relief) Precipitation with Rain Shadow', 'Frontal / Cyclonic Precipitation', 'Steam Fog Condensation'],
    correctIndex: 1,
    explanation: 'Orographic precipitation occurs when moist air is mechanically forced upward by a mountain barrier, cooling adiabatically on the windward slope. The descending air on the leeward slope warms and dries, forming a rain shadow.',
    hints: [
      'Oros is the Greek word for mountain.',
      'Air is forced upward mechanically by the Western Ghats relief barrier.',
      'This is Orographic precipitation.',
    ],
    misconceptionIndex: 6,
  },
  // 16. Climate Change - Keeling Curve (Advanced / Evaluation)
  {
    id: 'ch_geo_016',
    nodeId: NODE_C11_GEO_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The Keeling Curve recorded at Mauna Loa shows atmospheric CO2 rising from ~315 ppm (1958) to >420 ppm today. Why does carbon isotope analysis (13C/12C ratio) prove this increase is anthropogenic rather than volcanic?',
    options: [
      'Volcanoes only emit pure nitrogen gas without carbon compounds.',
      'Fossil fuels derived from ancient plants are depleted in Carbon-13, and the atmospheric 13C/12C ratio has declined in exact lockstep with fossil fuel burning.',
      'The sun burns carbon-14 during solar maximum flares.',
      'Deforestation directly manufactures radioactive carbon isotopes in the upper stratosphere.',
    ],
    correctIndex: 1,
    explanation: 'Plants preferentially incorporate lighter Carbon-12 during photosynthesis. Combustion of ancient fossil plant fuels floods the atmosphere with 12C-enriched CO2, steadily lowering the atmospheric 13C/12C ratio (the Suess Effect) — proving the rise is from fossil fuel combustion, not volcanic degassing.',
    hints: [
      'Plants prefer the lighter Carbon-12 isotope.',
      'Fossil fuels are ancient compressed organic plant material.',
      'Burning fossil fuels dilutes the atmospheric 13C ratio.',
    ],
    misconceptionIndex: 7,
  },
  // 17. Climate Policy - Paris vs Kyoto (Advanced / Evaluation)
  {
    id: 'ch_geo_017',
    nodeId: NODE_C11_GEO_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does the 2015 Paris Climate Agreement architecture fundamentally differ from the 1997 Kyoto Protocol in engaging global emitters?',
    options: [
      'Kyoto was purely voluntary, while Paris placed binding criminal sanctions on developing nations.',
      'Kyoto imposed top-down binding targets solely on developed (Annex I) nations, whereas Paris uses universal bottom-up Nationally Determined Contributions (NDCs) with a 5-year ratchet mechanism.',
      'Paris abandoned all temperature goals, focusing exclusively on stratospheric ozone depletion.',
      'Kyoto applied only to tropical countries while Paris applies only to polar nations.',
    ],
    correctIndex: 1,
    explanation: 'The Kyoto Protocol was top-down and bound only developed nations. The Paris Agreement encompasses all nations through voluntary, self-determined NDCs with a 5-year ratchet mechanism aiming to limit warming well below 2.0°C (ideally 1.5°C).',
    hints: [
      'Look for the transition from a rigid Annex-I only framework to universal NDCs.',
      'Paris includes both developed and developing economies (like India and China).',
      'NDCs represent bottom-up national pledges.',
    ],
    misconceptionIndex: 7,
  },
  // 18. Ocean Relief - Continental Shelf (Foundation / Recall)
  {
    id: 'ch_geo_018',
    nodeId: NODE_C11_GEO_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the shallow, gently sloping submarine extension of a continent (up to ~200 m depth) where sunlight supports major fishing banks and offshore petroleum reservoirs (e.g., Mumbai High)?',
    options: ['Abyssal Deep Sea Plain', 'Continental Slope', 'Continental Shelf', 'Oceanic Trench'],
    correctIndex: 2,
    explanation: 'The Continental Shelf is the shallow submerged margin of the continental crust (0–200 m depth), rich in sunlight-driven marine phytoplankton, global commercial fisheries, and hydrocarbon deposits.',
    hints: [
      'It is like the continent\'s "front porch".',
      'Depth does not typically exceed 200 metres.',
      'It is the Continental Shelf.',
    ],
    misconceptionIndex: 8,
  },
  // 19. Ocean Relief - Pacific vs Atlantic (Standard / Analysis)
  {
    id: 'ch_geo_019',
    nodeId: NODE_C11_GEO_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the Pacific Ocean contain the deepest oceanic trenches (e.g., Mariana Trench ~11,000 m) whereas the Atlantic Ocean is dominated by a central mountain spine (Mid-Atlantic Ridge)?',
    options: [
      'The Pacific is bordered by active subduction zones ("Ring of Fire") consuming oceanic crust, while the Atlantic is bounded by passive margins with central divergence.',
      'The Atlantic has stronger tidal waves that completely fill in its trenches.',
      'Pacific water is denser and pushes the bedrock down by sheer weight.',
      'The Mid-Atlantic Ridge was built by coral polyps over millions of years.',
    ],
    correctIndex: 0,
    explanation: 'The Pacific is surrounded by destructive plate subduction boundaries (Ring of Fire) creating deep trenches, while the Atlantic is expanding via seafloor spreading along the divergent Mid-Atlantic Ridge bounded by passive continental margins.',
    hints: [
      'Think about tectonic boundaries: subduction (trench) vs divergence (ridge).',
      'The Pacific Ring of Fire features oceanic trenches where plates plunge into the mantle.',
      'The Atlantic has passive continental margins.',
    ],
    misconceptionIndex: 8,
  },
  // 20. Ocean Features - Seamounts vs Guyots (Standard / Understanding)
  {
    id: 'ch_geo_020',
    nodeId: NODE_C11_GEO_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What distinctive morphological difference separates a volcanic Guyot from a standard submarine Seamount?',
    options: [
      'A Guyot has a sharp, jagged conical peak that punctures the sea surface.',
      'A Guyot is a flat-topped seamount whose volcanic crest was planed flat by marine wave erosion before subsiding deep beneath sea level.',
      'A Guyot is composed purely of biogenic limestone while a seamount is made of ice.',
      'A Guyot is found only in freshwater mountain lakes.',
    ],
    correctIndex: 1,
    explanation: 'A Guyot (tablemount) is an extinct submarine volcanic mountain with a flat, level top, created when its peak was eroded flat by surface wave action before tectonic crustal subsidence carried it below wave base.',
    hints: [
      'Guyots have flat tops like underwater mesas.',
      'Wave action planed the summit when it was at sea level before it sank.',
      'Look for the option describing a flat-topped eroded summit.',
    ],
    misconceptionIndex: 8,
  },
  // 21. Construct Challenge - Atmospheric Layering (Advanced / Creativity)
  {
    id: 'ch_geo_021',
    nodeId: NODE_C11_GEO_015,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the vertical layers of Earth\'s atmosphere in exact ascending order from Earth\'s surface to space.',
    availableParts: ['Mesosphere', 'Exosphere', 'Stratosphere', 'Troposphere', 'Ionosphere/Thermosphere'],
    targetState: 'Troposphere Stratosphere Mesosphere Ionosphere/Thermosphere Exosphere',
    validationHint: 'Click parts in sequence: surface weather layer → ozone layer → meteor burning layer → radio reflecting layer → outer space escape boundary.',
    explanation: 'Ascending vertical order: Troposphere (0–18 km) → Stratosphere (18–50 km) → Mesosphere (50–80 km) → Ionosphere/Thermosphere (80–400 km) → Exosphere (>400 km).',
    hints: [
      'Start with the layer where all weather happens (Troposphere).',
      'The ozone layer sits in the Stratosphere above the Troposphere.',
      'Mesosphere comes before the Ionosphere, followed finally by the Exosphere.',
    ],
    misconceptionIndex: 4,
  },
  // 22. Competency / Real-World Evaluation (Advanced / Evaluation)
  {
    id: 'ch_geo_022',
    nodeId: NODE_C11_GEO_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A low-lying coastal city like Kochi in Kerala faces accelerating sea level rise and monsoon flooding. Which combined policy represents an optimal balance of local Adaptation and global Mitigation?',
    options: [
      'Build continuous concrete walls while increasing diesel generator subsidies.',
      'Restore natural coastal mangrove buffers and construct elevated storm infrastructure (Adaptation), alongside transitioning public transport to solar/grid electric power (Mitigation).',
      'Relocate the entire population inland immediately without building flood barriers.',
      'Dredge all coastal lagoons to allow seawater to flow directly into freshwater wells.',
    ],
    correctIndex: 1,
    explanation: 'Effective climate action requires tandem deployment: Adaptation (mangrove restoration for surge buffering and resilient infrastructure) plus Mitigation (decarbonizing transport and energy to reduce greenhouse gas emissions).',
    hints: [
      'Adaptation deals with existing climate impacts; Mitigation addresses root causes by cutting emissions.',
      'Mangroves absorb wave energy and provide natural flood protection.',
      'Solar electrification reduces fossil fuel combustion.',
    ],
    misconceptionIndex: 7,
  },
];

// ─── INTERACTIVE BRILLIANT-STYLE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Aeolian Sandblasting & Mushroom Rocks',
    instruction: 'Adjust the wind velocity and saltation height sliders to observe how near-ground sand concentration sculpts the mushroom rock base.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_GEO_011,
  },
  {
    title: '2. Glacial Trough vs Fluvial Valley',
    instruction: 'Toggle between liquid River Erosion and solid Glacier Scouring to see how a V-valley transforms into a U-shaped trough with hanging valleys.',
    interactionType: 'toggle-transform',
    nodeId: NODE_C11_GEO_012,
  },
  {
    title: '3. Karst Dissolution & Cave Architecture',
    instruction: 'Increase groundwater acidity and seepage rate to watch sinkholes collapse on the surface while stalactites and stalagmites form underground.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_GEO_013,
  },
  {
    title: '4. Atmospheric Lapse Rate & Temperature Inversion',
    instruction: 'Adjust surface night-time radiative cooling. Observe the normal 6.5°C/km lapse rate flip into a Ground Inversion that traps surface pollutants.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_GEO_016,
  },
  {
    title: '5. Submarine Bathymetric Profile',
    instruction: 'Explore the oceanic cross-section from continental shelf (200m) and steep slope (3000m) to the abyssal plain and Mariana Trench (11,000m).',
    interactionType: 'interactive-bathymetry',
    nodeId: NODE_C11_GEO_020,
  },
];

// ─── PREDICTION QUESTIONS ──���
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If wind speed in the Thar Desert increases from 15 km/h to 50 km/h, what happens to the height and impact energy of bouncing sand grains (saltation)?',
    options: [
      'Saltation ceases and all sand turns into high-altitude clouds above 500 metres.',
      'Sand grain impacts intensify dramatically, but >90% of abrasive grain mass remains concentrated within the lowest 1.5 metres.',
      'Sand grains float motionless in the air without touching rock faces.',
      'Rock abrasion shifts entirely to the top of 20-metre cliffs.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the Wind Speed controller to 50 km/h in the simulation below and observe the saltation stream density gauge.',
    nodeId: NODE_C11_GEO_011,
  },
  {
    question: 'Predict: On a clear, windless winter night in Delhi, what will happen to the temperature of the air layer touching the ground compared to the air 300 metres above?',
    options: [
      'Ground air will become much colder than the air above, creating an inversion lid that traps vehicular emissions.',
      'Ground air will heat up to 45°C due to geothermal heat.',
      'Upper air will cool to -50°C while ground air stays tropical.',
      'Temperature will remain perfectly uniform from ground to 10 km altitude.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Enable "Radiative Winter Night" mode and watch the temperature profile line bend backward near the surface.',
    nodeId: NODE_C11_GEO_016,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What pattern do you notice regarding where the greatest rock volume is carved away on the desert outcrop?',
    observableOptions: [
      'Maximum erosion occurs near the ground base (0.2m – 1.5m), giving the rock a slender stalk.',
      'Maximum erosion occurs at the absolute summit 10m high.',
      'The rock erodes uniformly at all heights like an ice cube melting in water.',
      'Only the windward backside of the rock dissolves.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_GEO_011,
  },
  {
    question: 'Observation: In the Karst model, what happens when a hanging stalactite and an upward-growing stalagmite continue growing along the same vertical drip line?',
    observableOptions: [
      'They repel each other magnetically and curve sideways.',
      'They meet and fuse together into a continuous solid limestone Pillar.',
      'They dissolve into pure gas.',
      'The entire cave ceiling instantly collapses into a volcano.',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_GEO_013,
  },
];

// ─── REAL WORLD FIELD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Indian Geomorphological Field Investigator',
  description: 'Apply your understanding of agents of gradation and atmospheric dynamics to analyze physical landscapes in India.',
  steps: [
    'Thar Desert (Rajasthan): Identify barchan dune migration directions using satellite imagery from Jaisalmer.',
    'Himalayas (Uttarakhand): Trace the lateral and terminal moraines of the Gangotri Glacier and identify U-shaped valley profiles.',
    'Andhra Pradesh (Borra Caves): Document how groundwater solution through Araku Valley limestone created stalactites and sinkholes.',
    'Konkan & Malabar Coasts: Contrast the erosional sea stacks and wave-cut platforms of Maharashtra with the depositional lagoons (Kayals) and spits of Kerala.',
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
  nodeId: NODE_C11_GEO_011,
  title: 'Aeolian & Global Geomorphic Processes Simulation',
  definition: 'Agents of gradation (wind, glaciers, groundwater, marine waves) sculpt terrestrial landscapes through erosion, transportation, and deposition, while atmospheric dynamics govern global climate systems.',
  eli5: 'Wind blows sand like a sandpaper tool to carve mushroom rocks; glaciers act like massive frozen bulldozers gouging U-valleys; acidic groundwater dissolves underground caves; and the atmosphere insulates our living planet.',
  misconceptions: [
    { misconception: 'Wind abrasion erodes rock evenly at all altitudes.', correction: 'Wind abrasion is concentrated within 1–2 metres of the ground where saltating sand grains bounce with maximum density.' },
    { misconception: 'Glacial valleys and river valleys have the same shape.', correction: 'Rivers cut narrow V-shaped gorges through concentrated bed downcutting; glaciers fill the entire valley profile, scouring floor and walls into broad U-shaped troughs.' },
    { misconception: 'Groundwater carves caves purely through mechanical scouring like a river.', correction: 'Groundwater acts primarily as a chemical solvent: carbonic acid (H2CO3) dissolves calcium carbonate (CaCO3) in limestone.' },
    { misconception: 'A sea stack forms before a sea arch.', correction: 'The sequential erosional chain is: Notch → Cave → Arch → Stack (when arch roof collapses) → Stump.' },
    { misconception: 'Temperature decreases continuously with height throughout the entire atmosphere.', correction: 'Temperature drops in the Troposphere and Mesosphere, but increases in the Stratosphere (due to ozone UV absorption) and Thermosphere.' },
    { misconception: 'Standard sea-level pressure is 760 millibars.', correction: 'Standard pressure is 1013.25 millibars (hPa), which corresponds to 760 millimetres of mercury (mm Hg).' },
    { misconception: '100% Relative Humidity means the air is pure liquid water.', correction: '100% RH simply means the air holds the maximum water vapour possible at its current temperature; cooling it initiates condensation.' },
    { misconception: 'Current global warming is entirely caused by natural solar and volcanic cycles.', correction: 'The rate of CO2 rise (315 to >420 ppm) and declining 13C/12C isotopic ratios prove post-industrial warming is overwhelmingly driven by fossil fuel combustion.' },
    { misconception: 'The ocean floor is a flat, featureless underwater basin.', correction: 'The ocean floor features dramatic continental shelves, steep slopes, vast abyssal plains, mid-ocean mountain chains (>65,000 km), and deep subduction trenches (>11,000 m).' },
  ],
  diagnosticQuestions: [
    { question: 'Which agent creates crescent-shaped Barchans with horns pointing downwind?', options: ['Glacial Ice', 'Wind (Aeolian)', 'Groundwater', 'Ocean Currents'], correctIndex: 1 },
    { question: 'What is a submerged, flat-topped volcanic seamount called?', options: ['Atoll', 'Guyot', 'Moraine', 'Yardang'], correctIndex: 1 },
    { question: 'At standard environmental lapse rate, how much does temperature drop per 1,000 metres elevation?', options: ['1.0°C', '6.5°C', '10.0°C', '0.5°C'], correctIndex: 1 },
    { question: 'Which instrument measures relative humidity using dry and wet bulb thermometers?', options: ['Mercury Barometer', 'Aneroid Barometer', 'Psychrometer', 'Anemometer'], correctIndex: 2 },
    { question: 'What speleothem deposit grows upward from the floor of a karst cavern?', options: ['Stalactite', 'Stalagmite', 'Arete', 'Esker'], correctIndex: 1 },
    { question: 'Which atmospheric gas constitutes ~78% of dry air by volume?', options: ['Oxygen', 'Nitrogen', 'Argon', 'Carbon Dioxide'], correctIndex: 1 },
    { question: 'What pressure belt is located near 30°N and 30°S latitudes (Horse Latitudes)?', options: ['Equatorial Low', 'Subtropical High', 'Subpolar Low', 'Polar High'], correctIndex: 1 },
    { question: 'The deepest known oceanic trench on Earth is:', options: ['Java Trench', 'Puerto Rico Trench', 'Mariana Trench', 'Sunda Trench'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery across ISC Class 11 Geography: Aeolian, Glacial, Karst, Coastal landforms, Atmosphere structure, Temperature, Pressure, Moisture, Climate Change, and Ocean Relief.',
};

function C11_GeographyAeolianProcessesLandformsSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_GEO_011,
    title = DEFAULT_PROPS.title || 'Aeolian & Geomorphic Processes',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌍', color: 'emerald' };

  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery & Prediction
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Drag-and-drop & Input
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Simulation Interactive Controls (Sliders & Toggles)
  const [windSpeed, setWindSpeed] = useState(35); // km/h (10 - 80)
  const [rockHardness, setRockHardness] = useState(40); // 10 - 100
  const [activeGeomorphicAgent, setActiveGeomorphicAgent] = useState<'wind' | 'ice' | 'water' | 'wave'>('wind');
  const [valleyType, setValleyType] = useState<'river' | 'glacier'>('river');
  const [groundwaterAcidity, setGroundwaterAcidity] = useState(6.0); // pH 4.0 - 7.0
  const [waterSeepageRate, setWaterSeepageRate] = useState(50); // %
  const [surfaceTempSeaLevel, setSurfaceTempSeaLevel] = useState(30); // °C
  const [altitudeSlider, setAltitudeSlider] = useState(2500); // metres (0 - 10000)
  const [isWinterNightInversion, setIsWinterNightInversion] = useState(false);
  const [oceanDepthProbe, setOceanDepthProbe] = useState(200); // metres (0 - 11000)
  const [selectedSubmarineZone, setSelectedSubmarineZone] = useState<string>('shelf');
  const [co2Concentration, setCo2Concentration] = useState(420); // ppm (280 - 600)

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES & REAL-TIME CALCULATIONS ───
  // 1. Aeolian Saltation Impact Height Profile
  const saltationMaxHeight = useMemo(() => {
    return Math.min(2.5, 0.4 + (windSpeed / 80) * 1.8);
  }, [windSpeed]);

  const baseErosionRate = useMemo(() => {
    const energy = Math.pow(windSpeed / 30, 2.5);
    const hardnessFactor = 100 / (rockHardness + 20);
    return (energy * hardnessFactor).toFixed(1);
  }, [windSpeed, rockHardness]);

  // 2. Atmospheric Lapse Rate calculation
  const calculatedAltitudeTemp = useMemo(() => {
    if (isWinterNightInversion && altitudeSlider < 1200) {
      const surfaceChill = surfaceTempSeaLevel - 8;
      const inversionPeak = surfaceTempSeaLevel + 3;
      const factor = altitudeSlider / 800;
      if (altitudeSlider <= 800) {
        return (surfaceChill + (inversionPeak - surfaceChill) * factor).toFixed(1);
      } else {
        const excessAlt = (altitudeSlider - 800) / 1000;
        return (inversionPeak - excessAlt * 6.5).toFixed(1);
      }
    }
    const tempDrop = (altitudeSlider / 1000) * 6.5;
    return (surfaceTempSeaLevel - tempDrop).toFixed(1);
  }, [surfaceTempSeaLevel, altitudeSlider, isWinterNightInversion]);

  // 3. Submarine Ocean Relief Profile Data for Charts
  const bathymetryData = useMemo(() => [
    { distance: 0, depth: 0, label: 'Coast (0m)' },
    { distance: 60, depth: -180, label: 'Continental Shelf (~200m)' },
    { distance: 110, depth: -2800, label: 'Continental Slope (~3,000m)' },
    { distance: 220, depth: -4500, label: 'Abyssal Plain (~4,500m)' },
    { distance: 300, depth: -2200, label: 'Mid-Ocean Ridge (~2,200m)' },
    { distance: 380, depth: -4800, label: 'Abyssal Plain' },
    { distance: 440, depth: -11034, label: 'Mariana Deep Trench (11,034m)' },
  ], []);

  // 4. Climate Warming Anomaly
  const globalTempAnomaly = useMemo(() => {
    const anomaly = 3.0 * (Math.log(co2Concentration / 280) / Math.log(2));
    return anomaly.toFixed(2);
  }, [co2Concentration]);

  // ─── ADAPTIVE DIFFICULTY: Filter challenges based on BKT mastery ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── USEEFFECT HOOKS ───
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particleCount = Math.floor(windSpeed * 3.5);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height - Math.random() * (saltationMaxHeight * 50) - 2,
      vx: 2 + (windSpeed / 15) + Math.random() * 2,
      vy: (Math.random() - 0.5) * 1.5,
      size: 1 + Math.random() * 2.5,
      color: Math.random() > 0.3 ? '#fbbf24' : '#d97706',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, canvas.height - 12, canvas.width, 12);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(0, canvas.height - 14, canvas.width, 2);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y >= canvas.height - 14) {
          p.y = canvas.height - 15;
          p.vy = -Math.abs(Math.random() * (windSpeed / 18));
        }

        p.vy += 0.15;

        if (p.x > canvas.width) {
          p.x = 0;
          p.y = canvas.height - 14 - Math.random() * 20;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      const boundaryY = canvas.height - 14 - (1.5 * 35);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, boundaryY);
      ctx.lineTo(canvas.width, boundaryY);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [windSpeed, saltationMaxHeight]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  useEffect(() => {
    speechManager.speak('Welcome to the Geography Simulator. Explore physical landforms and atmospheric dynamics.');
  }, []);

  useEffect(() => {
    if (oceanDepthProbe <= 200) setSelectedSubmarineZone('shelf');
    else if (oceanDepthProbe <= 3000) setSelectedSubmarineZone('slope');
    else if (oceanDepthProbe <= 6000) setSelectedSubmarineZone('plain');
    else setSelectedSubmarineZone('trench');
  }, [oceanDepthProbe]);

  // ─── CALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Great scientific intuition! Let us observe the saltation mechanics.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Step 1: Explore aeolian saltation and mushroom rock abrasion.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Manipulate all geomorphic variables freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Apply your geomorphic knowledge.');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test and verify using the interactive controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const correct = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Accurate observation! Sandblasting is concentrated at the base.' : 'Observe the height gauge carefully.');
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
      speechManager.speak('Let us review the step-by-step geographic explanation.');
    }
  }, [hintCount, challenge]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation complete! Excellent work on ISC Geography geomorphology.');
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
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
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us study the complete explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('tap');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleResetSandbox = useCallback(() => {
    setWindSpeed(35);
    setRockHardness(40);
    setValleyType('river');
    setGroundwaterAcidity(6.0);
    setSurfaceTempSeaLevel(30);
    setAltitudeSlider(2500);
    setIsWinterNightInversion(false);
    setCo2Concentration(420);
    audioManager.play('pop');
    speechManager.speak('Simulation parameters reset to standard baseline.');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span 
            whileHover={{ rotate: 360 }} 
            transition={{ duration: 0.8 }} 
            className="text-3xl p-2 bg-emerald-950/60 border border-emerald-700/60 rounded-2xl shadow-inner"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                ISC Class 11 Geography
              </span>
              <span className="text-xs text-slate-400">c11_geo_011 — c11_geo_020</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Navigation Phase Pill Badges */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs font-semibold" role="navigation" aria-label="Expedition Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              aria-label={`Switch to ${p} phase`}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/40 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400 text-lg font-bold" aria-hidden="true">🏜️</span>
              <span className="text-amber-400 text-lg font-bold">Expedition Scenario</span>
            </div>
            <h2 className="text-xl font-bold text-amber-200">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-300/80 mt-3 p-3 bg-amber-950/60 rounded-xl border border-amber-800/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-semibold text-emerald-300">Curiosity Discovery Hook:</h3>
            <p className="text-lg font-medium text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`p-4 text-left rounded-xl border transition-all text-sm leading-relaxed flex items-start gap-2 ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="font-bold mr-1 text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                  <span className="flex-1">{opt}</span>
                  {discoveryAnswered && (
                    <span className="font-bold ml-1">
                      {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-3">
                <p className={discoveryCorrect ? 'text-emerald-300 font-semibold text-sm flex items-center gap-1.5' : 'text-amber-300 font-semibold text-sm flex items-center gap-1.5'}>
                  {discoveryCorrect ? '✓ Spot-on! You recognized the near-surface concentration of saltating sand.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Launch interactive guided exploration"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/50 flex items-center gap-2 text-sm"
                >
                  Launch Interactive Guided Exploration →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (Brilliant Style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
                👉 <span className="font-semibold">{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </p>

              {/* SLIDE 0: AEOLIAN MUSHROOM ROCK & SALTATION SIMULATOR */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3">
                      <p className="text-xs font-bold uppercase text-amber-400 tracking-wider">🔬 Step 1: Predict Then Verify</p>
                      <p className="text-sm font-medium text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            className="p-3 text-left bg-slate-900/80 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-amber-300">Live Saltation Particle Field (Thar Wind Tunnel)</span>
                        <span className="text-rose-400 font-mono">Max Saltation: {saltationMaxHeight.toFixed(2)} m</span>
                      </div>
                      <canvas ref={canvasRef} width={460} height={180} aria-label="Visual simulation showing sand particles bouncing in desert wind" className="w-full bg-slate-900/90 rounded-xl border border-slate-800" />
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Ground Bedrock (0 m)</span>
                        <span className="text-rose-400 font-semibold">--- Red Line = 1.5m Sandblast Ceiling ---</span>
                        <span>High Air (3 m)</span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-2">
                      <span className="text-xs font-bold text-emerald-300 self-start">Morphology: Mushroom Rock / Rock Pedestal</span>
                      <svg viewBox="0 0 240 180" className="w-full h-40" aria-label="Diagram of mushroom rock showing slender stem abraded near base and broad cap on top">
                        <rect x="0" y="0" width="240" height="180" fill="#0f172a" rx="10" />
                        <path d="M 20 40 L 60 40 M 50 35 L 60 40 L 50 45" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 20 120 L 70 120 M 60 115 L 70 120 L 60 125" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                        <text x="75" y="123" fill="#f59e0b" fontSize="8" fontWeight="bold">Heavy Sandblast</text>

                        <rect x="0" y="155" width="240" height="25" fill="#78350f" />

                        {(() => {
                          const baseWidth = Math.max(16, 50 - (windSpeed * 0.4) + (rockHardness * 0.2));
                          const capWidth = 100;
                          return (
                            <g>
                              <path
                                d={`M ${120 - baseWidth/2} 155 Q ${120 - baseWidth/3} 100 ${120 - 30} 80 L ${120 + 30} 80 Q ${120 + baseWidth/3} 100 ${120 + baseWidth/2} 155 Z`}
                                fill="#d97706"
                                stroke="#b45309"
                                strokeWidth="2"
                              />
                              <ellipse cx="120" cy="65" rx={capWidth/2} ry="22" fill="#92400e" stroke="#78350f" strokeWidth="2" />
                              <text x="120" y="68" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Resistant Cap</text>
                              <text x="120" y="125" textAnchor="middle" fill="#451a03" fontSize="8" fontWeight="bold">Narrow Stem</text>
                            </g>
                          );
                        })()}
                      </svg>
                      <div className="w-full text-center text-[11px] text-amber-300/90 font-mono">
                        Erosion Intensity Index: <span className="font-bold text-amber-400">{baseErosionRate}x</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-800/70 rounded-2xl border border-slate-700">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                        <label htmlFor="slider-wind-speed">💨 Thar Wind Velocity: {windSpeed} km/h</label>
                        <span className="text-amber-400">{windSpeed > 50 ? 'Gale Sandstorm' : 'Moderate Breeze'}</span>
                      </div>
                      <input
                        id="slider-wind-speed"
                        type="range"
                        min={10}
                        max={80}
                        value={windSpeed}
                        aria-label={`Thar wind velocity slider, currently ${windSpeed} kilometers per hour`}
                        onChange={(e) => setWindSpeed(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                        <label htmlFor="slider-rock-hardness">🪨 Bedrock Resistance: {rockHardness}%</label>
                        <span className="text-emerald-400">{rockHardness > 60 ? 'Quartz Sandstone' : 'Soft Clay/Shale'}</span>
                      </div>
                      <input
                        id="slider-rock-hardness"
                        type="range"
                        min={10}
                        max={100}
                        value={rockHardness}
                        aria-label={`Bedrock resistance slider, currently ${rockHardness} percent`}
                        onChange={(e) => setRockHardness(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {windSpeed >= 45 && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-700 space-y-2">
                      <p className="text-xs font-bold uppercase text-emerald-400">🔍 Scientific Observation Prompt</p>
                      <p className="text-sm font-medium text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            className="w-full p-2.5 text-left bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 flex items-center justify-between"
                          >
                            <span>{opt}</span>
                            {observationAnswered && (
                              <span className="font-bold">
                                {i === OBSERVATION_QUESTIONS[0].correctIndex ? '✓ Correct' : '✗'}
                              </span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 1: GLACIAL U-VALLEY VS FLUVIAL V-VALLEY */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setValleyType('river')}
                      aria-label="Select fluvial stage V-shaped river valley"
                      className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        valleyType === 'river' ? 'bg-gold-600 text-white border-gold-400 shadow-lg' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      🏞️ Fluvial Stage (V-Shaped River Valley)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setValleyType('glacier')}
                      aria-label="Select glacial stage U-shaped trough"
                      className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        valleyType === 'glacier' ? 'bg-gold-600 text-white border-gold-400 shadow-lg' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      🏔️ Glacial Stage (U-Shaped Trough + Hanging Valleys)
                    </motion.button>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-xl h-60" aria-label={valleyType === 'river' ? 'Cross-section of narrow V-shaped river valley' : 'Cross-section of broad U-shaped glacial trough'}>
                      {valleyType === 'river' ? (
                        <g>
                          <polygon points="0,40 160,200 160,240 0,240" fill="#334155" />
                          <polygon points="500,40 340,200 340,240 500,240" fill="#475569" />
                          <polygon points="160,200 250,225 340,200 250,240" fill="#1e293b" />
                          <path d="M 235 220 Q 250 235 265 220" stroke="#38bdf8" strokeWidth="6" fill="none" />
                          <text x="250" y="210" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Confined Fast River Downcutting</text>
                          <text x="250" y="70" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">Steep "V-Shaped" Valley Cross-Section</text>
                        </g>
                      ) : (
                        <g>
                          <path d="M 0 30 L 100 80 L 100 180 Q 120 230 250 230 Q 380 230 400 180 L 400 80 L 500 30 L 500 240 L 0 240 Z" fill="#1e293b" />
                          <rect x="130" y="220" width="240" height="15" fill="#0f172a" rx="5" />
                          <path d="M 100 80 L 40 80 L 40 140 L 100 140 Z" fill="#334155" />
                          <path d="M 100 140 Q 115 180 120 220" stroke="#38bdf8" strokeWidth="4" strokeDasharray="3,3" fill="none" />
                          <text x="50" y="120" fill="#a5f3fc" fontSize="9" fontWeight="bold">Hanging Valley</text>
                          <text x="130" y="170" fill="#38bdf8" fontSize="9">Waterfall</text>
                          <text x="250" y="232" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="bold">Broad Flat Floor (U-Trough)</text>
                          <text x="250" y="50" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Glaciated U-Shaped Trough (e.g. Yosemite / Gangotri)</text>
                        </g>
                      )}
                    </svg>
                    <p className="text-xs text-slate-400 mt-2 text-center max-w-lg">
                      {valleyType === 'river'
                        ? 'Fluvial Action: Running water concentrates hydraulic energy along the central channel, producing interlocking spurs and a steep V-profile.'
                        : 'Glacial Action: The solid ice mass scours the entire width via plucking and abrasion, shearing off interlocking spurs and leaving tributary valleys hanging.'}
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 2: KARST DISSOLUTION & SPELEOTHEM SIMULATOR */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                        <label htmlFor="slider-acidity">🧪 Rainwater Acidity: pH {groundwaterAcidity.toFixed(1)}</label>
                        <span className="text-rose-400">{groundwaterAcidity < 5.5 ? 'Strong Carbonic Acid' : 'Weak Acid'}</span>
                      </div>
                      <input
                        id="slider-acidity"
                        type="range"
                        min={4.0}
                        max={7.0}
                        step={0.1}
                        value={groundwaterAcidity}
                        aria-label={`Rainwater acidity slider, currently pH ${groundwaterAcidity.toFixed(1)}`}
                        onChange={(e) => setGroundwaterAcidity(Number(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                        <label htmlFor="slider-seepage">💧 Water Infiltration & Seepage: {waterSeepageRate}%</label>
                        <span className="text-gold-400">Permeable Joints</span>
                      </div>
                      <input
                        id="slider-seepage"
                        type="range"
                        min={10}
                        max={100}
                        value={waterSeepageRate}
                        aria-label={`Water infiltration and seepage rate slider, currently ${waterSeepageRate} percent`}
                        onChange={(e) => setWaterSeepageRate(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 450 200" className="w-full max-w-lg h-52" aria-label="Diagram of karst cave showing sinkhole on surface, stalactites on ceiling, stalagmites on floor, and limestone pillar">
                      <path d="M 0 35 L 120 35 Q 160 70 200 35 L 450 35 L 450 65 L 0 65 Z" fill="#475569" />
                      <text x="160" y="25" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="bold">Sinkhole / Swallow Hole</text>

                      <rect x="30" y="65" width="390" height="120" fill="#0f172a" stroke="#334155" strokeWidth="2" rx="10" />

                      {(() => {
                        const growth = (7.0 - groundwaterAcidity) * 8 + (waterSeepageRate * 0.2);
                        const isFused = growth >= 38;
                        return (
                          <g>
                            <polygon points={`120,65 ${120 - 8},65 120,${65 + growth} ${120 + 8},65`} fill="#fde047" />
                            <polygon points={`120,185 ${120 - 10},185 120,${185 - growth} ${120 + 10},185`} fill="#eab308" />
                            {isFused && (
                              <rect x="117" y="65" width="6" height="120" fill="#facc15" />
                            )}
                            <text x="120" y="60" textAnchor="middle" fill="#fde047" fontSize="8">Stalactite (C)</text>
                            <text x="120" y="195" textAnchor="middle" fill="#eab308" fontSize="8">Stalagmite (G)</text>
                            {isFused && <text x="150" y="130" fill="#4ade80" fontSize="9" fontWeight="bold">← Fused Pillar!</text>}

                            <polygon points="300,65 292,65 300,95 308,65" fill="#fde047" />
                            <polygon points="300,185 290,185 300,160 310,185" fill="#eab308" />
                          </g>
                        );
                      })()}
                    </svg>
                    <p className="text-xs text-amber-300 font-mono mt-1">
                      Reaction: H₂O + CO₂ ⇌ H₂CO₃; CaCO₃ + H₂CO₃ ⇌ Ca(HCO₃)₂ (Soluble)
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 3: ATMOSPHERIC LAPSE RATE & INVERSION */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsWinterNightInversion(!isWinterNightInversion)}
                        aria-label="Toggle radiative winter night inversion"
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          isWinterNightInversion
                            ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-900/50'
                            : 'bg-slate-700 text-slate-300 border-slate-600'
                        }`}
                      >
                        {isWinterNightInversion ? '🌙 Radiative Inversion ON' : '☀️ Normal Lapse Rate Day'}
                      </motion.button>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                        <label htmlFor="slider-alt">🏔️ Altitude Probe: {altitudeSlider} m</label>
                        <span className="text-emerald-400 font-mono font-bold">{calculatedAltitudeTemp} °C</span>
                      </div>
                      <input
                        id="slider-alt"
                        type="range"
                        min={0}
                        max={10000}
                        step={100}
                        value={altitudeSlider}
                        aria-label={`Altitude probe slider, currently ${altitudeSlider} metres`}
                        onChange={(e) => setAltitudeSlider(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <p className="text-xs font-bold text-slate-300 mb-2">Vertical Temperature Sounding Profile (Troposphere)</p>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { alt: 0, temp: isWinterNightInversion ? surfaceTempSeaLevel - 8 : surfaceTempSeaLevel },
                            { alt: 1000, temp: isWinterNightInversion ? surfaceTempSeaLevel + 2 : surfaceTempSeaLevel - 6.5 },
                            { alt: 2500, temp: surfaceTempSeaLevel - 16.25 },
                            { alt: 5000, temp: surfaceTempSeaLevel - 32.5 },
                            { alt: 8000, temp: surfaceTempSeaLevel - 52 },
                            { alt: 10000, temp: surfaceTempSeaLevel - 65 },
                          ]}
                          margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="temp" unit="°C" stroke="#64748b" fontSize={10} />
                          <YAxis dataKey="alt" unit="m" stroke="#64748b" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Line type="monotone" dataKey="temp" stroke={isWinterNightInversion ? '#c084fc' : '#38bdf8'} strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 text-center">
                      {isWinterNightInversion
                        ? '⚠️ Ground Inversion: Cold dense air trapped beneath warm air aloft traps fog & particulate pollution.'
                        : 'Standard Lapse Rate: Temperature drops uniformly at 6.5°C per 1,000 metres.'}
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 4: SUBMARINE OCEAN RELIEF BATHYMETRY */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <p className="text-xs font-bold text-emerald-300 mb-2">Ocean Basin Cross-Section (Continental Shelf to Mariana Trench)</p>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={bathymetryData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="distance" unit="km" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} domain={[-12000, 0]} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Area type="monotone" dataKey="depth" stroke="#0ea5e9" fill="#0369a1" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-slate-300">
                        <label htmlFor="slider-ocean-depth">Sonar Submarine Depth Probe: {oceanDepthProbe} m</label>
                        <span className="text-emerald-400 uppercase font-bold">{selectedSubmarineZone} ZONE</span>
                      </div>
                      <input
                        id="slider-ocean-depth"
                        type="range"
                        min={0}
                        max={11034}
                        step={50}
                        value={oceanDepthProbe}
                        aria-label={`Sonar submarine depth probe slider, currently ${oceanDepthProbe} metres`}
                        onChange={(e) => setOceanDepthProbe(Number(e.target.value))}
                        className="w-full accent-gold-400 cursor-pointer"
                      />
                      <div className="text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        {oceanDepthProbe <= 200 && '📌 Continental Shelf (0–200m): High sunlight penetration, prime fishing banks, offshore oil (Mumbai High).'}
                        {oceanDepthProbe > 200 && oceanDepthProbe <= 3000 && '📌 Continental Slope (200–3000m): Steep drop marking true continental-oceanic crust boundary.'}
                        {oceanDepthProbe > 3000 && oceanDepthProbe <= 6000 && '📌 Abyssal Plain (3000–6000m): Flattest terrain on Earth covered with pelagic sediment & manganese nodules.'}
                        {oceanDepthProbe > 6000 && '📌 Oceanic Trench (>6000m): Deep subduction troughs (Mariana Trench: ~11,034m) formed by colliding tectonic plates.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous concept slide"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Concept
                </motion.button>
                <span className="text-xs text-slate-400 font-mono">Concept {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Next concept slide"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Next Concept →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Enter free sandbox mode"
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Enter Free Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (Zero Grading) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-amber-300">🧪 Geomorphic & Atmospheric Free Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">Experiment freely with multiple physical systems with zero test pressure.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResetSandbox}
                aria-label="Reset simulation parameters to defaults"
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold border border-slate-700"
              >
                🔄 Reset Controls
              </motion.button>
            </div>

            {/* Agent Selector */}
            <div className="flex flex-wrap gap-2 pt-2" role="group" aria-label="Geomorphic Agent Selector">
              {(['wind', 'ice', 'water', 'wave'] as const).map((agent) => (
                <motion.button
                  key={agent}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveGeomorphicAgent(agent)}
                  aria-label={`Select geomorphic agent: ${agent}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize border transition-all ${
                    activeGeomorphicAgent === agent
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {agent === 'wind' && '💨 Aeolian (Wind)'}
                  {agent === 'ice' && '🏔️ Glacial (Ice)'}
                  {agent === 'water' && '💧 Groundwater Karst'}
                  {agent === 'wave' && '🌊 Marine Wave Attack'}
                </motion.button>
              ))}
            </div>

            {/* Sandbox Visual Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-300">🌍 Active Agent Control: {activeGeomorphicAgent.toUpperCase()}</span>
                {activeGeomorphicAgent === 'wind' && (
                  <div className="space-y-3">
                    <canvas ref={canvasRef} width={400} height={140} aria-label="Wind tunnel sand saltation particle canvas" className="w-full bg-slate-900 rounded-xl border border-slate-800" />
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <label htmlFor="sandbox-wind">Wind Speed: {windSpeed} km/h</label>
                        <span className="text-amber-400">Saltation: {saltationMaxHeight.toFixed(2)}m</span>
                      </div>
                      <input id="sandbox-wind" type="range" min={10} max={80} value={windSpeed} aria-label={`Wind speed slider, currently ${windSpeed} km/h`} onChange={(e) => setWindSpeed(Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                  </div>
                )}
                {activeGeomorphicAgent === 'ice' && (
                  <div className="p-4 bg-slate-900 rounded-xl text-xs space-y-2 text-slate-300">
                    <p className="font-bold text-gold-300">Glacial Bulldozer Dynamics</p>
                    <p>• Plucking wrenches bedrock blocks from mountain cirques.</p>
                    <p>• Abrasion uses embedded boulders like sandpaper to carve U-troughs.</p>
                    <p>• Moraines deposit unsorted till along lateral margins and terminal snouts.</p>
                  </div>
                )}
                {activeGeomorphicAgent === 'water' && (
                  <div className="p-4 bg-slate-900 rounded-xl text-xs space-y-2 text-slate-300">
                    <p className="font-bold text-yellow-300">Karst Subterranean Dissolution</p>
                    <p>• Soluble limestone + carbonic acid (H₂CO₃) = Ca(HCO₃)₂ solution.</p>
                    <p>• Surface collapse creates Sinkholes; subterranean dripping forms Stalactites & Stalagmites.</p>
                  </div>
                )}
                {activeGeomorphicAgent === 'wave' && (
                  <div className="p-4 bg-slate-900 rounded-xl text-xs space-y-2 text-slate-300">
                    <p className="font-bold text-gold-300">Marine Gradational Chain</p>
                    <p>• Wave Hydraulic Action → Basal Notch → Sea Cave → Sea Arch → Sea Stack → Sea Stump.</p>
                    <p>• Longshore drift builds depositional Spits, Bars, and Tombolos.</p>
                  </div>
                )}
              </div>

              {/* Climate CO2 Simulator */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-300">🌡️ Global Greenhouse Model & Keeling Curve</span>
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <label htmlFor="sandbox-co2">Atmospheric CO₂: {co2Concentration} ppm</label>
                  <span className="text-rose-400 font-mono font-bold">Warming: +{globalTempAnomaly} °C</span>
                </div>
                <input
                  id="sandbox-co2"
                  type="range"
                  min={280}
                  max={600}
                  value={co2Concentration}
                  aria-label={`Atmospheric CO2 concentration slider, currently ${co2Concentration} ppm`}
                  onChange={(e) => setCo2Concentration(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p>• Pre-Industrial Baseline: <span className="text-emerald-400 font-mono">280 ppm</span></p>
                  <p>• Current Level (Mauna Loa): <span className="text-amber-400 font-mono">~420 ppm (+1.1°C)</span></p>
                  <p>• Paris Agreement Target: Limit warming well below <span className="text-rose-400 font-bold">2.0°C</span></p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to graded challenges"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/50 flex items-center gap-2 text-sm"
              >
                I Am Ready for Graded Challenges →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE (Adaptive 22 Challenges) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-xs font-extrabold uppercase px-3 py-0.5 rounded-full border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950 text-rose-300 border-rose-700'
                    : 'bg-amber-950 text-amber-300 border-amber-700'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-xs text-slate-400 capitalize">
                [{challenge.competencyLevel}]
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="text-emerald-400 font-semibold">Score: {scoreBreakdown.correct} / {scoreBreakdown.total}</span>
              <span className="text-slate-400 font-mono">BKT: {masteryLevel}</span>
            </div>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white leading-relaxed mb-4">
              {challenge.question}
            </p>

            {/* 1. MCQ TYPE RENDERING */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-start gap-3 ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg'
                        : wrongFlash
                        ? 'bg-rose-900/40 border-rose-600 text-rose-200'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-emerald-500/50'
                    }`}
                  >
                    <span className="font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-700 text-xs">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {showExplanation && (
                      <span className="font-bold ml-auto flex items-center gap-1">
                        {i === challenge.correctIndex ? (
                          <span className="text-emerald-400">✓ Correct</span>
                        ) : (
                          <span className="text-rose-400">✗</span>
                        )}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. DRAG-LABEL TYPE RENDERING */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-grab shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-amber-400">Wind EROSION Landforms</span>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('t_ero1')}
                      aria-label="Drop target for erosion landform 1"
                      className="p-3 bg-slate-900 rounded-xl border border-dashed border-slate-700 min-h-[44px] flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-400">Target 1:</span>
                      <span className="text-emerald-300 font-bold">{droppedLabels['t_ero1'] ? `✓ ${droppedLabels['t_ero1']}` : '[Drop Here]'}</span>
                    </div>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('t_ero2')}
                      aria-label="Drop target for erosion landform 2"
                      className="p-3 bg-slate-900 rounded-xl border border-dashed border-slate-700 min-h-[44px] flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-400">Target 2:</span>
                      <span className="text-emerald-300 font-bold">{droppedLabels['t_ero2'] ? `✓ ${droppedLabels['t_ero2']}` : '[Drop Here]'}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-gold-400">Wind DEPOSITION Landforms</span>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('t_dep1')}
                      aria-label="Drop target for deposition landform 1"
                      className="p-3 bg-slate-900 rounded-xl border border-dashed border-slate-700 min-h-[44px] flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-400">Target 1:</span>
                      <span className="text-emerald-300 font-bold">{droppedLabels['t_dep1'] ? `✓ ${droppedLabels['t_dep1']}` : '[Drop Here]'}</span>
                    </div>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('t_dep2')}
                      aria-label="Drop target for deposition landform 2"
                      className="p-3 bg-slate-900 rounded-xl border border-dashed border-slate-700 min-h-[44px] flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-400">Target 2:</span>
                      <span className="text-emerald-300 font-bold">{droppedLabels['t_dep2'] ? `✓ ${droppedLabels['t_dep2']}` : '[Drop Here]'}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify geomorphic classification answers"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Verify Geomorphic Classification →
                </motion.button>
              </div>
            )}

            {/* 3. DRAG-SORT TYPE RENDERING */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into proper chronological/geomorphic order:</p>
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
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-700">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  aria-label="Check sequence order"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Check Sequence Order →
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC TYPE RENDERING */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={numericInput}
                    aria-label="Enter calculated temperature value"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated temperature"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-56 focus:border-emerald-500 outline-none"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric calculation"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. CONSTRUCT TYPE RENDERING */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300 font-mono">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add layer: ${part}`}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-xl text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2"
                    >
                      <span>{i + 1}. {part}</span>
                      <button 
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} 
                        aria-label={`Remove layer ${part}`}
                        className="text-rose-300 hover:text-white"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click layers above to arrange in vertical ascending order</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify atmospheric column arrangement"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Verify Atmospheric Column →
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation Box */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                  📖 Step-by-Step Geomorphological Walkthrough:
                </span>
                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next explanation step"
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step ({revealedSteps + 1} / {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}) →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Complete Field Expedition' : 'Proceed to Next Challenge'}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/50"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Field Expedition →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: EXPEDITION COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/60 shadow-2xl text-center space-y-3">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }} className="text-5xl block" aria-hidden="true">
              🏆
            </motion.span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">ISC Geography Field Expedition Complete!</h2>
            <p className="text-sm text-slate-300">
              Mastery Achieved: <span className="font-bold text-emerald-400 capitalize">{masteryLevel}</span> | Final Score: <span className="font-bold text-amber-400">{Math.max(0, 100 - errors * 5)}%</span>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK WITH PRECISE ERROR TIERS */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 text-xs md:text-sm text-emerald-300 leading-relaxed font-medium">
            {errors === 0 && (
              <p className="text-base font-bold text-emerald-300">
                🌟 PERFECT SCORE! You have completely mastered all Class 11 geomorphic and atmospheric systems!
              </p>
            )}
            {errors >= 1 && errors <= 3 && (
              <p className="text-base font-bold text-emerald-300">
                👏 Great work! Your understanding of agents of gradation and climate dynamics is robust and exam-ready.
              </p>
            )}
            {errors >= 4 && errors <= 7 && (
              <p className="text-base font-bold text-amber-300">
                👍 Good effort! Review your specific misconception profile below and re-test the sandbox models to solidify mastery.
              </p>
            )}
            {errors >= 8 && (
              <p className="text-base font-bold text-rose-300">
                💪 Do not give up — You WILL get this! Review the core physical principles and re-explore the simulations.
              </p>
            )}
          </div>

          {/* Misconception Profile with accessible icons */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">📌 Your Targeted Misconception Review:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold flex items-start gap-1">
                        <span>✗</span>
                        <span>Misconception: {m.misconception}</span>
                      </p>
                      <p className="text-emerald-300 flex items-start gap-1">
                        <span>✓</span>
                        <span>Correction: {m.correction}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule (SM-2) */}
          <div className="p-5 bg-gradient-to-r from-amber-950/50 via-slate-900 to-gold-950/50 rounded-2xl border border-amber-500/40 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <span className="text-lg">📅</span>
              <h3 className="text-sm font-bold uppercase tracking-wider">Spaced Repetition Schedule (SM-2 Active Recall)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your session accuracy ({errors} error{errors === 1 ? '' : 's'}), optimal cognitive consolidation requires your next review in:
            </p>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-300 font-extrabold text-sm">
                ⏱️ Review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
              <span className="text-[11px] text-slate-400">
                {errors === 0
                  ? 'High mastery: Extended retention interval active.'
                  : errors <= 3
                  ? 'Moderate retention: Short interval reinforcement recommended.'
                  : 'Needs reinforcement: Immediate next-day review scheduled.'}
              </span>
            </div>
          </div>

          {/* Real-World Field Project Arc */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-base font-bold text-emerald-300">🇮🇳 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-emerald-400">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE CONDITIONAL FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ISC Geography Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C11_GeographyAeolianProcessesLandformsSim;